import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { PRODUCTION_BASE_URL } from '#bizgo/v1/constants.ts';
import { captureFetch } from '#lib/testing.ts';
import { getReservationDestinations, type Query } from './index.ts';

const opts = { apiKey: 'apiKey_stub' };

void describe('message/bizgo/v1/reservation/resvKey/destinations/GET', () => {
	void test('builds the URL from the encoded resvKey', async () => {
		const { fetch, requests } = captureFetch();
		await getReservationDestinations('key/with?special#chars', {}, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.equal(
			request.url,
			`${PRODUCTION_BASE_URL}/api/comm/v1/reservation/resvKey/key%2Fwith%3Fspecial%23chars/destinations`,
		);
	});

	void test('sets the query params when provided', async () => {
		const input: Query = { lastSeq: 100, limit: 50 };
		const expected = { lastSeq: '100', limit: '50' };

		const { fetch, requests } = captureFetch();
		await getReservationDestinations('resvKey', input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);

		const url = new URL(request.url);

		assert.deepEqual(Object.fromEntries(url.searchParams), expected);
	});

	void test('omits the optional query params when undefined', async () => {
		const input: Query = {};

		const { fetch, requests } = captureFetch();
		await getReservationDestinations('resvKey', input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);

		const url = new URL(request.url);

		assert.deepEqual(Object.fromEntries(url.searchParams), {});
	});
});
