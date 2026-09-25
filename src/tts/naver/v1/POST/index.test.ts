import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { textToSpeech, type RequestBody } from './index.ts';

const opts = { clientId: 'clientId_stub', clientSecret: 'clientSecret_stub' };

const requestBody: RequestBody = {
	text: 'text',
	speaker: {
		language: '한국어',
		isWoman: true,
		isChild: false,
		isPro: false,
		name: '아라',
		code: 'nara',
	},
	speed: -1,
};

void describe('tts/naver/v1/POST', () => {
	void test('sends the speaker code in the body', async () => {
		const { fetch, requests } = captureFetch();

		await textToSpeech(requestBody, { ...opts, fetch });

		const [request] = requests;
		assert.ok(request);
		assert.equal(await request.text(), 'text=text&speed=-1&speaker=nara');
	});
});
