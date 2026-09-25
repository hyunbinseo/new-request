import { tryFetch } from '#lib/fetch.ts';
import type { Options, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options };

export const stopReservation = (resvKey: string, opts: Options) =>
	tryFetch(
		() =>
			new Request(
				new URL(
					`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/stop`,
					opts.baseURL,
				),
				{
					method: 'POST',
					headers: {
						'Authorization': opts.apiKey,
						'Content-Type': 'application/json',
					},
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
