import assert from 'node:assert/strict';
import { test } from 'node:test';
import { listReservationDestinations } from './destinations.ts';

const opts = { apiKey: 'test-api-key' };

void test('sends a GET request with the query params', async () => {
	let request: Request | undefined;

	await listReservationDestinations(
		'MO20260501100000abcdef',
		{ limit: 100 },
		{
			...opts,
			fetch: async (input) => {
				request = input as Request;
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
		'https://mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef/destinations?limit=100',
	);
});

void test('returns ok: false with the parsed body on failure', async () => {
	const responseBody = {
		common: { authCode: 'E001', authResult: 'Fail', infobankTrId: 'id' },
		data: { code: 'E001', result: 'Fail' },
	};

	const result = await listReservationDestinations(
		'MO20260501100000abcdef',
		{},
		{ ...opts, fetch: async () => Response.json(responseBody, { status: 400 }) },
	);

	assert.deepEqual(result, { ok: false, body: responseBody });
});
