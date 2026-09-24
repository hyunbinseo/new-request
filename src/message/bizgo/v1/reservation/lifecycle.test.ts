import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parse } from 'valibot';
import type { BizgoResult } from '#bizgo/response';
import { SandboxEnvSchema } from '#bizgo/testing/env.ts';
import { getReservations, type Query } from './list/GET/index.ts';
import { createReservation } from './POST/index.ts';
import { cancelReservation } from './resvKey/cancel/POST/index.ts';
import { getReservationDestinations } from './resvKey/destinations/GET/index.ts';
import { deleteReservationDestination } from './resvKey/destinations/msgKey/DELETE/index.ts';
import { addReservationDestinations } from './resvKey/destinations/POST/index.ts';
import { getReservation } from './resvKey/GET/index.ts';
import { updateReservation } from './resvKey/PUT/index.ts';
import { resumeReservation } from './resvKey/resume/POST/index.ts';
import { stopReservation } from './resvKey/stop/POST/index.ts';

const env = parse(SandboxEnvSchema, process.env);

// FIXME: Use the Temporal API instead.
const kstFormatter = new Intl.DateTimeFormat('sv-SE', {
	timeZone: 'Asia/Seoul',
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hourCycle: 'h23',
});

// Must be at least 10 minutes from now; the margin covers the requests themselves.
const minutesFromNow = (minutes: number) =>
	kstFormatter.format(new Date(Date.now() + minutes * 60 * 1000));

/** Unwraps a result, failing with the response body unless the API accepted the request. */
const expectOk = <Ok, Fail>(result: BizgoResult<Ok, Fail> | Error) => {
	if (result instanceof Error) throw result;
	assert.ok(result.ok, JSON.stringify(result.body));
	return result.body;
};

void test('creates, edits, and cancels a reservation', async (t) => {
	if (!env) return t.skip();

	const { opts, destinationPhoneNumber, kakao } = env;
	if (!destinationPhoneNumber || !kakao) return t.skip();

	const created = expectOk(
		await createReservation(
			{
				destinations: [{ to: destinationPhoneNumber }],
				messageFlow: [
					{ alimtalk: { msgType: 'AT', ...kakao, text: '예약 알림톡 발송 테스트입니다.' } },
				],
				resvSendTime: minutesFromNow(30),
				resvName: '알림톡 예약 발송',
				// Unique per run so repeated runs don't collide on ref uniqueness.
				ref: `mt-resv-${Date.now()}`,
			},
			opts,
		),
	);
	const { resvKey } = created.data;
	assert.ok(resvKey);

	// Cancel even if a later step fails, so the reservation doesn't actually fire in the sandbox.
	let cancelled = false;
	t.after(async () => {
		if (!cancelled) expectOk(await cancelReservation(resvKey, opts));
	});

	await t.test('GET resvKey', async () => {
		const { data } = expectOk(await getReservation(resvKey, opts));
		assert.equal(data.data.resvKey, resvKey);
	});

	const resvSendTime = minutesFromNow(40);

	await t.test('PUT resvKey', async () => {
		const { data } = expectOk(
			await updateReservation(resvKey, { resvSendTime, resvName: '알림톡 예약 수정' }, opts),
		);
		assert.equal(data.data.resvName, '알림톡 예약 수정');
	});

	await t.test('GET list', async () => {
		// Lists reservations at or after `resvSendTime`, so the updated one is on some page.
		const query: Query = { resvSendTime, limit: 1000 };
		for (;;) {
			const { data } = expectOk(await getReservations(query, opts));
			if (data.data.reservations.some((r) => r.resvKey === resvKey)) break;
			assert.ok(data.data.hasNext, `${resvKey} is not in the list`);
			assert.notEqual(data.data.lastSeq, query.lastSeq, 'lastSeq did not advance');
			query.lastSeq = data.data.lastSeq;
		}
	});

	await t.test('POST, GET, and DELETE destinations', async () => {
		const added = expectOk(
			await addReservationDestinations(
				resvKey,
				{ destinations: [{ to: destinationPhoneNumber }] },
				opts,
			),
		);
		assert.equal(added.data.data.inserted, 1);

		const { data } = expectOk(await getReservationDestinations(resvKey, {}, opts));
		const { destinations } = data.data;

		assert.ok(created.data.data);
		const initialMsgKeys = new Set(created.data.data.destinations.map((d) => d.msgKey));
		const addedDestination = destinations.find((d) => !initialMsgKeys.has(d.msgKey));
		assert.ok(addedDestination);

		expectOk(await deleteReservationDestination(resvKey, addedDestination.msgKey, opts));
	});

	await t.test('POST stop and resume', async () => {
		expectOk(await stopReservation(resvKey, opts));
		expectOk(await resumeReservation(resvKey, opts));
	});

	await t.test('POST cancel', async () => {
		expectOk(await cancelReservation(resvKey, opts));
		cancelled = true;
	});
});
