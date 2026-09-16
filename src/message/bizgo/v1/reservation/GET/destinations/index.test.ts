import assert from 'node:assert/strict';
import { test } from 'node:test';
import { env } from '../../env.ts';
import { getReservationDestinations } from './index.ts';

const opts = { apiKey: env.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a GET request with the query params', async () => {
	let request: Request | undefined;

	await getReservationDestinations(
		'MO20260501100000abcdef',
		{ limit: 100 },
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
						data: { lastSeq: 10, hasNext: false, destinations: [] },
					},
				});
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

void test('returns ok: false with the parsed body on failure', async () => {
	const responseBody = {
		common: { authCode: 'E001', authResult: 'Fail', infobankTrId: 'id' },
		data: { code: 'E001', result: 'Fail' },
	};

	const result = await getReservationDestinations(
		'MO20260501100000abcdef',
		{},
		{ ...opts, fetch: async () => Response.json(responseBody, { status: 400 }) },
	);

	assert.deepEqual(result, { ok: false, body: responseBody });
});
