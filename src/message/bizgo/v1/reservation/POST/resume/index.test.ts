import assert from 'node:assert/strict';
import { test } from 'node:test';
import { env } from '../../env.ts';
import { resumeReservation } from './index.ts';

const opts = { apiKey: env.BIZGO_API_KEY };

void test('sends a POST request to the resume endpoint', async () => {
	let request: Request | undefined;

	await resumeReservation('MO20260501100000abcdef', {
		...opts,
		fetch: async (input) => {
			request = input as Request;
			return Response.json({
				common: { authCode: 'A000', authResult: 'Success', infobankTrId: 'id' },
				data: { code: 'A000', result: 'Success', data: { status: 'PENDING' } },
			});
		},
	});

	assert.ok(request);
	assert.equal(request.method, 'POST');
	assert.equal(
		request.url,
		'https://mars.ibapi.kr/api/comm/v1/reservation/resvKey/MO20260501100000abcdef/resume',
	);
	assert.equal(request.headers.get('Authorization'), env.BIZGO_API_KEY);
	assert.equal(request.headers.get('Content-Type'), 'application/json');
});

void test('returns ok: false with the parsed body on failure', async () => {
	const responseBody = {
		common: { authCode: 'E001', authResult: 'Fail', infobankTrId: 'id' },
		data: { code: 'E001', result: 'Fail' },
	};

	const result = await resumeReservation('MO20260501100000abcdef', {
		...opts,
		fetch: async () => Response.json(responseBody, { status: 400 }),
	});

	assert.deepEqual(result, { ok: false, body: responseBody });
});
