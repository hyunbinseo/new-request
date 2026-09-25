import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stubOpts } from '#bizgo/testing/stub.ts';
import { captureFetch } from '#lib/testing.ts';
import { stopReservation } from './index.ts';

void test('encodes special characters in resvKey', async () => {
	const { fetch, requests } = captureFetch();

	await stopReservation('key/with?special#chars', { ...stubOpts, fetch });

	const [request] = requests;
	assert.ok(request);
	assert.equal(
		request.url,
		`${stubOpts.baseURL}/api/comm/v1/reservation/resvKey/key%2Fwith%3Fspecial%23chars/stop`,
	);
});
