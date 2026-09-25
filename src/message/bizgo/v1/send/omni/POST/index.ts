import { tryFetch } from '#lib/fetch.ts';
import type { Options, RequestBody, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options, RequestBody };

export const sendMessage = (requestBody: RequestBody, opts: Options) =>
	tryFetch(
		() =>
			new Request(
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
			),
		async (response) => {
			const body = await response.json();
			return response.ok
				? { ok: response.ok, body: body as ResponseBody }
				: { ok: response.ok, body: body as ResponseBodyException };
		},
		opts,
	);
