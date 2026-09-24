import { fetchBizgo } from '#bizgo/response';
import type { Options, Query, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options, Query };

export const getReservations = (query: Query, opts: Options) =>
	fetchBizgo<ResponseBody, ResponseBodyException>(() => {
		const url = new URL('/api/comm/v1/reservation/list', opts.baseURL);
		url.searchParams.set('resvSendTime', query.resvSendTime);
		if (query.paymentCode !== undefined) url.searchParams.set('paymentCode', query.paymentCode);
		if (query.lastSeq !== undefined) url.searchParams.set('lastSeq', query.lastSeq.toString());
		if (query.limit !== undefined) url.searchParams.set('limit', query.limit.toString());

		return new Request(url, {
			method: 'GET',
			headers: { Authorization: opts.apiKey },
		});
	}, opts);
