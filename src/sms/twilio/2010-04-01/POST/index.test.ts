import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { sendSms } from './index.ts';

const opts = { accountSid: 'AC_stub', authToken: 'authToken_stub', from: '+15005550006' };

void describe('sms/twilio/2010-04-01/POST', () => {
	void test('builds the URL from accountSid', async () => {
		const { fetch, requests } = captureFetch();

		await sendSms({ body: 'body', to: '+821000000000' }, { ...opts, fetch });

		const [request] = requests;
		assert.ok(request);
		assert.equal(request.url, 'https://api.twilio.com/2010-04-01/Accounts/AC_stub/Messages.json');
	});

	void test('sends a URL-encoded body with capitalized keys', async () => {
		const { fetch, requests } = captureFetch();

		await sendSms({ body: 'body', to: '+821000000000' }, { ...opts, fetch });

		const [request] = requests;
		assert.ok(request);
		assert.equal(await request.text(), 'From=%2B15005550006&Body=body&To=%2B821000000000');
	});

	void test('prefers from in the request body over options', async () => {
		const { fetch, requests } = captureFetch();

		await sendSms({ body: 'body', to: '+821000000000', from: '+15005550007' }, { ...opts, fetch });

		const [request] = requests;
		assert.ok(request);
		assert.equal(new URLSearchParams(await request.text()).get('From'), '+15005550007');
	});
});
