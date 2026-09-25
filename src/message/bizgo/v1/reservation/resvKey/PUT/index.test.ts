import assert from 'node:assert/strict';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import { PRODUCTION_BASE_URL } from '#bizgo/v1/constants.ts';
import {
	DESTINATION_PHONE_NUMBER,
	KAKAO_SENDER_KEY,
	KAKAO_TEMPLATE_CODE,
} from '#bizgo/v1/sandbox/constants.ts';
import { sandboxOpts } from '#bizgo/v1/sandbox/fetch.ts';
import { getFutureResvSendTime } from '#bizgo/v1/sandbox/time.ts';
import { captureFetch } from '#lib/testing.ts';
import { createReservation } from '../../POST/index.ts';
import { cancelReservation } from '../cancel/POST/index.ts';
import { updateReservation } from './index.ts';

const opts = { apiKey: 'apiKey_stub' };

void describe('message/bizgo/v1/reservation/resvKey/PUT', () => {
	void test('builds the URL from the encoded resvKey', async () => {
		const { fetch, requests } = captureFetch();
		await updateReservation(
			'key/with?special#chars',
			{ resvSendTime: '2026-05-01 10:00:00' },
			{ ...opts, fetch },
		);
		const [request] = requests;

		assert.ok(request);
		assert.equal(
			request.url,
			`${PRODUCTION_BASE_URL}/api/comm/v1/reservation/resvKey/key%2Fwith%3Fspecial%23chars`,
		);
	});

	void test('rejects an out-of-range resvSendTime', async (t) => {
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
			},
			opts,
		);

		assert.ok(!(created instanceof Error));
		assert.equal(created.ok, true);
		assert.ok('resvKey' in created.body.data);

		const { resvKey } = created.body.data;
		t.after(() => cancelReservation(resvKey, opts));

		const cases = [
			{ name: 'less than 10 minutes ahead', ms: 5 * 60 * 1000, code: 'A823' },
			{ name: 'more than 1 year ahead', ms: 366 * 24 * 60 * 60 * 1000, code: 'A331' },
		];

		for (const { name, ms, code } of cases) {
			await t.test(name, async () => {
				const response = await updateReservation(
					resvKey,
					{ resvSendTime: getFutureResvSendTime(ms) },
					opts,
				);

				assert.ok(!(response instanceof Error));
				assert.equal(response.ok, false);
				assert.equal(response.body.data.code, code);
			});
		}
	});
});
