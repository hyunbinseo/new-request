import type { Options, RequestBody, ResponseBody200, ResponseBody4xx } from './types.ts';
export type { Options, RequestBody };

export const getAccessToken = async (requestBody: RequestBody, opts: Options) => {
	const authorization = `Basic ${btoa(`${opts.clientId}:${opts.clientSecret}`)}`;

	const request = new Request('https://zoom.us/oauth/token', {
		method: 'POST',
		headers: {
			'Authorization': authorization,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'account_credentials',
			account_id: requestBody.account_id,
		}),
	});

	try {
		const response = await (opts.fetch || fetch)(request);
		return response.ok
			? {
					ok: response.ok,
					status: response.status as 200,
					body: (await response.json()) as ResponseBody200,
				}
			: {
					ok: response.ok,
					status: response.status as 400 | 401,
					body: (await response.json()) as ResponseBody4xx,
				};
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
