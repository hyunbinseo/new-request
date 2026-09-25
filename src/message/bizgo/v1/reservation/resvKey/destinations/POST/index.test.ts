import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { addReservationDestinations } from './index.ts';

const opts = { apiKey: 'apiKey_stub', baseURL: 'https://sandbox-mars.ibapi.kr' as const };

void describe('message/bizgo/v1/reservation/resvKey/destinations/POST', () => {
	void test('builds the URL from an encoded resvKey', async () => {
		const { fetch, requests } = captureFetch();
		await addReservationDestinations(
			'resvKey/?#',
			{ destinations: [{ to: '01000000000' }] },
			{ ...opts, fetch },
		);
		const [request] = requests;

		assert.ok(request);
		assert.equal(
			request.url,
			'https://sandbox-mars.ibapi.kr/api/comm/v1/reservation/resvKey/resvKey%2F%3F%23/destinations',
		);
	});
});
