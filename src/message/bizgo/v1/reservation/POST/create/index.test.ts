import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bizgoEnv, skip } from '../../env.ts';
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

void test('sends a POST request to the reservation endpoint', { skip }, async () => {
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
				return fetch(input);
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
