import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createReservation } from './index.ts';

const opts = { apiKey: 'test-api-key' };

void test('sends a POST request to the reservation endpoint', async () => {
	let request: Request | undefined;

	await createReservation(
		{
			destinations: [{ to: '01000000000' }],
			messageFlow: [{ sms: { from: '01000000000', text: '예약 SMS 발송 테스트입니다.' } }],
			resvSendTime: '2026-05-01 10:00:00',
			resvName: '문자 예약 발송',
			ref: 'mt-resv-20260501-001',
		},
		{
			...opts,
			fetch: async (input) => {
				request = input as Request;
				return Response.json({
					common: { authCode: 'A000', authResult: 'Success', infobankTrId: 'id' },
					data: { code: 'A000', result: 'Success', resvKey: 'MO20260501100000abcdef' },
				});
			},
		},
	);

	assert.ok(request);
	assert.equal(request.method, 'POST');
	assert.equal(request.url, 'https://mars.ibapi.kr/api/comm/v1/reservation');
	assert.equal(request.headers.get('Authorization'), 'test-api-key');
	assert.equal(request.headers.get('Content-Type'), 'application/json');
	assert.deepEqual(await request.json(), {
		destinations: [{ to: '01000000000' }],
		messageFlow: [{ sms: { from: '01000000000', text: '예약 SMS 발송 테스트입니다.' } }],
		resvSendTime: '2026-05-01 10:00:00',
		resvName: '문자 예약 발송',
		ref: 'mt-resv-20260501-001',
	});
});

void test('respects a custom baseURL', async () => {
	let url: string | undefined;

	await createReservation(
		{
			destinations: [{ to: '01000000000' }],
			messageFlow: [{ sms: { from: '01000000000', text: 'test' } }],
			resvSendTime: '2026-05-01 10:00:00',
		},
		{
			...opts,
			baseURL: 'https://sandbox-mars.ibapi.kr',
			fetch: async (input) => {
				url = (input as Request).url;
				return Response.json({});
			},
		},
	);

	assert.equal(url, 'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation');
});

void test('returns ok: true with the parsed body on success', async () => {
	const responseBody = {
		common: { authCode: 'A000', authResult: 'Success', infobankTrId: 'id' },
		data: { code: 'A000', result: 'Success', resvKey: 'MO20260501100000abcdef' },
	};

	const result = await createReservation(
		{
			destinations: [{ to: '01000000000' }],
			messageFlow: [{ sms: { from: '01000000000', text: 'test' } }],
			resvSendTime: '2026-05-01 10:00:00',
		},
		{ ...opts, fetch: async () => Response.json(responseBody) },
	);

	assert.deepEqual(result, { ok: true, body: responseBody });
});

void test('returns ok: false with the parsed body on failure', async () => {
	const responseBody = {
		common: { authCode: 'E001', authResult: 'Fail', infobankTrId: 'id' },
		data: { code: 'E001', result: 'Fail' },
	};

	const result = await createReservation(
		{
			destinations: [{ to: '01000000000' }],
			messageFlow: [{ sms: { from: '01000000000', text: 'test' } }],
			resvSendTime: '2026-05-01 10:00:00',
		},
		{ ...opts, fetch: async () => Response.json(responseBody, { status: 400 }) },
	);

	assert.deepEqual(result, { ok: false, body: responseBody });
});

void test('returns an Error when the fetch call throws', async () => {
	const result = await createReservation(
		{
			destinations: [{ to: '01000000000' }],
			messageFlow: [{ sms: { from: '01000000000', text: 'test' } }],
			resvSendTime: '2026-05-01 10:00:00',
		},
		{
			...opts,
			fetch: async () => {
				throw new Error('network down');
			},
		},
	);

	assert.ok(result instanceof Error);
	assert.equal(result.message, 'network down');
});

void test('returns an Error instead of throwing when request construction fails', async () => {
	const result = await createReservation(
		{
			destinations: [{ to: '01000000000' }],
			messageFlow: [{ sms: { from: '01000000000', text: 'test' } }],
			resvSendTime: '2026-05-01 10:00:00',
		},
		{ apiKey: 'invalid\nheader\nvalue' },
	);

	assert.ok(result instanceof Error);
});
