import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bizgoEnv } from '../../env.ts';
import { createReservation } from './index.ts';

const opts = { apiKey: bizgoEnv.BIZGO_API_KEY, baseURL: 'https://sandbox-mars.ibapi.kr' as const };

const kstFormatter = new Intl.DateTimeFormat('sv-SE', {
	timeZone: 'Asia/Seoul',
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hourCycle: 'h23',
});

void test('sends a POST request to the reservation endpoint', async () => {
	let request: Request | undefined;

	const messageFlow = [
		{
			alimtalk: {
				msgType: 'AT' as const,
				senderKey: bizgoEnv.BIZGO_KAKAO_SENDER_KEY,
				templateCode: bizgoEnv.BIZGO_KAKAO_TEMPLATE_CODE,
				text: '예약 알림톡 발송 테스트입니다.',
			},
		},
	];
	// Must be at least 10 minutes from now; 30 minutes leaves margin for the request itself.
	const resvSendTime = kstFormatter.format(new Date(Date.now() + 30 * 60 * 1000));

	await createReservation(
		{
			destinations: [{ to: bizgoEnv.BIZGO_PHONE_NUMBER }],
			messageFlow,
			resvSendTime,
			resvName: '알림톡 예약 발송',
			ref: 'mt-resv-20260501-001',
		},
		{
			...opts,
			fetch: async (input) => {
				request = (input as Request).clone();
				if (bizgoEnv.useSandboxApi) return fetch(input);
				return Response.json({
					common: { authCode: 'A000', authResult: 'Success', infobankTrId: 'id' },
					data: { code: 'A000', result: 'Success', resvKey: 'MO20260501100000abcdef' },
				});
			},
		},
	);

	assert.ok(request);
	assert.equal(request.method, 'POST');
	assert.equal(request.url, 'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation');
	assert.equal(request.headers.get('Authorization'), bizgoEnv.BIZGO_API_KEY);
	assert.equal(request.headers.get('Content-Type'), 'application/json');
	assert.deepEqual(await request.json(), {
		destinations: [{ to: bizgoEnv.BIZGO_PHONE_NUMBER }],
		messageFlow,
		resvSendTime,
		resvName: '알림톡 예약 발송',
		ref: 'mt-resv-20260501-001',
	});
});

void test('rejects the entire reservation when a destination is malformed', async () => {
	// Confirmed by live sandbox testing: there's no per-destination partial success. An
	// invalid `to` in any destination rejects the whole request with a top-level error,
	// even though the other destination(s) are valid.
	const responseBody = {
		common: { authCode: 'A000', authResult: 'SUCCESS', infobankTrId: 'id' },
		data: { code: 'A306', result: "Invalid or empty 'to'" },
	};

	const result = await createReservation(
		{
			destinations: [{ to: bizgoEnv.BIZGO_PHONE_NUMBER }, { to: '000' }],
			messageFlow: [{ sms: { from: bizgoEnv.BIZGO_PHONE_NUMBER, text: 'test' } }],
			resvSendTime: '2026-05-01 10:00:00',
		},
		{ ...opts, fetch: async () => Response.json(responseBody, { status: 400 }) },
	);

	assert.deepEqual(result, { ok: false, body: responseBody });
});

void test('respects a custom baseURL', async () => {
	let url: string | undefined;

	await createReservation(
		{
			destinations: [{ to: bizgoEnv.BIZGO_PHONE_NUMBER }],
			messageFlow: [{ sms: { from: bizgoEnv.BIZGO_PHONE_NUMBER, text: 'test' } }],
			resvSendTime: '2026-05-01 10:00:00',
		},
		{
			...opts,
			baseURL: 'https://mars.ibapi.kr',
			fetch: async (input) => {
				url = (input as Request).url;
				return Response.json({});
			},
		},
	);

	assert.equal(url, 'https://mars.ibapi.kr/api/comm/v1/reservation');
});

void test('returns ok: true with the parsed body on success', async () => {
	const responseBody = {
		common: { authCode: 'A000', authResult: 'Success', infobankTrId: 'id' },
		data: { code: 'A000', result: 'Success', resvKey: 'MO20260501100000abcdef' },
	};

	const result = await createReservation(
		{
			destinations: [{ to: bizgoEnv.BIZGO_PHONE_NUMBER }],
			messageFlow: [{ sms: { from: bizgoEnv.BIZGO_PHONE_NUMBER, text: 'test' } }],
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
			destinations: [{ to: bizgoEnv.BIZGO_PHONE_NUMBER }],
			messageFlow: [{ sms: { from: bizgoEnv.BIZGO_PHONE_NUMBER, text: 'test' } }],
			resvSendTime: '2026-05-01 10:00:00',
		},
		{ ...opts, fetch: async () => Response.json(responseBody, { status: 400 }) },
	);

	assert.deepEqual(result, { ok: false, body: responseBody });
});

void test('returns an Error when the fetch call throws', async () => {
	const result = await createReservation(
		{
			destinations: [{ to: bizgoEnv.BIZGO_PHONE_NUMBER }],
			messageFlow: [{ sms: { from: bizgoEnv.BIZGO_PHONE_NUMBER, text: 'test' } }],
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
			destinations: [{ to: bizgoEnv.BIZGO_PHONE_NUMBER }],
			messageFlow: [{ sms: { from: bizgoEnv.BIZGO_PHONE_NUMBER, text: 'test' } }],
			resvSendTime: '2026-05-01 10:00:00',
		},
		{ apiKey: 'invalid\nheader\nvalue', baseURL: 'https://sandbox-mars.ibapi.kr' },
	);

	assert.ok(result instanceof Error);
});
