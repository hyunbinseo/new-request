import { PRODUCTION_BASE_URL } from '#bizgo/v1/constants.ts';
import { parseResponse } from '#bizgo/v1/response.ts';
import { tryFetch } from '#lib/fetch.ts';
import type { Options, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options };

/** A reservation that hasn't started sending is rejected with `A824`. */
export const resumeReservation = (resvKey: string, opts: Options) =>
	tryFetch(
		() =>
			new Request(
				new URL(
					`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/resume`,
					opts.baseURL ?? PRODUCTION_BASE_URL,
				),
				{
					method: 'POST',
					headers: {
						'Authorization': opts.apiKey,
						'Content-Type': 'application/json',
					},
				},
			),
		parseResponse<ResponseBody, ResponseBodyException>,
		opts,
	);
