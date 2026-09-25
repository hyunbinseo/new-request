import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { sendSms, type RequestBody } from './index.ts';

const opts = { accountSid: 'AC_stub', authToken: 'authToken_stub', from: '+15005550006' };

void describe('sms/twilio/2010-04-01/POST', () => {
	void test('builds the URL from accountSid', async () => {
		const input: RequestBody = { body: 'body', to: '+821000000000' };

		const { fetch, requests } = captureFetch();
		await sendSms(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.equal(request.url, 'https://api.twilio.com/2010-04-01/Accounts/AC_stub/Messages.json');
	});

	void test('sends a URL-encoded body with capitalized keys, falling back to opts.from', async () => {
		const input: RequestBody = { body: 'body', to: '+821000000000' };
		const expected = { From: '+15005550006', Body: 'body', To: '+821000000000' };

		const { fetch, requests } = captureFetch();
		await sendSms(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);

		const formData = await request.formData();

		assert.deepEqual(Object.fromEntries(formData), expected);
	});

	void test('prefers from in the request body over options', async () => {
		const input: RequestBody = { body: 'body', to: '+821000000000', from: '+15005550007' };
		const expected = { From: '+15005550007', Body: 'body', To: '+821000000000' };

		const { fetch, requests } = captureFetch();
		await sendSms(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);

		const formData = await request.formData();

		assert.deepEqual(Object.fromEntries(formData), expected);
	});
});
