import assert from 'node:assert/strict';
import { env } from 'node:process';
import { describe, test } from 'node:test';
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

const KST_OFFSET = 9 * 60 * 60 * 1000;

const getFutureResvSendTime = (ms: number) =>
	new Date(Date.now() + KST_OFFSET + ms) //
		.toISOString()
		.slice(0, 19)
		.replace('T', ' '); // yyyy-MM-dd HH:mm:ss

/** Unwraps a result, failing with the response body unless the API accepted the request. */
const expectOk = <T extends { ok: boolean; body: unknown }>(response: T | Error) => {
	assert.ok(!(response instanceof Error));
	assert.ok(response.ok, JSON.stringify(response.body));
	return response.body as Extract<T, { ok: true }>['body'];
};

void describe('message/bizgo/v1/reservation', () => {
	void test('creates, edits, and cancels a reservation in the sandbox', async (t) => {
		const {
			BIZGO_API_KEY,
			BIZGO_DESTINATION_PHONE_NUMBER: destinationPhoneNumber,
			BIZGO_KAKAO_SENDER_KEY,
			BIZGO_KAKAO_TEMPLATE_CODE,
		} = env;
		if (
			!BIZGO_API_KEY ||
			!destinationPhoneNumber ||
			!BIZGO_KAKAO_SENDER_KEY ||
			!BIZGO_KAKAO_TEMPLATE_CODE
		)
			return t.skip();

		const opts = { apiKey: BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };
		const kakao = { senderKey: BIZGO_KAKAO_SENDER_KEY, templateCode: BIZGO_KAKAO_TEMPLATE_CODE };

		const created = expectOk(
			await createReservation(
				{
					destinations: [{ to: destinationPhoneNumber }],
					messageFlow: [
						{ alimtalk: { msgType: 'AT', ...kakao, text: '예약 알림톡 발송 테스트입니다.' } },
					],
					resvSendTime: getFutureResvSendTime(30 * 60 * 1000),
					resvName: '알림톡 예약 발송',
					// Unique per run so repeated runs don't collide on ref uniqueness.
					ref: `mt-resv-${Date.now()}`,
				},
				opts,
			),
		);
		const { resvKey } = created.data;
		assert.ok(resvKey);
		assert.ok(created.data.data);
		const initialMsgKeys = new Set(created.data.data.destinations.map((d) => d.msgKey));

		// Cancel even if a later step fails, so the reservation doesn't actually fire in the sandbox.
		let cancelled = false;
		t.after(async () => {
			if (!cancelled) expectOk(await cancelReservation(resvKey, opts));
		});

		await t.test('GET resvKey', async () => {
			const { data } = expectOk(await getReservation(resvKey, opts));
			assert.equal(data.data.resvKey, resvKey);
		});

		const resvSendTime = getFutureResvSendTime(40 * 60 * 1000);

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

			const query: DestinationsQuery = {};
			let addedDestination;
			for (;;) {
				const { data } = expectOk(await getReservationDestinations(resvKey, query, opts));
				addedDestination = data.data.destinations.find((d) => !initialMsgKeys.has(d.msgKey));
				if (addedDestination) break;
				assert.ok(data.data.hasNext, 'the added destination is not in the list');
				assert.notEqual(data.data.lastSeq, query.lastSeq, 'lastSeq did not advance');
				query.lastSeq = data.data.lastSeq;
			}

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
});
