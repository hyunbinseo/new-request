import assert from 'node:assert/strict';
import { test } from 'node:test';
import { deleteReservationDestination } from './index.ts';

const opts = { apiKey: 'test-api-key' };

void test('sends a DELETE request to the msgKey endpoint', async () => {
	let request: Request | undefined;

	await deleteReservationDestination('MO20260501100000abcdef', '20260424104234546POM101182450000', {
		...opts,
		fetch: async (input) => {
			request = input as Request;
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
		'https://mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef/destinations/msgKey/20260424104234546POM101182450000',
	);
	assert.equal(request.headers.get('Authorization'), 'test-api-key');
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
