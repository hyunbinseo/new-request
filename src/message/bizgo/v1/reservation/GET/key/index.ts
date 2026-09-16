import type { Options, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options };

export const getReservation = async (resvKey: string, opts: Options) => {
	try {
		const request = new Request(
			new URL(`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}`, opts.baseURL),
			{
				method: 'GET',
				headers: { Authorization: opts.apiKey },
			},
		);
		const response = await (opts.fetch || fetch)(request);
		const body = await response.json();
		return response.ok
			? { ok: response.ok, body: body as ResponseBody }
			: { ok: response.ok, body: body as ResponseBodyException };
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
