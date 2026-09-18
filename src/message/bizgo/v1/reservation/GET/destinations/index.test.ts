import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bizgoEnv, skip } from '../../env.ts';
import { getReservationDestinations } from './index.ts';

const opts = { apiKey: bizgoEnv.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a GET request with the query params', { skip }, async () => {
	let request: Request | undefined;

	await getReservationDestinations(
		'MO20260501100000abcdef',
		{ limit: 100 },
		{
			...opts,
			fetch: async (input) => {
				request = (input as Request).clone();
				return fetch(input);
			},
		},
	);

	assert.ok(request);
	assert.equal(request.method, 'GET');
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef/destinations?limit=100',
	);
});
