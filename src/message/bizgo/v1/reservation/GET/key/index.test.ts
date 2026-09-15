import assert from 'node:assert/strict';
import { test } from 'node:test';
import { env, live } from '../../env.ts';
import { getReservation } from './index.ts';

const opts = { apiKey: env.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a GET request to the resvKey endpoint', async () => {
	let request: Request | undefined;

	await getReservation('MO20260501100000abcdef', {
		...opts,
		fetch: async (input) => {
			request = (input as Request).clone();
			if (live) return fetch(input);
			return Response.json({
				common: { authCode: 'A000', authResult: 'Success', infobankTrId: 'id' },
				data: { code: 'A000', result: 'Success', data: { resvKey: 'MO20260501100000abcdef' } },
			});
		},
	});

	assert.ok(request);
	assert.equal(request.method, 'GET');
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef',
	);
	assert.equal(request.headers.get('Authorization'), env.BIZGO_API_KEY);
});

void test('encodes special characters in resvKey', async () => {
	let request: Request | undefined;

	await getReservation('key/with?special#chars', {
		...opts,
		fetch: async (input) => {
			request = input as Request;
			return Response.json({});
		},
	});

	assert.ok(request);
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/key%2Fwith%3Fspecial%23chars',
	);
});

void test('returns ok: false with the parsed body on failure', async () => {
	const responseBody = {
		common: { authCode: 'E001', authResult: 'Fail', infobankTrId: 'id' },
		data: { code: 'E001', result: 'Fail' },
	};

	const result = await getReservation('MO20260501100000abcdef', {
		...opts,
		fetch: async () => Response.json(responseBody, { status: 404 }),
	});

	assert.deepEqual(result, { ok: false, body: responseBody });
});
