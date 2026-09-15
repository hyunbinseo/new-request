import type {
	Options,
	RequestBody,
	ResponseBody,
	ResponseBodyException,
} from './destinations.types.ts';
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
