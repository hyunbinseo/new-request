import { fetchBizgo } from '#bizgo/v1/response.ts';
import type { Options, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options };

export const getReservation = (resvKey: string, opts: Options) =>
	fetchBizgo<ResponseBody, ResponseBodyException>(
		() =>
			new Request(
				new URL(`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}`, opts.baseURL),
				{
					method: 'GET',
					headers: { Authorization: opts.apiKey },
				},
			),
		opts,
	);
