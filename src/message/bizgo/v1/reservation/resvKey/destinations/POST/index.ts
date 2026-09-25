import { PRODUCTION_BASE_URL } from '#bizgo/v1/constants.ts';
import { parseResponse } from '#bizgo/v1/response.ts';
import { tryFetch } from '#lib/fetch.ts';
import type { Options, RequestBody, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options, RequestBody };

export const addReservationDestinations = (
	resvKey: string,
	requestBody: RequestBody,
	opts: Options,
) =>
	tryFetch(
		() =>
			new Request(
				new URL(
					`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/destinations`,
					opts.baseURL ?? PRODUCTION_BASE_URL,
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
		parseResponse<ResponseBody, ResponseBodyException>,
		opts,
	);
