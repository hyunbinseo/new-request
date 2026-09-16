import assert from 'node:assert/strict';
import { test } from 'node:test';
import { env } from '../../env.ts';
import { deleteReservationDestination } from './index.ts';

const opts = { apiKey: env.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void test('sends a DELETE request to the msgKey endpoint', async () => {
	let request: Request | undefined;

	await deleteReservationDestination('MO20260501100000abcdef', '20260424104234546POM101182450000', {
		...opts,
		fetch: async (input) => {
			request = (input as Request).clone();
			if (env.useSandboxApi) return fetch(input);
			return Response.json({
				common: { authCode: 'A000', authResult: 'Success', infobankTrId: 'id' },
				data: { code: 'A000', result: 'Success' },
			});
		},
	});

	assert.ok(request);
	assert.equal(request.method, 'DELETE');
	assert.equal(
		request.url,
		'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef/destinations/msgKey/20260424104234546POM101182450000',
	);
	assert.equal(request.headers.get('Authorization'), env.BIZGO_API_KEY);
});

void test('returns ok: false with the parsed body on failure', async () => {
	const responseBody = {
		common: { authCode: 'E001', authResult: 'Fail', infobankTrId: 'id' },
		data: { code: 'E001', result: 'Fail' },
	};

	const result = await deleteReservationDestination('MO20260501100000abcdef', 'unknown-msg-key', {
		...opts,
		fetch: async () => Response.json(responseBody, { status: 404 }),
	});

	assert.deepEqual(result, { ok: false, body: responseBody });
});
