import type { Options, ResponseBody, ResponseBodyException } from './resume.types.ts';
export type { Options };

export const resumeReservation = async (resvKey: string, opts: Options) => {
	try {
		const request = new Request(
			new URL(
				`/api/comm/v1/reservation/resvKey/${encodeURIComponent(resvKey)}/resume`,
				opts.baseURL ?? 'https://mars.ibapi.kr',
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
		const body = await response.json();
		return response.ok
			? { ok: response.ok, body: body as ResponseBody }
			: { ok: response.ok, body: body as ResponseBodyException };
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
