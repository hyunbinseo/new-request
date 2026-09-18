import type { Options, RequestBody, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options, RequestBody };

export const sendMessage = async (requestBody: RequestBody, opts: Options) => {
	const request = new Request(
		new URL(
			'/api/comm/v1/send/omni', //
			opts.baseURL ?? 'https://mars.ibapi.kr',
		),
		{
			method: 'POST',
			headers: {
				'Authorization': opts.apiKey,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		},
	);

	try {
		const response = await (opts.fetch || fetch)(request);
		// Read as text first: a success body may be empty, and gateway/auth errors can be
		// plain text or HTML — either makes response.json() throw and hides the HTTP status.
		const text = await response.text();
		let body: unknown;
		try {
			body = text ? JSON.parse(text) : undefined;
		} catch {
			body = text;
		}
		return response.ok
			? { ok: response.ok, body: body as ResponseBody }
			: { ok: response.ok, body: body as ResponseBodyException };
	} catch (error) {
		return error instanceof Error ? error : new Error(String(error), { cause: error });
	}
};
