import assert from 'node:assert/strict';
import { test } from 'node:test';
import { env } from '../../env.ts';
import { getReservations } from './index.ts';

const opts = { apiKey: env.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a GET request with the query params', async () => {
	let request: Request | undefined;

	await getReservations(
		{ resvSendTime: '2026-05', paymentCode: 'SMS07', lastSeq: 100, limit: 50 },
		{
			...opts,
			fetch: async (input) => {
				request = (input as Request).clone();
				if (env.useSandboxApi) return fetch(input);
				return Response.json({
					common: { authCode: 'A000', authResult: 'Success', infobankTrId: 'id' },
					data: {
						code: 'A000',
						result: 'Success',
						data: { lastSeq: 100, hasNext: false, reservations: [] },
					},
				});
			},
		},
	);

	assert.ok(request);
	assert.equal(request.method, 'GET');
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/list?resvSendTime=2026-05&paymentCode=SMS07&lastSeq=100&limit=50',
	);
	assert.equal(request.headers.get('Authorization'), env.BIZGO_API_KEY);
});

void test('returns ok: false with the parsed body on failure', async () => {
	const responseBody = {
		common: { authCode: 'E001', authResult: 'Fail', infobankTrId: 'id' },
		data: { code: 'E001', result: 'Fail' },
	};

	const result = await getReservations(
		{ resvSendTime: '2026-05' },
		{ ...opts, fetch: async () => Response.json(responseBody, { status: 400 }) },
	);

	assert.deepEqual(result, { ok: false, body: responseBody });
});

void test('returns an Error instead of throwing when request construction fails', async () => {
	const result = await getReservations(
		{ resvSendTime: '2026-05' },
		{ apiKey: 'invalid\nheader\nvalue', baseURL: 'https://sandbox-mars.ibapi.kr' },
	);

	assert.ok(result instanceof Error);
});
