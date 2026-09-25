import assert from 'node:assert/strict';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import { sendMessage, type RequestBody } from './index.ts';

void describe('message/bizgo/v1/send/omni/POST', () => {
	void test('sends an alimtalk to the sandbox', async (t) => {
		const {
			BIZGO_API_KEY,
			BIZGO_DESTINATION_PHONE_NUMBER,
			BIZGO_KAKAO_SENDER_KEY,
			BIZGO_KAKAO_TEMPLATE_CODE,
		} = env;
		if (
			!BIZGO_API_KEY ||
			!BIZGO_DESTINATION_PHONE_NUMBER ||
			!BIZGO_KAKAO_SENDER_KEY ||
			!BIZGO_KAKAO_TEMPLATE_CODE
		)
			return t.skip();

		const input: RequestBody = {
			destinations: [{ to: BIZGO_DESTINATION_PHONE_NUMBER }],
			messageFlow: [
				{
					alimtalk: {
						msgType: 'AT',
						senderKey: BIZGO_KAKAO_SENDER_KEY,
						templateCode: BIZGO_KAKAO_TEMPLATE_CODE,
						text: '알림톡 발송 테스트입니다.',
					},
				},
			],
			// Unique per run so repeated runs don't collide on ref uniqueness.
			ref: `mt-${Date.now()}`,
		};

		const response = await sendMessage(input, {
			apiKey: BIZGO_API_KEY,
			baseURL: 'https://sandbox-mars.ibapi.kr',
		});

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, true, JSON.stringify(response.body));
	});
});
