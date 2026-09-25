import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { describe, test } from 'node:test';
import { sandbox } from '#bizgo/v1/testing/env.ts';
import { sendMessage, type RequestBody } from './index.ts';

void describe('message/bizgo/v1/send/omni/POST', () => {
	void test('sends an alimtalk to the sandbox', async (t) => {
		if (!sandbox) return t.skip();

		const input: RequestBody = {
			destinations: [{ to: sandbox.destinationPhoneNumber }],
			messageFlow: [
				{
					alimtalk: {
						msgType: 'AT',
						...sandbox.kakao,
						text: '알림톡 발송 테스트입니다.',
					},
				},
			],
			ref: `mt-${Date.now()}-${randomBytes(4).toString('hex')}`,
		};

		const response = await sendMessage(input, sandbox.opts);

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, true, JSON.stringify(response.body));
	});
});
