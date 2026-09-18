import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bizgoEnv, skip } from '../../env.ts';
import { updateReservation } from './index.ts';

const opts = { apiKey: bizgoEnv.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a PUT request with the updated fields', { skip }, async () => {
	let request: Request | undefined;

	await updateReservation(
		'MO20260501100000abcdef',
		{ resvSendTime: '2026-05-01 11:00:00', resvName: '금요일 캠페인 수정' },
		{
			...opts,
			fetch: async (input) => {
				request = (input as Request).clone();
				return fetch(input);
			},
		},
	);

	assert.ok(request);
	assert.equal(request.method, 'PUT');
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef',
	);
	assert.deepEqual(await request.json(), {
		resvSendTime: '2026-05-01 11:00:00',
		resvName: '금요일 캠페인 수정',
	});
});
