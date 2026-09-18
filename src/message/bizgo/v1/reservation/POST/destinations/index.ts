import { parseBizgoResponse } from '#bizgo/response';
import type { Options, RequestBody, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options, RequestBody };

export const addReservationDestinations = async (
	resvKey: string,
	requestBody: RequestBody,
	opts: Options,
) => {
	try {
		const request = new Request(
			new URL(
				`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/destinations`,
				opts.baseURL,
			),
			{
				method: 'POST',
				headers: {
					'Authorization': opts.apiKey,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			},
		);
		const response = await (opts.fetch || fetch)(request);
		return await parseBizgoResponse<ResponseBody, ResponseBodyException>(response);
	} catch (error) {
		return error instanceof Error ? error : new Error(String(error), { cause: error });
	}
};
