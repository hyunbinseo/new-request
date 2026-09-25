import { PRODUCTION_BASE_URL } from '#bizgo/v1/constants.ts';
import { parseResponse } from '#bizgo/v1/response.ts';
import { tryFetch } from '#lib/fetch.ts';
import type {
	Options,
	Query,
	ReservationDestination,
	ResponseBody,
	ResponseBodyException,
} from './types.ts';
export type { Options, Query, ReservationDestination };

export const getReservationDestinations = (resvKey: string, query: Query, opts: Options) =>
	tryFetch(
		() => {
			const url = new URL(
				`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/destinations`,
				opts.baseURL ?? PRODUCTION_BASE_URL,
			);
			if (query.lastSeq !== undefined) url.searchParams.set('lastSeq', query.lastSeq.toString());
			if (query.limit !== undefined) url.searchParams.set('limit', query.limit.toString());

			return new Request(url, {
				method: 'GET',
				headers: { Authorization: opts.apiKey },
			});
		},
		parseResponse<ResponseBody, ResponseBodyException>,
		opts,
	);
