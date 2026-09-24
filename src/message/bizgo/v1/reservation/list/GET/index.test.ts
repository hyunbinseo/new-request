import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stubOpts } from '#bizgo/testing/stub.ts';
import { captureFetch } from '#lib/testing.ts';
import { getReservations } from './index.ts';

void test('sets the optional query params when provided', async () => {
	const { fetch, requests } = captureFetch();

	await getReservations(
		{ resvSendTime: '2026-05-01 10:00:00', paymentCode: 'SMS07', lastSeq: 100, limit: 50 },
		{ ...stubOpts, fetch },
	);

	const [request] = requests;
	assert.ok(request);
	assert.equal(
		request.url,
		`${stubOpts.baseURL}/api/comm/v1/reservation/list?resvSendTime=2026-05-01+10%3A00%3A00&paymentCode=SMS07&lastSeq=100&limit=50`,
	);
});

void test('omits the optional query params when undefined', async () => {
	const { fetch, requests } = captureFetch();

	await getReservations({ resvSendTime: '2026-05-01 10:00:00' }, { ...stubOpts, fetch });

	const [request] = requests;
	assert.ok(request);
	assert.equal(
		request.url,
		`${stubOpts.baseURL}/api/comm/v1/reservation/list?resvSendTime=2026-05-01+10%3A00%3A00`,
	);
});
