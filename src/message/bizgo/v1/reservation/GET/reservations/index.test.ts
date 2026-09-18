import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bizgoEnv, skip } from '../../env.ts';
import { getReservations } from './index.ts';

const opts = { apiKey: bizgoEnv.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a GET request with the query params', { skip }, async () => {
	let request: Request | undefined;

	await getReservations(
		{ resvSendTime: '2026-05', paymentCode: 'SMS07', lastSeq: 100, limit: 50 },
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
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/list?resvSendTime=2026-05&paymentCode=SMS07&lastSeq=100&limit=50',
	);
	assert.equal(request.headers.get('Authorization'), bizgoEnv.BIZGO_API_KEY);
});

void test('returns an Error instead of throwing when request construction fails', async () => {
	const result = await getReservations(
		{ resvSendTime: '2026-05' },
		{ apiKey: 'invalid\nheader\nvalue', baseURL: 'https://sandbox-mars.ibapi.kr' },
	);

	assert.ok(result instanceof Error);
});
