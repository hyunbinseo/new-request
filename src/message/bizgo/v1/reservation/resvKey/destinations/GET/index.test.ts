import assert from 'node:assert/strict';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import { PRODUCTION_BASE_URL } from '#bizgo/v1/constants.ts';
import { 국내_수신번호, 카카오톡_알림톡_메시지 } from '#bizgo/v1/sandbox/constants.ts';
import { sandboxOpts } from '#bizgo/v1/sandbox/fetch.ts';
import { getFutureResvSendTime } from '#bizgo/v1/sandbox/time.ts';
import { captureFetch } from '#lib/testing.ts';
import { createReservation } from '../../../POST/index.ts';
import { cancelReservation } from '../../cancel/POST/index.ts';
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

	void test('validates limit in the sandbox', async (t) => {
		const { BIZGO_API_KEY } = env;
		if (!BIZGO_API_KEY) return t.skip();

		const opts = { ...sandboxOpts, apiKey: BIZGO_API_KEY };

		const created = await createReservation(
			{
				destinations: [{ to: 국내_수신번호 }],
				messageFlow: [카카오톡_알림톡_메시지],
				resvSendTime: getFutureResvSendTime(30 * 60 * 1000),
			},
			opts,
		);

		assert.ok(!(created instanceof Error));
		assert.equal(created.ok, true);
		assert.ok('resvKey' in created.body.data);

		const { resvKey } = created.body.data;
		t.after(() => cancelReservation(resvKey, opts));

		await t.test('rejects a limit over 1000', async () => {
			const response = await getReservationDestinations(resvKey, { limit: 1001 }, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, false);
			assert.equal(response.body.data.code, 'A213');
		});

		await t.test('returns an empty page with hasNext for a limit of 0', async () => {
			const response = await getReservationDestinations(resvKey, { limit: 0 }, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, true);
			assert.ok('data' in response.body.data);
			assert.deepEqual(response.body.data.data.destinations, []);
			assert.equal(response.body.data.data.hasNext, true);
		});

		await t.test('rejects a negative limit', async () => {
			const response = await getReservationDestinations(resvKey, { limit: -1 }, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, false);
			assert.equal(response.body.data.code, 'A010');
		});
	});
});
