import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stubOpts } from '#bizgo/v1/testing/stub.ts';
import { captureFetch } from '#lib/testing.ts';
import { getReservationDestinations } from './index.ts';

void test('sets the optional query params when provided', async () => {
	const { fetch, requests } = captureFetch();

	await getReservationDestinations(
		'key/with?special#chars',
		{ lastSeq: 100, limit: 50 },
		{ ...stubOpts, fetch },
	);

	const [request] = requests;
	assert.ok(request);
	assert.equal(
		request.url,
		`${stubOpts.baseURL}/api/comm/v1/reservation/resvKey/key%2Fwith%3Fspecial%23chars/destinations?lastSeq=100&limit=50`,
	);
});

void test('omits the optional query params when undefined', async () => {
	const { fetch, requests } = captureFetch();

	await getReservationDestinations('MO20260501100000abcdef', {}, { ...stubOpts, fetch });

	const [request] = requests;
	assert.ok(request);
	assert.equal(
		request.url,
		`${stubOpts.baseURL}/api/comm/v1/reservation/resvKey/MO20260501100000abcdef/destinations`,
	);
});
