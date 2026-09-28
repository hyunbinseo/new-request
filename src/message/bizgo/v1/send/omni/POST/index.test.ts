import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import {
	국내_수신번호,
	국제_수신번호,
	발신번호,
	카카오톡_알림톡_메시지,
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
			messageFlow: [카카오톡_알림톡_메시지],
			ref: `mt-${Date.now()}-${randomBytes(4).toString('hex')}`,
		};

		const response = await sendMessage(input, opts);

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, true);
		assert.ok('data' in response.body.data);
		assert.equal(response.body.data.data.destinations[0]?.to, 국내_수신번호);
	});

	// See https://github.com/hyunbinseo/new-request/issues/15
	void test('accepts an international number with or without +', async (t) => {
		const { BIZGO_API_KEY } = env;
		if (!BIZGO_API_KEY) return t.skip();

		const opts = { ...sandboxOpts, apiKey: BIZGO_API_KEY };

		for (const to of [국제_수신번호, `+${국제_수신번호}`]) {
			await t.test(to, async (t) => {
				const response = await sendMessage(
					{
						destinations: [{ to }],
						messageFlow: [
							{
								international: {
									from: 발신번호,
									text: '국제문자 발송 테스트입니다.',
								},
							},
						],
					},
					opts,
				);

				assert.ok(!(response instanceof Error));

				// International sending must be requested for the API key.
				if (response.body.data.code === 'A325') return t.skip('A325: no international permission');

				assert.equal(response.ok, true);
			});
		}
	});
});
