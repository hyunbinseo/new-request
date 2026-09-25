import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { PRODUCTION_BASE_URL } from '#bizgo/v1/constants.ts';
import { captureFetch } from '#lib/testing.ts';
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
});
