import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import {
	DESTINATION_PHONE_NUMBER,
	KAKAO_SENDER_KEY,
	KAKAO_TEMPLATE_CODE,
} from '#bizgo/v1/sandbox/constants.ts';
import { sandboxOpts } from '#bizgo/v1/sandbox/fetch.ts';
import { getFutureResvSendTime } from '#bizgo/v1/sandbox/time.ts';
import { getReservations, type Query } from './list/GET/index.ts';
import { createReservation } from './POST/index.ts';
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

void describe('message/bizgo/v1/reservation', () => {
	void test('creates, edits, and cancels a reservation in the sandbox', async (t) => {
		const { BIZGO_API_KEY } = env;
		if (!BIZGO_API_KEY) return t.skip();

		const opts = { ...sandboxOpts, apiKey: BIZGO_API_KEY };

		const created = await createReservation(
			{
				destinations: [{ to: DESTINATION_PHONE_NUMBER }],
				messageFlow: [
					{
						alimtalk: {
							msgType: 'AT',
							senderKey: KAKAO_SENDER_KEY,
							templateCode: KAKAO_TEMPLATE_CODE,
							text: '예약 알림톡 발송 테스트입니다.',
						},
					},
				],
				resvSendTime: getFutureResvSendTime(30 * 60 * 1000),
				resvName: '알림톡 예약 발송',
				ref: `mt-resv-${Date.now()}-${randomBytes(4).toString('hex')}`,
			},
			opts,
		);

		assert.ok(!(created instanceof Error));
		assert.equal(created.ok, true);
		assert.ok('resvKey' in created.body.data);

		const { resvKey } = created.body.data;

		// Cancel even if a later step fails, so it doesn't linger in the sandbox.
		let cancelled = false;
		t.after(async () => {
			if (cancelled) return;

			const response = await cancelReservation(resvKey, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, true);
		});

		await t.test('GET resvKey', async () => {
			const response = await getReservation(resvKey, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, true);
			assert.ok('data' in response.body.data);
			assert.equal(response.body.data.data.resvKey, resvKey);
		});

		const now = new Date();
		const resvSendTime = getFutureResvSendTime(40 * 60 * 1000, now);

		await t.test('PUT resvKey', async () => {
			const response = await updateReservation(
				resvKey,
				{ resvSendTime, resvName: '알림톡 예약 수정' },
				opts,
			);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, true);
			assert.ok('data' in response.body.data);
			assert.equal(response.body.data.data.resvName, '알림톡 예약 수정');
		});

		await t.test('GET list at or after resvSendTime', async () => {
			const isListed = async (from: string) => {
				const query: Query = { resvSendTime: from, limit: 1000 };

				for (;;) {
					const response = await getReservations(query, opts);

					assert.ok(!(response instanceof Error));
					assert.equal(response.ok, true);
					assert.ok('data' in response.body.data);

					const { data } = response.body.data;
					if (data.reservations.some((r) => r.resvKey === resvKey)) return true;
					if (!data.hasNext) return false;

					assert.notEqual(data.lastSeq, query.lastSeq, 'lastSeq did not advance');

					query.lastSeq = data.lastSeq;
				}
			};

			assert.equal(await isListed(getFutureResvSendTime(39 * 60 * 1000, now)), true);
			assert.equal(await isListed(resvSendTime), true);
			assert.equal(await isListed(getFutureResvSendTime(41 * 60 * 1000, now)), false);
		});

		await t.test('POST, GET, and DELETE destinations', async () => {
			const added = await addReservationDestinations(
				resvKey,
				{ destinations: [{ to: DESTINATION_PHONE_NUMBER }] },
				opts,
			);

			assert.ok(!(added instanceof Error));
			assert.equal(added.ok, true);
			assert.ok('data' in added.body.data);
			assert.equal(added.body.data.data.destinations.length, 1);

			const msgKey = added.body.data.data.destinations[0]?.msgKey;
			assert.ok(msgKey);

			const query: DestinationsQuery = {};

			for (;;) {
				const response = await getReservationDestinations(resvKey, query, opts);

				assert.ok(!(response instanceof Error));
				assert.equal(response.ok, true);
				assert.ok('data' in response.body.data);

				const { data } = response.body.data;
				if (data.destinations.some((d) => d.msgKey === msgKey)) break;

				assert.ok(data.hasNext, 'the added destination is not in the list');
				assert.notEqual(data.lastSeq, query.lastSeq, 'lastSeq did not advance');

				query.lastSeq = data.lastSeq;
			}

			const deleted = await deleteReservationDestination(resvKey, msgKey, opts);

			assert.ok(!(deleted instanceof Error));
			assert.equal(deleted.ok, true);
		});

		await t.test('POST stop and resume reject a pending reservation', async () => {
			const stopped = await stopReservation(resvKey, opts);

			assert.ok(!(stopped instanceof Error));
			assert.equal(stopped.ok, false);
			assert.equal(stopped.body.data.code, 'A824');

			const resumed = await resumeReservation(resvKey, opts);

			assert.ok(!(resumed instanceof Error));
			assert.equal(resumed.ok, false);
			assert.equal(resumed.body.data.code, 'A824');
		});

		await t.test('POST cancel', async () => {
			const response = await cancelReservation(resvKey, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, true);

			cancelled = true;
		});
	});
});
