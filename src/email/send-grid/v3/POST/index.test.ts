import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { sendEmail, type RequestBody } from './index.ts';

const opts = { apiKey: 'apiKey_stub', from: { email: 'from@example.com' } };

void describe('email/send-grid/v3/POST', () => {
	void test('falls back to opts.from without mutating the request body', async () => {
		const input: RequestBody = {
			personalizations: [{ to: [{ email: 'to@example.com' }] }],
			subject: 'subject',
			content: [{ type: 'text/plain', value: 'value' }],
		};

		const expected = { ...input, from: { email: 'from@example.com' } };

		const { fetch, requests } = captureFetch();
		await sendEmail(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.deepEqual(await request.json(), expected);
		assert.equal(input.from, undefined);
	});

	void test('prefers from in the request body over options', async () => {
		const input: RequestBody = {
			personalizations: [{ to: [{ email: 'to@example.com' }] }],
			from: { email: 'body@example.com' },
			subject: 'subject',
			content: [{ type: 'text/plain', value: 'value' }],
		};

		const { fetch, requests } = captureFetch();
		await sendEmail(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.deepEqual(await request.json(), input);
	});
});
