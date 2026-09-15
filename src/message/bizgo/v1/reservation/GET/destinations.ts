import type { Options, Query, ResponseBody, ResponseBodyException } from './destinations.types.ts';
export type { Options, Query };

export const listReservationDestinations = async (resvKey: string, query: Query, opts: Options) => {
	try {
		const url = new URL(
			`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/destinations`,
			opts.baseURL ?? 'https://mars.ibapi.kr',
		);
		if (query.lastSeq !== undefined) url.searchParams.set('lastSeq', query.lastSeq.toString());
		if (query.limit !== undefined) url.searchParams.set('limit', query.limit.toString());

		const request = new Request(url, {
			method: 'GET',
			headers: { Authorization: opts.apiKey },
		});
		const response = await (opts.fetch || fetch)(request);
		const body = await response.json();
		return response.ok
			? { ok: response.ok, body: body as ResponseBody }
			: { ok: response.ok, body: body as ResponseBodyException };
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
