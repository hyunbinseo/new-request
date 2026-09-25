import assert from 'node:assert/strict';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import { parse } from 'valibot';
import { SandboxEnvSchema } from '#bizgo/v1/testing/env.ts';
import { sendMessage, type RequestBody } from './index.ts';

const sandbox = parse(SandboxEnvSchema, env);

void describe('message/bizgo/v1/send/omni/POST', () => {
	void test('sends an alimtalk to the sandbox', async (t) => {
		if (!sandbox?.destinationPhoneNumber || !sandbox.kakao) return t.skip();
		const { opts, destinationPhoneNumber, kakao } = sandbox;

		const input: RequestBody = {
			destinations: [{ to: destinationPhoneNumber }],
			messageFlow: [{ alimtalk: { msgType: 'AT', ...kakao, text: '알림톡 발송 테스트입니다.' } }],
			// Unique per run so repeated runs don't collide on ref uniqueness.
			ref: `mt-${Date.now()}`,
		};

		const response = await sendMessage(input, opts);

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, true, JSON.stringify(response.body));
	});
});
