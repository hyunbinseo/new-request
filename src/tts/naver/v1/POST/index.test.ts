import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { textToSpeech, type RequestBody } from './index.ts';

const opts = { clientId: 'clientId_stub', clientSecret: 'clientSecret_stub' };

void describe('tts/naver/v1/POST', () => {
	void test('sends a URL-encoded body with the speaker code', async () => {
		const input: RequestBody = {
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

		const expected = {
			text: 'text',
			speed: '-1',
			speaker: 'nara',
		};

		const { fetch, requests } = captureFetch();
		await textToSpeech(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);

		const formData = await request.formData();

		assert.deepEqual(Object.fromEntries(formData), expected);
	});
});
