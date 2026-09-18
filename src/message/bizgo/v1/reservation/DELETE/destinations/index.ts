import { parseBizgoResponse } from '#bizgo/response';
import type { Options, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options };

export const deleteReservationDestination = async (
	resvKey: string,
	msgKey: string,
	opts: Options,
) => {
	try {
		const request = new Request(
			new URL(
				`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/destinations/msgKey/${encodeURIComponent(msgKey)}`,
				opts.baseURL,
			),
			{
				method: 'DELETE',
				headers: { Authorization: opts.apiKey },
			},
		);
		const response = await (opts.fetch || fetch)(request);
		return await parseBizgoResponse<ResponseBody, ResponseBodyException>(response);
	} catch (error) {
		return error instanceof Error ? error : new Error(String(error), { cause: error });
	}
};
