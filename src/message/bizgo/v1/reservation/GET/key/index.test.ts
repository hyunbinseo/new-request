import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bizgoEnv } from '../../env.ts';
import { getReservation } from './index.ts';

const opts = { apiKey: bizgoEnv.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a GET request to the resvKey endpoint', async () => {
	let request: Request | undefined;

	await getReservation('MO20260501100000abcdef', {
		...opts,
		fetch: async (input) => {
			request = (input as Request).clone();
			return fetch(input);
		},
	});

	assert.ok(request);
	assert.equal(request.method, 'GET');
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef',
	);
	assert.equal(request.headers.get('Authorization'), bizgoEnv.BIZGO_API_KEY);
});

void test('encodes special characters in resvKey', async () => {
	let request: Request | undefined;

	await getReservation('key/with?special#chars', {
		...opts,
		fetch: async (input) => {
			request = input as Request;
			return fetch(input);
		},
	});

	assert.ok(request);
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/key%2Fwith%3Fspecial%23chars',
	);
});
