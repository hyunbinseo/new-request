import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parse } from 'valibot';
import { skip, zoomEnv } from '../env.ts';
import { vUserTokenQuery, vUserTokenResponse } from './user/valibot.gen.ts';

const getAccessToken = async () => {
	const response = await fetch('https://zoom.us/oauth/token', {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${btoa(`${zoomEnv.ZOOM_CLIENT_ID}:${zoomEnv.ZOOM_CLIENT_SECRET}`)}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'account_credentials',
			account_id: zoomEnv.ZOOM_ACCOUNT_ID,
		}),
	});
	assert.equal(response.status, 200);
	return ((await response.json()) as { access_token: string }).access_token;
};

void test('GET /users/me/token?type=zak matches the generated schemas', { skip }, async () => {
	const accessToken = await getAccessToken();

	// Fills in spec defaults (ttl: 7200) and rejects unknown token types.
	const query = parse(vUserTokenQuery, { type: 'zak' });
	const url = new URL('/v2/users/me/token', 'https://api.zoom.us');
	for (const [key, value] of Object.entries(query)) url.searchParams.set(key, String(value));

	const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
	assert.equal(response.status, 200);

	const body = parse(vUserTokenResponse, await response.json());
	assert.ok(body.token);
	assert.ok(body.token.length <= 512); // documented maximum length
});
