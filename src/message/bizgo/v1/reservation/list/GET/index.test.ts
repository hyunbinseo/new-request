import assert from 'node:assert/strict';
import { env } from 'node:process';
import { describe, test } from 'node:test';
import { sandboxOpts } from '#bizgo/v1/sandbox/fetch.ts';
import { getFutureResvSendTime } from '#bizgo/v1/sandbox/time.ts';
import { captureFetch } from '#lib/testing.ts';
import { getReservations, type Query } from './index.ts';

const opts = { apiKey: 'apiKey_stub' };

void describe('message/bizgo/v1/reservation/list/GET', () => {
	void test('sets the query params when provided', async () => {
		const input: Query = {
			resvSendTime: '2026-05-01 10:00:00',
			paymentCode: 'SMS07',
			lastSeq: 100,
			limit: 50,
		};

		const expected = {
			resvSendTime: '2026-05-01 10:00:00',
			paymentCode: 'SMS07',
			lastSeq: '100',
			limit: '50',
		};

		const { fetch, requests } = captureFetch();
		await getReservations(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);

		const url = new URL(request.url);

		assert.deepEqual(Object.fromEntries(url.searchParams), expected);
	});

	void test('omits the optional query params when undefined', async () => {
		const input: Query = { resvSendTime: '2026-05-01 10:00:00' };
		const expected = { resvSendTime: '2026-05-01 10:00:00' };

		const { fetch, requests } = captureFetch();
		await getReservations(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);

		const url = new URL(request.url);

		assert.deepEqual(Object.fromEntries(url.searchParams), expected);
	});

	void test('validates resvSendTime and limit in the sandbox', async (t) => {
		const { BIZGO_API_KEY } = env;
		if (!BIZGO_API_KEY) return t.skip();

		const opts = { ...sandboxOpts, apiKey: BIZGO_API_KEY };
		const resvSendTime = getFutureResvSendTime(0);

		await t.test('rejects a month or day alone', async () => {
			for (const resvSendTime of ['2026-05', '2026-05-01']) {
				const response = await getReservations({ resvSendTime }, opts);

				assert.ok(!(response instanceof Error));
				assert.equal(response.ok, false);
				assert.equal(response.body.data.code, 'A213');
			}
		});

		await t.test('rejects a limit over 1000', async () => {
			const response = await getReservations({ resvSendTime, limit: 1001 }, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, false);
			assert.equal(response.body.data.code, 'A213');
		});

		await t.test('returns an empty page for a limit of 0', async () => {
			const response = await getReservations({ resvSendTime, limit: 0 }, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, true);
			assert.ok('data' in response.body.data);
			assert.deepEqual(response.body.data.data.reservations, []);
		});

		await t.test('rejects a negative limit', async () => {
			const response = await getReservations({ resvSendTime, limit: -1 }, opts);

			assert.ok(!(response instanceof Error));
			assert.equal(response.ok, false);
			assert.equal(response.body.data.code, 'A010');
		});
	});
});
