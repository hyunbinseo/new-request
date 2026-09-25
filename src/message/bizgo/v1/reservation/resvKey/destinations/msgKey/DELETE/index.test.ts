import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stubOpts } from '#bizgo/v1/testing/stub.ts';
import { captureFetch } from '#lib/testing.ts';
import { deleteReservationDestination } from './index.ts';

void test('encodes special characters in resvKey and msgKey', async () => {
	const { fetch, requests } = captureFetch();

	await deleteReservationDestination('resv/with?special#chars', 'msg/with?special#chars', {
		...stubOpts,
		fetch,
	});

	const [request] = requests;
	assert.ok(request);
	const url = new URL(request.url);
	assert.equal(url.origin, stubOpts.baseURL);
	assert.equal(
		url.pathname,
		'/api/comm/v1/reservation/resvKey/resv%2Fwith%3Fspecial%23chars/destinations/msgKey/msg%2Fwith%3Fspecial%23chars',
	);
});
