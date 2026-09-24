import { fetchBizgo } from '#bizgo/response';
import type { Options, RequestBody, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options, RequestBody };

export const sendMessage = (requestBody: RequestBody, opts: Options) =>
	fetchBizgo<ResponseBody, ResponseBodyException>(
		() =>
			new Request(
				new URL(
					'/api/comm/v1/send/omni', //
					opts.baseURL ?? 'https://mars.ibapi.kr',
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
		opts,
	);
