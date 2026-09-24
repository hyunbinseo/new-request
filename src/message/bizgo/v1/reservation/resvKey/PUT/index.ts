import { fetchBizgo } from '#bizgo/response';
import type { Options, RequestBody, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options, RequestBody };

export const updateReservation = (resvKey: string, requestBody: RequestBody, opts: Options) =>
	fetchBizgo<ResponseBody, ResponseBodyException>(
		() =>
			new Request(
				new URL(`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}`, opts.baseURL),
				{
					method: 'PUT',
					headers: {
						'Authorization': opts.apiKey,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(requestBody),
				},
			),
		opts,
	);
