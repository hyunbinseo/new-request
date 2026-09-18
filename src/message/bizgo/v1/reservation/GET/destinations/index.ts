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
		// Read as text first: a success body may be empty, and gateway/auth errors can be
		// plain text or HTML — either makes response.json() throw and hides the HTTP status.
		const text = await response.text();
		let body: unknown;
		try {
			body = text ? JSON.parse(text) : undefined;
		} catch {
			body = text;
		}
		return response.ok
			? { ok: response.ok, body: body as ResponseBody }
			: { ok: response.ok, body: body as ResponseBodyException };
	} catch (error) {
		return error instanceof Error ? error : new Error(String(error), { cause: error });
	}
};
