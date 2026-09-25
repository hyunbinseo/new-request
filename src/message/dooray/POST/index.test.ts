import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { sendMessage, type RequestBody } from './index.ts';

const opts = { url: 'https://hook.dooray.com/services/stub' };

void describe('message/dooray/POST', () => {
	void test('falls back to the default bot icon without mutating the request body', async () => {
		const input: RequestBody = { botName: 'botName', text: 'text' };
		const expected = {
			...input,
			botIconImage: 'https://static.dooray.com/static_images/dooray-bot.png',
		};

		const { fetch, requests } = captureFetch();
		await sendMessage(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);
		assert.deepEqual(await request.json(), expected);
		assert.equal(input.botIconImage, undefined);
	});
});
