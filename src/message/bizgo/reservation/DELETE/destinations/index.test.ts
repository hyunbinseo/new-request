import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bizgoEnv, skip } from '../../env.ts';
import { deleteReservationDestination } from './index.ts';

const opts = { apiKey: bizgoEnv.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a DELETE request to the msgKey endpoint', { skip }, async () => {
	let request: Request | undefined;

	const result = await deleteReservationDestination(
		'MO20260501100000abcdef',
		'20260424104234546POM101182450000',
		{
			...opts,
			fetch: async (input) => {
				request = (input as Request).clone();
				return fetch(input);
			},
		},
	);

	assert.ok(request);
	assert.equal(request.method, 'DELETE');
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef/destinations/msgKey/20260424104234546POM101182450000',
	);
	assert.equal(request.headers.get('Authorization'), bizgoEnv.BIZGO_API_KEY);

	// The sandbox round-trip and JSON parse must have produced a structured result.
	if (result instanceof Error) throw result;
	assert.equal(typeof result.ok, 'boolean');
});
