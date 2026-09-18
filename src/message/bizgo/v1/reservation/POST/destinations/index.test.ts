import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bizgoEnv } from '../../env.ts';
import { addReservationDestinations } from './index.ts';

const opts = { apiKey: bizgoEnv.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a POST request with the new destinations', async () => {
	let request: Request | undefined;

	await addReservationDestinations(
		'MO20260501100000abcdef',
		{ destinations: [{ to: '01000000000', replaceWords: { name: '홍길동' }, ref: 'dest-001' }] },
		{
			...opts,
			fetch: async (input) => {
				request = (input as Request).clone();
				return fetch(input);
			},
		},
	);

	assert.ok(request);
	assert.equal(request.method, 'POST');
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef/destinations',
	);
	assert.deepEqual(await request.json(), {
		destinations: [{ to: '01000000000', replaceWords: { name: '홍길동' }, ref: 'dest-001' }],
	});
});
