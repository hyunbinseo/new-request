import assert from 'node:assert/strict';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import {
	DESTINATION_PHONE_NUMBER,
	KAKAO_SENDER_KEY,
	KAKAO_TEMPLATE_CODE,
} from '#bizgo/v1/sandbox/constants.ts';
import { sandboxOpts } from '#bizgo/v1/sandbox/fetch.ts';
import { getFutureResvSendTime, KST_OFFSET } from '#bizgo/v1/sandbox/time.ts';
import { cancelReservation } from '../resvKey/cancel/POST/index.ts';
import { getReservation } from '../resvKey/GET/index.ts';
import { createReservation } from './index.ts';

void describe('message/bizgo/v1/reservation/POST', () => {
	void test('rejects an out-of-range resvSendTime', async (t) => {
		const { BIZGO_API_KEY } = env;
		if (!BIZGO_API_KEY) return t.skip();

		const opts = { ...sandboxOpts, apiKey: BIZGO_API_KEY };

		const cases = [
			{ name: 'less than 10 minutes ahead', ms: 5 * 60 * 1000, code: 'A316' },
			{ name: 'more than 1 year ahead', ms: 366 * 24 * 60 * 60 * 1000, code: 'A331' },
		];

		for (const { name, ms, code } of cases) {
			await t.test(name, async () => {
				const response = await createReservation(
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
						resvSendTime: getFutureResvSendTime(ms),
					},
					opts,
				);

				assert.ok(!(response instanceof Error));

				// Cancel if accepted, so it doesn't linger in the sandbox.
				if ('resvKey' in response.body.data)
					await cancelReservation(response.body.data.resvKey, opts);

				assert.equal(response.ok, false);
				assert.equal(response.body.data.code, code);
			});
		}
	});

	void test('rejects the whole request for one invalid number', async (t) => {
		const { BIZGO_API_KEY } = env;
		if (!BIZGO_API_KEY) return t.skip();

		const opts = { ...sandboxOpts, apiKey: BIZGO_API_KEY };

		const response = await createReservation(
			{
				destinations: [{ to: DESTINATION_PHONE_NUMBER }, { to: '123' }],
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
			},
			opts,
		);

		assert.ok(!(response instanceof Error));

		// Cancel if accepted, so it doesn't linger in the sandbox.
		if ('resvKey' in response.body.data) await cancelReservation(response.body.data.resvKey, opts);

		assert.equal(response.ok, false);
		assert.equal(response.body.data.code, 'A306');
	});

	void test('reads a UTC resvSendTime as KST', async (t) => {
		const { BIZGO_API_KEY } = env;
		if (!BIZGO_API_KEY) return t.skip();

		const opts = { ...sandboxOpts, apiKey: BIZGO_API_KEY };

		const intended = Date.now() + 10 * 60 * 60 * 1000;
		const utc = new Date(intended).toISOString().slice(0, 19).replace('T', ' ');

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
				resvSendTime: utc,
			},
			opts,
		);

		assert.ok(!(created instanceof Error));
		assert.equal(created.ok, true);
		assert.ok('resvKey' in created.body.data);

		const { resvKey } = created.body.data;
		t.after(() => cancelReservation(resvKey, opts));

		const response = await getReservation(resvKey, opts);

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, true);
		assert.ok('data' in response.body.data);

		// Accepts both `yyyy-MM-ddTHH:mm:ss+09:00` and `yyyy-MM-dd HH:mm:ss` (KST).
		const registered = response.body.data.data.resvSendTime.replace(' ', 'T');
		const registeredAt = Date.parse(
			/[+-]\d{2}:\d{2}$/.test(registered) ? registered : `${registered}+09:00`,
		);

		assert.equal(registeredAt, Math.floor(intended / 1000) * 1000 - KST_OFFSET);
	});
});
