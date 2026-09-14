import type { Options, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options };

export const resumeReservation = async (resvKey: string, opts: Options) => {
	const request = new Request(
		new URL(
			`/api/comm/v1/reservation/resvKey/${resvKey}/resume`,
			opts.baseURL ?? 'https://mars.ibapi.kr',
		),
		{
			method: 'POST',
			headers: { Authorization: opts.apiKey },
		},
	);

	try {
		const response = await (opts.fetch || fetch)(request);
		const body = await response.json();
		return response.ok
			? { ok: response.ok, body: body as ResponseBody }
			: { ok: response.ok, body: body as ResponseBodyException };
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
