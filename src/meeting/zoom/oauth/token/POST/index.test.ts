import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { getAccessToken, type RequestBody } from './index.ts';

const opts = { clientId: 'clientId_stub', clientSecret: 'clientSecret_stub' };

void describe('meeting/zoom/oauth/token/POST', () => {
	void test('sends a URL-encoded body with the account_credentials grant type', async () => {
		const input: RequestBody = { account_id: 'account_id_stub' };
		const expected = { grant_type: 'account_credentials', account_id: 'account_id_stub' };

		const { fetch, requests } = captureFetch();
		await getAccessToken(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);

		const formData = await request.formData();

		assert.deepEqual(Object.fromEntries(formData), expected);
	});
});
