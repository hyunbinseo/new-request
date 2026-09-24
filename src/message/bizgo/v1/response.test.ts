import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fetchBizgo, parseBizgoResponse } from './response.ts';

// `fetch` is stubbed, so these run without credentials or the network.

void test('parses a 2xx JSON body as ok: true', async () => {
	const result = await parseBizgoResponse(Response.json({ data: { code: 'A000' } }));
	assert.deepEqual(result, { ok: true, body: { data: { code: 'A000' } } });
});

void test('parses a non-2xx JSON body as ok: false', async () => {
	const result = await parseBizgoResponse(
		Response.json({ data: { code: 'E001' } }, { status: 400 }),
	);
	assert.deepEqual(result, { ok: false, body: { data: { code: 'E001' } } });
});

void test('returns an Error for an empty body instead of an undefined result', async () => {
	const result = await parseBizgoResponse(new Response('', { status: 200 }));
	assert.ok(result instanceof Error);
});

void test('returns an Error for a non-JSON body instead of casting it', async () => {
	const result = await parseBizgoResponse(
		new Response('<html>502 Bad Gateway</html>', { status: 502 }),
	);
	assert.ok(result instanceof Error);
	assert.match(result.message, /HTTP 502/);
});

void test('returns an Error instead of throwing when request construction fails', async () => {
	let called = false;
	const result = await fetchBizgo(
		() =>
			new Request('https://sandbox-mars.ibapi.kr', {
				headers: { Authorization: 'invalid\nheader\nvalue' },
			}),
		{
			fetch: async () => {
				called = true;
				return Response.json({});
			},
		},
	);
	assert.ok(result instanceof Error);
	assert.equal(called, false);
});

void test('returns an Error instead of throwing when fetch rejects', async () => {
	const result = await fetchBizgo(() => new Request('https://sandbox-mars.ibapi.kr'), {
		fetch: () => Promise.reject(new TypeError('fetch failed')),
	});
	assert.ok(result instanceof TypeError);
});
