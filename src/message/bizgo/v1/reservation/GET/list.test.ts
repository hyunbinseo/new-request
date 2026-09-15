import assert from 'node:assert/strict';
import { test } from 'node:test';
import { listReservations } from './list.ts';

const opts = { apiKey: 'test-api-key' };

void test('sends a GET request with the query params', async () => {
	let request: Request | undefined;

	await listReservations(
		{ resvSendTime: '2026-05', paymentCode: 'SMS07', lastSeq: 100, limit: 50 },
		{
			...opts,
			fetch: async (input) => {
				request = input as Request;
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
		'https://mars.ibapi.kr/api/comm/v1/reservation/list?resvSendTime=2026-05&paymentCode=SMS07&lastSeq=100&limit=50',
	);
	assert.equal(request.headers.get('Authorization'), 'test-api-key');
});

void test('returns ok: false with the parsed body on failure', async () => {
	const responseBody = {
		common: { authCode: 'E001', authResult: 'Fail', infobankTrId: 'id' },
		data: { code: 'E001', result: 'Fail' },
	};

	const result = await listReservations(
		{ resvSendTime: '2026-05' },
		{ ...opts, fetch: async () => Response.json(responseBody, { status: 400 }) },
	);

	assert.deepEqual(result, { ok: false, body: responseBody });
});
