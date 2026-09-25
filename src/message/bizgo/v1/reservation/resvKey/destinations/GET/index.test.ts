import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { getReservationDestinations, type Query } from './index.ts';

const opts = { apiKey: 'apiKey_stub', baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void describe('message/bizgo/v1/reservation/resvKey/destinations/GET', () => {
	void test('builds the URL from an encoded resvKey', async () => {
		const { fetch, requests } = captureFetch();
		await getReservationDestinations('resvKey/?#', {}, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.equal(
			request.url,
			'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/resvKey%2F%3F%23/destinations',
		);
	});

	void test('sets the optional query params when provided', async () => {
		const input: Query = { lastSeq: 100, limit: 50 };

		const { fetch, requests } = captureFetch();
		await getReservationDestinations('resvKey', input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.equal(
			request.url,
			'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/resvKey/destinations?lastSeq=100&limit=50',
		);
	});
});
