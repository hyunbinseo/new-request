import { parseBizgoResponse } from '#bizgo/response';
import type { Options, Query, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options, Query };

export const getReservationDestinations = async (resvKey: string, query: Query, opts: Options) => {
	try {
		const url = new URL(
			`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/destinations`,
			opts.baseURL,
		);
		if (query.lastSeq !== undefined) url.searchParams.set('lastSeq', query.lastSeq.toString());
		if (query.limit !== undefined) url.searchParams.set('limit', query.limit.toString());

		const request = new Request(url, {
			method: 'GET',
			headers: { Authorization: opts.apiKey },
		});
		const response = await (opts.fetch || fetch)(request);
		return await parseBizgoResponse<ResponseBody, ResponseBodyException>(response);
	} catch (error) {
		return error instanceof Error ? error : new Error(String(error), { cause: error });
	}
};
