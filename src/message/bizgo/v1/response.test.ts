import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { parseBizgoResponse } from './response.ts';

void describe('parseBizgoResponse', () => {
	void test('derives ok from the status code', async () => {
		const ok = await parseBizgoResponse(Response.json({ data: { code: 'A000' } }));
		const fail = await parseBizgoResponse(
			Response.json({ data: { code: 'E001' } }, { status: 400 }),
		);

		assert.deepEqual(ok, { ok: true, body: { data: { code: 'A000' } } });
		assert.deepEqual(fail, { ok: false, body: { data: { code: 'E001' } } });
	});

	void test('returns an error for an empty body', async () => {
		const result = await parseBizgoResponse(new Response(''));

		assert.ok(result instanceof Error);
	});

	void test('returns an error with the status for a non-JSON body', async () => {
		const result = await parseBizgoResponse(
			new Response('<html>502 Bad Gateway</html>', { status: 502 }),
		);

		assert.ok(result instanceof Error);
		assert.match(result.message, /HTTP 502/);
	});
});
