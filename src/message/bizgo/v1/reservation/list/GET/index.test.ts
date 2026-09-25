import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stubOpts } from '#bizgo/v1/testing/stub.ts';
import { captureFetch } from '#lib/testing.ts';
import { getReservations } from './index.ts';

void test('sets the optional query params when provided', async () => {
	const { fetch, requests } = captureFetch();

	await getReservations(
		{
			resvSendTime: '2026-05-01 10:00:00',
			paymentCode: 'SMS07',
			lastSeq: 100,
			limit: 50,
		},
		{ ...stubOpts, fetch },
	);

	const [request] = requests;
	assert.ok(request);
	const url = new URL(request.url);
	assert.equal(url.origin, stubOpts.baseURL);
	assert.equal(url.pathname, '/api/comm/v1/reservation/list');
	assert.deepEqual(Object.fromEntries(url.searchParams), {
		resvSendTime: '2026-05-01 10:00:00',
		paymentCode: 'SMS07',
		lastSeq: '100',
		limit: '50',
	});
});

void test('omits the optional query params when undefined', async () => {
	const { fetch, requests } = captureFetch();

	await getReservations({ resvSendTime: '2026-05-01 10:00:00' }, { ...stubOpts, fetch });

	const [request] = requests;
	assert.ok(request);
	const url = new URL(request.url);
	assert.equal(url.origin, stubOpts.baseURL);
	assert.equal(url.pathname, '/api/comm/v1/reservation/list');
	assert.deepEqual(Object.fromEntries(url.searchParams), { resvSendTime: '2026-05-01 10:00:00' });
});
