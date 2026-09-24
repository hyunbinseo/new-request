import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bizgoEnv, skip } from '../../../env.ts';
import { cancelReservation } from './index.ts';

const opts = { apiKey: bizgoEnv.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a POST request to the cancel endpoint', { skip }, async () => {
	let request: Request | undefined;

	const result = await cancelReservation('MO20260501100000abcdef', {
		...opts,
		fetch: async (input) => {
			request = (input as Request).clone();
			return fetch(input);
		},
	});

	assert.ok(request);
	assert.equal(request.method, 'POST');
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef/cancel',
	);
	assert.equal(request.headers.get('Authorization'), bizgoEnv.BIZGO_API_KEY);
	assert.equal(request.headers.get('Content-Type'), 'application/json');

	// The sandbox round-trip and JSON parse must have produced a structured result.
	if (result instanceof Error) throw result;
	assert.equal(typeof result.ok, 'boolean');
});
