import assert from 'node:assert/strict';
import { env } from 'node:process';
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

	void test('issues an access token', async (t) => {
		const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = env;
		if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) return t.skip();

		const response = await getAccessToken(
			{ account_id: ZOOM_ACCOUNT_ID },
			{ clientId: ZOOM_CLIENT_ID, clientSecret: ZOOM_CLIENT_SECRET },
		);

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, true);
		assert.ok('access_token' in response.body);
		assert.equal(response.body.token_type, 'bearer');
		assert.match(response.body.api_url, /^https:\/\/api(-\w+)?\.zoom\.us$/);
	});

	void test('rejects invalid credentials with 400', async (t) => {
		const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = env;
		if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) return t.skip();

		const cases = [
			{
				name: 'invalid clientSecret',
				input: { account_id: ZOOM_ACCOUNT_ID },
				opts: { clientId: ZOOM_CLIENT_ID, clientSecret: 'invalid' },
				error: 'invalid_client',
			},
			{
				name: 'invalid account_id',
				input: { account_id: 'invalid' },
				opts: { clientId: ZOOM_CLIENT_ID, clientSecret: ZOOM_CLIENT_SECRET },
				error: 'invalid_request',
			},
		];

		for (const { name, input, opts, error } of cases) {
			await t.test(name, async () => {
				const response = await getAccessToken(input, opts);

				assert.ok(!(response instanceof Error));
				assert.equal(response.ok, false);
				assert.equal(response.status, 400);
				assert.ok('error' in response.body);
				assert.equal(response.body.error, error);
			});
		}
	});
});
