import assert from 'node:assert/strict';
import { test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { sendMessage, type RequestBody } from './index.ts';

const opts = { url: 'https://hook.dooray.com/services/stub' };

void test('falls back to the default bot icon without mutating the request body', async () => {
	const { fetch, requests } = captureFetch();
	const requestBody: RequestBody = { botName: 'botName', text: 'text' };

	await sendMessage(requestBody, { ...opts, fetch });

	const [request] = requests;
	assert.ok(request);
	assert.equal(
		((await request.json()) as RequestBody).botIconImage,
		'https://static.dooray.com/static_images/dooray-bot.png',
	);
	assert.equal(requestBody.botIconImage, undefined);
});
