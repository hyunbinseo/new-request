import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { pushMessage, type RequestBody } from './index.ts';

const opts = { token: 'token_stub', user: 'user_stub' };

void describe('message/pushover/1/POST', () => {
	void test('sends a URL-encoded body with credentials, omitting only undefined fields', async () => {
		const input = {
			message: 'message',
			title: undefined,
			priority: 0,
		} as unknown as RequestBody;

		const expected = {
			token: 'token_stub',
			user: 'user_stub',
			message: 'message',
			priority: '0',
		};

		const { fetch, requests } = captureFetch();
		await pushMessage(input, { ...opts, fetch });
		const [request] = requests;

		assert.ok(request);

		const formData = await request.formData();

		assert.equal(request.headers.get('Content-Type'), 'application/x-www-form-urlencoded');
		assert.deepEqual(Object.fromEntries(formData), expected);
	});

	void test('sends a multipart body with the attachment filename, omitting only undefined fields', async () => {
		const input = {
			message: 'message',
			title: undefined,
			attachment: new Blob(['image'], { type: 'image/png' }),
			attachment_type: 'image/png',
		} as unknown as RequestBody;

		const expected = {
			token: 'token_stub',
			user: 'user_stub',
			message: 'message',
			attachment_type: 'image/png',
		};

		const { fetch, requests } = captureFetch();
		await pushMessage(input, { ...opts, filename: 'image.png', fetch });
		const [request] = requests;

		assert.ok(request);

		const formData = await request.formData();
		const { attachment, ...rest } = Object.fromEntries(formData);

		assert.deepEqual(rest, expected);
		assert.ok(attachment instanceof File);
		assert.equal(attachment.name, 'image.png');
	});
});
