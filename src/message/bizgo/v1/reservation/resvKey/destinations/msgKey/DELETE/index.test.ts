import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { PRODUCTION_BASE_URL } from '#bizgo/v1/constants.ts';
import { captureFetch } from '#lib/testing.ts';
import { deleteReservationDestination } from './index.ts';

const opts = { apiKey: 'apiKey_stub' };

void describe('message/bizgo/v1/reservation/resvKey/destinations/msgKey/DELETE', () => {
	void test('builds the URL from the encoded resvKey and msgKey', async () => {
		const { fetch, requests } = captureFetch();
		await deleteReservationDestination('resv/with?special#chars', 'msg/with?special#chars', {
			...opts,
			fetch,
		});
		const [request] = requests;

		assert.ok(request);
		assert.equal(
			request.url,
			`${PRODUCTION_BASE_URL}/api/comm/v1/reservation/resvKey/resv%2Fwith%3Fspecial%23chars/destinations/msgKey/msg%2Fwith%3Fspecial%23chars`,
		);
	});
});
