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
import { sendMessage, type RequestBody } from './index.ts';

void describe('message/bizgo/v1/send/omni/POST', () => {
	void test('sends an alimtalk to the sandbox', async (t) => {
		const { BIZGO_API_KEY } = env;
		if (!BIZGO_API_KEY) return t.skip();

		const opts = { ...sandboxOpts, apiKey: BIZGO_API_KEY };

		const input: RequestBody = {
			destinations: [{ to: DESTINATION_PHONE_NUMBER }],
			messageFlow: [
				{
					alimtalk: {
						msgType: 'AT',
						senderKey: KAKAO_SENDER_KEY,
						templateCode: KAKAO_TEMPLATE_CODE,
						text: '알림톡 발송 테스트입니다.',
					},
				},
			],
			ref: `mt-${Date.now()}-${randomBytes(4).toString('hex')}`,
		};

		const response = await sendMessage(input, opts);

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, true);
		assert.ok('data' in response.body.data);
		assert.equal(response.body.data.data.destinations[0]?.to, DESTINATION_PHONE_NUMBER);
	});
});
