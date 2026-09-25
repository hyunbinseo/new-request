import { tryFetch } from '#lib/fetch.ts';
import type { Options, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options };

export const deleteReservationDestination = (resvKey: string, msgKey: string, opts: Options) =>
	tryFetch(
		() =>
			new Request(
				new URL(
					`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/destinations/msgKey/${encodeURIComponent(msgKey)}`,
					opts.baseURL,
				),
				{
					method: 'DELETE',
					headers: { Authorization: opts.apiKey },
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
