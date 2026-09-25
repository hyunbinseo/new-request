import assert from 'node:assert/strict';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import { parse } from 'valibot';
import { SandboxEnvSchema } from '#bizgo/v1/testing/env.ts';
import { getReservations, type Query } from './list/GET/index.ts';
import { createReservation, type RequestBody } from './POST/index.ts';
import { cancelReservation } from './resvKey/cancel/POST/index.ts';
import {
	getReservationDestinations,
	type Query as DestinationsQuery,
} from './resvKey/destinations/GET/index.ts';
import { deleteReservationDestination } from './resvKey/destinations/msgKey/DELETE/index.ts';
import { addReservationDestinations } from './resvKey/destinations/POST/index.ts';
import { getReservation } from './resvKey/GET/index.ts';
import { updateReservation } from './resvKey/PUT/index.ts';
import { resumeReservation } from './resvKey/resume/POST/index.ts';
import { stopReservation } from './resvKey/stop/POST/index.ts';

const sandbox = parse(SandboxEnvSchema, env);

const KST_OFFSET = 9 * 60 * 60 * 1000;

const getFutureResvSendTime = (ms: number) =>
	new Date(Date.now() + KST_OFFSET + ms) //
		.toISOString()
		.slice(0, 19)
		.replace('T', ' '); // yyyy-MM-dd HH:mm:ss

void describe('message/bizgo/v1/reservation', () => {
	void test('creates, edits, and cancels a reservation in the sandbox', async (t) => {
		if (!sandbox?.destinationPhoneNumber || !sandbox.kakao) return t.skip();
		const { opts, destinationPhoneNumber, kakao } = sandbox;

		const input: RequestBody = {
			destinations: [{ to: destinationPhoneNumber }],
			messageFlow: [
				{ alimtalk: { msgType: 'AT', ...kakao, text: '예약 알림톡 발송 테스트입니다.' } },
			],
			resvSendTime: getFutureResvSendTime(30 * 60 * 1000),
			resvName: '알림톡 예약 발송',
			// Unique per run so repeated runs don't collide on ref uniqueness.
			ref: `mt-resv-${Date.now()}`,
		};

		const created = await createReservation(input, opts);

		assert.ok(!(created instanceof Error));
		assert.equal(created.ok, true, JSON.stringify(created.body));

		const { resvKey, data } = created.body.data;

		assert.ok(resvKey);
		assert.ok(data);

		const initialMsgKeys = new Set(data.destinations.map((d) => d.msgKey));

		// Cancel even if a later step fails, so the reservation doesn't actually fire in the sandbox.
		let cancelled = false;
		t.after(async () => {
			if (cancelled) return;
			const response = await cancelReservation(resvKey, opts);
			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, true, JSON.stringify(response.body));
		});

		await t.test('GET resvKey', async () => {
			const response = await getReservation(resvKey, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, true, JSON.stringify(response.body));
			assert.equal(response.body.data.data.resvKey, resvKey);
		});

		const resvSendTime = getFutureResvSendTime(40 * 60 * 1000);

		await t.test('PUT resvKey', async () => {
			const response = await updateReservation(
				resvKey,
				{ resvSendTime, resvName: '알림톡 예약 수정' },
				opts,
			);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, true, JSON.stringify(response.body));
			assert.equal(response.body.data.data.resvName, '알림톡 예약 수정');
		});

		await t.test('GET list', async () => {
			// Lists reservations at or after `resvSendTime`, so the updated one is on some page.
			const query: Query = { resvSendTime, limit: 1000 };
			for (;;) {
				const response = await getReservations(query, opts);

				assert.ok(!(response instanceof Error));
				assert.equal(response.ok, true, JSON.stringify(response.body));

				const { data } = response.body.data;
				if (data.reservations.some((r) => r.resvKey === resvKey)) break;
				assert.ok(data.hasNext, `${resvKey} is not in the list`);
				assert.notEqual(data.lastSeq, query.lastSeq, 'lastSeq did not advance');
				query.lastSeq = data.lastSeq;
			}
		});

		await t.test('POST, GET, and DELETE destinations', async () => {
			const added = await addReservationDestinations(
				resvKey,
				{ destinations: [{ to: destinationPhoneNumber }] },
				opts,
			);

			assert.ok(!(added instanceof Error));
			assert.equal(added.ok, true, JSON.stringify(added.body));
			assert.equal(added.body.data.data.inserted, 1);

			const query: DestinationsQuery = {};
			let addedDestination;
			for (;;) {
				const response = await getReservationDestinations(resvKey, query, opts);

				assert.ok(!(response instanceof Error));
				assert.equal(response.ok, true, JSON.stringify(response.body));

				const { data } = response.body.data;
				addedDestination = data.destinations.find((d) => !initialMsgKeys.has(d.msgKey));
				if (addedDestination) break;
				assert.ok(data.hasNext, 'the added destination is not in the list');
				assert.notEqual(data.lastSeq, query.lastSeq, 'lastSeq did not advance');
				query.lastSeq = data.lastSeq;
			}

			const deleted = await deleteReservationDestination(resvKey, addedDestination.msgKey, opts);

			assert.ok(!(deleted instanceof Error));
			assert.equal(deleted.ok, true, JSON.stringify(deleted.body));
		});

		await t.test('POST stop and resume', async () => {
			const stopped = await stopReservation(resvKey, opts);

			assert.ok(!(stopped instanceof Error));
			assert.equal(stopped.ok, true, JSON.stringify(stopped.body));

			const resumed = await resumeReservation(resvKey, opts);

			assert.ok(!(resumed instanceof Error));
			assert.equal(resumed.ok, true, JSON.stringify(resumed.body));
		});

		await t.test('POST cancel', async () => {
			const response = await cancelReservation(resvKey, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, true, JSON.stringify(response.body));

			cancelled = true;
		});
	});
});
