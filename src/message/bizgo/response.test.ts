import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseBizgoResponse } from './response.ts';

// A pure parser, so these run without credentials or the network.

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
