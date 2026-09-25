import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { getReservations, type Query } from './index.ts';

const opts = { apiKey: 'apiKey_stub', baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void describe('message/bizgo/v1/reservation/list/GET', () => {
	void test('sets the optional query params when provided', async () => {
		const input: Query = {
			resvSendTime: '2026-05-01 10:00:00',
			paymentCode: 'SMS07',
			lastSeq: 100,
			limit: 50,
		};

		const { fetch, requests } = captureFetch();
		await getReservations(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.equal(
			request.url,
			'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/list?resvSendTime=2026-05-01+10%3A00%3A00&paymentCode=SMS07&lastSeq=100&limit=50',
		);
	});

	void test('omits the optional query params when undefined', async () => {
		const input: Query = { resvSendTime: '2026-05-01 10:00:00' };

		const { fetch, requests } = captureFetch();
		await getReservations(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.equal(
			request.url,
			'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/list?resvSendTime=2026-05-01+10%3A00%3A00',
		);
	});
});
