import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { sendEmail, type RequestBody } from './index.ts';

const opts = { apiKey: 'apiKey_stub', from: { email: 'from@example.com' } };

void describe('email/send-grid/v3/POST', () => {
	void test('falls back to opts.from without mutating the request body', async () => {
		const { fetch, requests } = captureFetch();
		const requestBody: RequestBody = {
			personalizations: [{ to: [{ email: 'to@example.com' }] }],
			subject: 'subject',
			content: [{ type: 'text/plain', value: 'value' }],
		};

		await sendEmail(requestBody, { ...opts, fetch });

		const [request] = requests;
		assert.ok(request);
		assert.deepEqual(((await request.json()) as RequestBody).from, { email: 'from@example.com' });
		assert.equal(requestBody.from, undefined);
	});
});
