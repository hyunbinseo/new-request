import assert from 'node:assert/strict';
import { test } from 'node:test';
import { env } from '../../env.ts';
import { addReservationDestinations } from './index.ts';

const opts = { apiKey: env.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a POST request with the new destinations', async () => {
	let request: Request | undefined;

	await addReservationDestinations(
		'MO20260501100000abcdef',
		{ destinations: [{ to: '01000000000', replaceWords: { name: '홍길동' }, ref: 'dest-001' }] },
		{
			...opts,
			fetch: async (input) => {
				request = (input as Request).clone();
				if (env.useSandboxApi) return fetch(input);
				return Response.json({
					common: { authCode: 'A000', authResult: 'Success', infobankTrId: 'id' },
					data: { code: 'A000', result: 'Success', data: { inserted: 1 } },
				});
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

void test('returns ok: false with the parsed body on failure', async () => {
	const responseBody = {
		common: { authCode: 'E001', authResult: 'Fail', infobankTrId: 'id' },
		data: { code: 'E001', result: 'Fail' },
	};

	const result = await addReservationDestinations(
		'MO20260501100000abcdef',
		{ destinations: [{ to: '01000000000' }] },
		{ ...opts, fetch: async () => Response.json(responseBody, { status: 400 }) },
	);

	assert.deepEqual(result, { ok: false, body: responseBody });
});
