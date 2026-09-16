import assert from 'node:assert/strict';
import { test } from 'node:test';
import { env } from '../../env.ts';
import { updateReservation } from './index.ts';

const opts = { apiKey: env.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a PUT request with the updated fields', async () => {
	let request: Request | undefined;

	await updateReservation(
		'MO20260501100000abcdef',
		{ resvSendTime: '2026-05-01 11:00:00', resvName: '금요일 캠페인 수정' },
		{
			...opts,
			fetch: async (input) => {
				request = (input as Request).clone();
				if (env.useSandboxApi) return fetch(input);
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
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef',
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
