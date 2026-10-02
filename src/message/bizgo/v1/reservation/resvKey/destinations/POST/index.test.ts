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
import { addReservationDestinations } from './index.ts';

const opts = { apiKey: 'apiKey_stub' };

void describe('message/bizgo/v1/reservation/resvKey/destinations/POST', () => {
	void test('builds the URL from the encoded resvKey', async () => {
		const { fetch, requests } = captureFetch();
		await addReservationDestinations(
			'key/with?special#chars',
			{ destinations: [{ to: '01000000000' }] },
			{ ...opts, fetch },
		);
		const [request] = requests;

		assert.ok(request);
		assert.equal(
			request.url,
			`${PRODUCTION_BASE_URL}/api/comm/v1/reservation/resvKey/key%2Fwith%3Fspecial%23chars/destinations`,
		);
	});

	void test('rejects over 1000 destinations', async (t) => {
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

		const response = await addReservationDestinations(
			resvKey,
			{ destinations: Array.from({ length: 1001 }, () => ({ to: 국내_수신번호 })) },
			opts,
		);

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, false);
		assert.equal(response.body.data.code, 'A318');
	});
	void test('rejects the whole request for one invalid number', async (t) => {
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

		const response = await addReservationDestinations(
			resvKey,
			{ destinations: [{ to: 국내_수신번호 }, { to: '123' }] },
			opts,
		);

		assert.ok(!(response instanceof Error));
		assert.equal(response.ok, false);
		assert.equal(response.body.data.code, 'A306');
	});
});
