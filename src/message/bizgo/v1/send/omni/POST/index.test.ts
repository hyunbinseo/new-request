import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parse } from 'valibot';
import { SandboxEnvSchema } from '#bizgo/v1/testing/env.ts';
import { expectOk } from '#bizgo/v1/testing/expect.ts';
import { sendMessage } from './index.ts';

const env = parse(SandboxEnvSchema, process.env);

void test('sends an alimtalk', async (t) => {
	if (!env) return t.skip();

	const { opts, destinationPhoneNumber, kakao } = env;
	if (!destinationPhoneNumber || !kakao) return t.skip();

	const body = expectOk(
		await sendMessage(
			{
				destinations: [{ to: destinationPhoneNumber }],
				messageFlow: [{ alimtalk: { msgType: 'AT', ...kakao, text: '알림톡 발송 테스트입니다.' } }],
				// Unique per run so repeated runs don't collide on ref uniqueness.
				ref: `mt-${Date.now()}`,
			},
			opts,
		),
	);

	assert.equal(body.data.data.destinations[0]?.to, destinationPhoneNumber);
});
