import { fetchBizgo } from '#bizgo/response';
import type { Options, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options };

export const resumeReservation = (resvKey: string, opts: Options) =>
	fetchBizgo<ResponseBody, ResponseBodyException>(
		() =>
			new Request(
				new URL(
					`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/resume`,
					opts.baseURL,
				),
				{
					method: 'POST',
					headers: {
						'Authorization': opts.apiKey,
						'Content-Type': 'application/json',
					},
				},
			),
		opts,
	);
