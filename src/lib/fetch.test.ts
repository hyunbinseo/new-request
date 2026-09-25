import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { tryFetch } from './fetch.ts';
import { captureFetch } from './testing.ts';

const buildRequest = () => new Request('https://example.com');

void describe('tryFetch', () => {
	void test('returns the parsed response', async () => {
		const { fetch } = captureFetch();
		const result = await tryFetch(buildRequest, (response) => response.status, { fetch });

		assert.equal(result, 200);
	});

	void test('returns an error when building the request throws', async () => {
		const { fetch, requests } = captureFetch();
		const result = await tryFetch(
			() => new Request('invalid'),
			() => null,
			{ fetch },
		);

		assert.ok(result instanceof Error);
		assert.equal(requests.length, 0);
	});

	void test('returns an error when fetch rejects', async () => {
		const { fetch } = captureFetch(() => Promise.reject(new TypeError('fetch failed')));
		const result = await tryFetch(buildRequest, () => null, { fetch });

		assert.ok(result instanceof TypeError);
	});

	void test('returns an error when parsing the response rejects', async () => {
		const { fetch } = captureFetch(() => new Response('not json'));
		const result = await tryFetch(buildRequest, (response) => response.json(), { fetch });

		assert.ok(result instanceof SyntaxError);
	});

	void test('forwards the signal to fetch', async () => {
		const controller = new AbortController();
		controller.abort();

		const { fetch, requests } = captureFetch();
		await tryFetch(buildRequest, () => null, { fetch, signal: controller.signal });
		const [request] = requests;

		assert.ok(request);
		assert.equal(request.signal.aborted, true);
	});

	void test('returns an error when the signal aborts', async () => {
		const result = await tryFetch(buildRequest, () => null, { signal: AbortSignal.abort() });

		assert.ok(result instanceof Error);
		assert.equal(result.name, 'AbortError');
	});

	void test('wraps non-error throws with the original value as cause', async () => {
		const { fetch } = captureFetch(() => Promise.reject('reason'));
		const result = await tryFetch(buildRequest, () => null, { fetch });

		assert.ok(result instanceof Error);
		assert.equal(result.message, 'reason');
		assert.equal(result.cause, 'reason');
	});
});
