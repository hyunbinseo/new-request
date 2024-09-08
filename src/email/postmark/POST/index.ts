import type { Options, RequestBody, ResponseBody200, ResponseBody4xx } from './types.js';

export const sendEmail = async (requestBody: RequestBody, opts: Options) => {
	requestBody.From = requestBody.From || opts.from;

	const request = new Request('https://api.postmarkapp.com/email', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-Postmark-Server-Token': opts.serverToken,
		},
		body: JSON.stringify(requestBody),
	});

	try {
		const response = await (opts.fetch || fetch)(request);
		return response.ok
			? {
					ok: true as const,
					status: response.status as 200,
					body: (await response.json()) as ResponseBody200,
			  }
			: {
					ok: false as const,
					status: response.status as 401 | 404 | 413 | 415 | 422 | 429 | 500 | 503,
					body: (await response.json()) as ResponseBody4xx,
			  };
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
