import assert from 'node:assert/strict';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { sendEmail, type RequestBody } from './index.ts';

const opts = { serverToken: 'serverToken_stub', from: 'from@example.com' };

void describe('email/postmark/POST', () => {
	void test('falls back to opts.from without mutating the request body', async () => {
		const input: RequestBody = { To: 'to@example.com', TextBody: 'text' };
		const expected = { ...input, From: 'from@example.com' };

		const { fetch, requests } = captureFetch();
		await sendEmail(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.deepEqual(await request.json(), expected);
		assert.equal(input.From, undefined);
	});

	void test('prefers From in the request body over options', async () => {
		const input: RequestBody = {
			From: 'body@example.com',
			To: 'to@example.com',
			TextBody: 'text',
		};

		const { fetch, requests } = captureFetch();
		await sendEmail(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.deepEqual(await request.json(), input);
	});

	void test('sends an email to the sandbox', async (t) => {
		const { POSTMARK_SERVER_TOKEN } = env;
		if (!POSTMARK_SERVER_TOKEN) return t.skip();

		const input: RequestBody = { To: 'to@example.com', TextBody: 'text' };

		const response = await sendEmail(input, { ...opts, serverToken: POSTMARK_SERVER_TOKEN });

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, true);
	});
});
