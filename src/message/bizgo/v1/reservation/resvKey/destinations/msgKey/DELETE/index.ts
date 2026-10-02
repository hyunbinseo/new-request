import { PRODUCTION_BASE_URL } from '#bizgo/v1/constants.ts';
import { parseResponse } from '#bizgo/v1/response.ts';
import { tryFetch } from '#lib/fetch.ts';
import type { Options, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options };

export const deleteReservationDestination = (resvKey: string, msgKey: string, opts: Options) =>
	tryFetch(
		() =>
			new Request(
				new URL(
					`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/destinations/msgKey/${encodeURIComponent(msgKey)}`,
					opts.baseURL ?? PRODUCTION_BASE_URL,
				),
				{
					method: 'DELETE',
					headers: { Authorization: opts.apiKey },
				},
			),
		parseResponse<ResponseBody, ResponseBodyException>,
		opts,
	);
