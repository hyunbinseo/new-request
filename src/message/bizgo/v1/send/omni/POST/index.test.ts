import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import {
	국내_수신번호,
	카카오톡_발신_프로필_키,
	카카오톡_알림톡_템플릿_코드,
} from '#bizgo/v1/sandbox/constants.ts';
import { sandboxOpts } from '#bizgo/v1/sandbox/fetch.ts';
import { sendMessage, type RequestBody } from './index.ts';

void describe('message/bizgo/v1/send/omni/POST', () => {
	void test('sends an alimtalk to the sandbox', async (t) => {
		const { BIZGO_API_KEY } = env;
		if (!BIZGO_API_KEY) return t.skip();

		const opts = { ...sandboxOpts, apiKey: BIZGO_API_KEY };

		const input: RequestBody = {
			destinations: [{ to: 국내_수신번호 }],
			messageFlow: [
				{
					alimtalk: {
						msgType: 'AT',
						senderKey: 카카오톡_발신_프로필_키,
						templateCode: 카카오톡_알림톡_템플릿_코드,
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
		assert.equal(response.body.data.data.destinations[0]?.to, 국내_수신번호);
	});
});
