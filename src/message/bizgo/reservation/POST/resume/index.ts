import { parseBizgoResponse } from '#bizgo/response';
import type { Options, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options };

export const resumeReservation = async (resvKey: string, opts: Options) => {
	try {
		const request = new Request(
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
		);
		const response = await (opts.fetch || fetch)(request);
		return await parseBizgoResponse<ResponseBody, ResponseBodyException>(response);
	} catch (error) {
		return error instanceof Error ? error : new Error(String(error), { cause: error });
	}
};
