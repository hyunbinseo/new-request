import assert from 'node:assert/strict';
import { test } from 'node:test';
import { updateReservation } from './key.ts';

const opts = { apiKey: 'test-api-key' };

void test('sends a PUT request with the updated fields', async () => {
	let request: Request | undefined;

	await updateReservation(
		'MO20260501100000abcdef',
		{ resvSendTime: '2026-05-01 11:00:00', resvName: '금요일 캠페인 수정' },
		{
			...opts,
			fetch: async (input) => {
				request = input as Request;
				return Response.json({
					common: { authCode: 'A000', authResult: 'Success', infobankTrId: 'id' },
					data: { code: 'A000', result: 'Success', data: { resvKey: 'MO20260501100000abcdef' } },
				});
			},
		},
	);

	assert.ok(request);
	assert.equal(request.method, 'PUT');
	assert.equal(
		request.url,
		'https://mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef',
	);
	assert.deepEqual(await request.json(), {
		resvSendTime: '2026-05-01 11:00:00',
		resvName: '금요일 캠페인 수정',
	});
});

void test('returns ok: false with the parsed body on failure', async () => {
	const responseBody = {
		common: { authCode: 'E001', authResult: 'Fail', infobankTrId: 'id' },
		data: { code: 'E001', result: 'Fail' },
	};

	const result = await updateReservation(
		'MO20260501100000abcdef',
		{ resvSendTime: '2026-05-01 11:00:00' },
		{ ...opts, fetch: async () => Response.json(responseBody, { status: 400 }) },
	);

	assert.deepEqual(result, { ok: false, body: responseBody });
});
