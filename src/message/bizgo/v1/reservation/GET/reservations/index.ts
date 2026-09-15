import type { Options, Query, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options, Query };

export const getReservations = async (query: Query, opts: Options) => {
	const url = new URL('/api/comm/v1/reservation/list', opts.baseURL ?? 'https://mars.ibapi.kr');
	url.searchParams.set('resvSendTime', query.resvSendTime);
	if (query.paymentCode !== undefined) url.searchParams.set('paymentCode', query.paymentCode);
	if (query.lastSeq !== undefined) url.searchParams.set('lastSeq', query.lastSeq.toString());
	if (query.limit !== undefined) url.searchParams.set('limit', query.limit.toString());

	try {
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
