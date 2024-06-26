import type { Options, RequestBody } from './types.js';

export const sendMessage = async (requestBody: RequestBody, opts: Options) => {
	requestBody.botIconImage =
		requestBody.botIconImage || 'https://static.dooray.com/static_images/dooray-bot.png';

	const request = new Request(opts.url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestBody),
	});

	try {
		const response = await (opts.fetch || fetch)(request);
		return {
			ok: response.ok,
			status: response.status,
		};
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
