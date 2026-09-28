import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { zoomOpts } from '../../../env.ts';
import { getAccessToken } from './index.ts';

const opts = {
	accountId: 'accountId_stub',
	clientId: 'clientId_stub',
	clientSecret: 'clientSecret_stub',
};

void describe('meeting/zoom/oauth/token/POST', () => {
	void test('sends a URL-encoded body with the account_credentials grant type', async () => {
		const expected = { grant_type: 'account_credentials', account_id: 'accountId_stub' };

		const { fetch, requests } = captureFetch();
		await getAccessToken({ ...opts, fetch });
		const [request] = requests;

		assert.ok(request);

		const formData = await request.formData();

		assert.deepEqual(Object.fromEntries(formData), expected);
	});

	void test('issues an access token', async (t) => {
		if (!zoomOpts) return t.skip();

		const response = await getAccessToken(zoomOpts);

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, true);
		assert.ok('access_token' in response.body);
		assert.equal(response.body.token_type, 'bearer');
		assert.match(response.body.api_url, /^https:\/\/api(-\w+)?\.zoom\.us$/);
	});

	void test('rejects invalid credentials with 400', async (t) => {
		if (!zoomOpts) return t.skip();

		const cases = [
			{
				name: 'invalid clientSecret',
				opts: { ...zoomOpts, clientSecret: 'invalid' },
				error: 'invalid_client',
			},
			{
				name: 'invalid accountId',
				opts: { ...zoomOpts, accountId: 'invalid' },
				error: 'invalid_request',
			},
		];

		for (const { name, opts, error } of cases) {
			await t.test(name, async () => {
				const response = await getAccessToken(opts);

				assert.ok(!(response instanceof Error));
				assert.equal(response.ok, false);
				assert.equal(response.status, 400);
				assert.ok('error' in response.body);
				assert.equal(response.body.error, error);
			});
		}
	});
});
