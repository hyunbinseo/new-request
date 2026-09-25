import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { sendSms } from './index.ts';

const opts = { appKey: 'appKey_stub', secretKey: 'secretKey_stub' };

void describe('sms/nhn/v3.0/POST', () => {
	void test('builds the URL from appKey and type', async () => {
		const { fetch, requests } = captureFetch();

		await sendSms(
			{ type: 'auth/sms', body: 'body', sendNo: '01000000000', recipientList: [] },
			{ ...opts, fetch },
		);

		const [request] = requests;
		assert.ok(request);
		assert.equal(
			request.url,
			'https://sms.api.nhncloudservice.com/sms/v3.0/appKeys/appKey_stub/sender/auth/sms',
		);
	});

	void test('derives ok from the response body', async () => {
		const { fetch } = captureFetch(() =>
			Response.json({ header: { isSuccessful: false, resultCode: -1, resultMessage: '' } }),
		);

		const response = await sendSms(
			{ type: 'sms', body: 'body', sendNo: '01000000000', recipientList: [] },
			{ ...opts, fetch },
		);

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, false);
	});
});
