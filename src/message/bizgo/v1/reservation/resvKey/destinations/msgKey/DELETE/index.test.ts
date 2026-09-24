import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stubOpts } from '#bizgo/testing/stub.ts';
import { captureFetch } from '#lib/testing.ts';
import { deleteReservationDestination } from './index.ts';

void test('encodes special characters in resvKey and msgKey', async () => {
	const { fetch, requests } = captureFetch();

	await deleteReservationDestination('resv/key?#', 'msg/key?#', { ...stubOpts, fetch });

	const [request] = requests;
	assert.ok(request);
	assert.equal(
		request.url,
		`${stubOpts.baseURL}/api/comm/v1/reservation/resvKey/resv%2Fkey%3F%23/destinations/msgKey/msg%2Fkey%3F%23`,
	);
});
