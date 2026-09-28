import { tryFetch } from '#lib/fetch.ts';
import type { Status4xx } from '#lib/types.ts';
import type { Options, RequestBody, ResponseBody200, ResponseBody4xx } from './types.ts';
export type { Options, RequestBody };

export const getAccessToken = (requestBody: RequestBody, opts: Options) =>
	tryFetch(
		() => {
			const authorization = `Basic ${btoa(`${opts.clientId}:${opts.clientSecret}`)}`;

			return new Request('https://zoom.us/oauth/token', {
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
		},
		async (response) =>
			response.ok
				? {
						ok: response.ok,
						status: response.status as 200,
						body: (await response.json()) as ResponseBody200,
					}
				: {
						ok: response.ok,
						status: response.status as Status4xx,
						body: (await response.json()) as ResponseBody4xx,
					},
		opts,
	);
