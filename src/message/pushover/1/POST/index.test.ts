import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { captureFetch } from '#lib/testing.ts';
import { pushMessage } from './index.ts';

const opts = { token: 'token_stub', user: 'user_stub' };

void describe('message/pushover/1/POST', () => {
	void test('sends a URL-encoded body with credentials, omitting only undefined fields', async () => {
		const { fetch, requests } = captureFetch();

		await pushMessage({ message: 'message', title: undefined, priority: 0 } as never, {
			...opts,
			fetch,
		});

		const [request] = requests;
		assert.ok(request);
		assert.equal(request.headers.get('Content-Type'), 'application/x-www-form-urlencoded');
		assert.equal(
			await request.text(),
			'token=token_stub&user=user_stub&message=message&priority=0',
		);
	});

	void test('sends a multipart body with the attachment filename', async () => {
		const { fetch, requests } = captureFetch();

		await pushMessage(
			{
				message: 'message',
				attachment: new Blob(['image'], { type: 'image/png' }),
				attachment_type: 'image/png',
			},
			{ ...opts, filename: 'image.png', fetch },
		);

		const [request] = requests;
		assert.ok(request);
		const formData = await request.formData();
		assert.equal(formData.get('token'), 'token_stub');
		assert.equal(formData.get('user'), 'user_stub');
		assert.equal(formData.get('message'), 'message');
		assert.equal(formData.get('attachment_type'), 'image/png');
		const attachment = formData.get('attachment');
		assert.ok(attachment instanceof File);
		assert.equal(attachment.name, 'image.png');
	});
});
