import assert from 'node:assert/strict';
import { test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { sendEmail, type RequestBody } from './index.ts';

const opts = { serverToken: 'serverToken_stub', from: 'from@example.com' };

void test('falls back to opts.from without mutating the request body', async () => {
	const { fetch, requests } = captureFetch();
	const requestBody: RequestBody = { To: 'to@example.com', TextBody: 'text' };

	await sendEmail(requestBody, { ...opts, fetch });

	const [request] = requests;
	assert.ok(request);
	assert.equal(((await request.json()) as RequestBody).From, 'from@example.com');
	assert.equal(requestBody.From, undefined);
});
