import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stubOpts } from '#bizgo/v1/testing/stub.ts';
import { captureFetch } from '#lib/testing.ts';
import { addReservationDestinations } from './index.ts';

void test('encodes special characters in resvKey', async () => {
	const { fetch, requests } = captureFetch();

	await addReservationDestinations(
		'key/with?special#chars',
		{ destinations: [{ to: '01000000000' }] },
		{ ...stubOpts, fetch },
	);

	const [request] = requests;
	assert.ok(request);
	const url = new URL(request.url);
	assert.equal(url.origin, stubOpts.baseURL);
	assert.equal(
		url.pathname,
		'/api/comm/v1/reservation/resvKey/key%2Fwith%3Fspecial%23chars/destinations',
	);
});
