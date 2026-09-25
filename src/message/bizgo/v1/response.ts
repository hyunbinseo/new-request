import { tryFetch, type FetchOptions } from '#lib/fetch.ts';

export type BizgoResult<Ok, Fail> = { ok: true; body: Ok } | { ok: false; body: Fail };

/**
 * Turns a Bizgo response into a typed { ok, body } result. `body` is only ever the parsed
 * JSON envelope, so the cast is honest: an empty or non-JSON response (e.g. a gateway HTML
 * error) is returned as an Error rather than cast to a shape it doesn't have, which would
 * otherwise crash callers that read `body.data`.
 */
export const parseBizgoResponse = async <Ok, Fail>(
	response: Response,
): Promise<BizgoResult<Ok, Fail> | Error> => {
	const text = await response.text();
	try {
		const body = JSON.parse(text);
		return response.ok ? { ok: true, body: body as Ok } : { ok: false, body: body as Fail };
	} catch {
		return new Error(
			`Bizgo returned a non-JSON response (HTTP ${response.status}): ${text.slice(0, 200)}`,
		);
	}
};

export const fetchBizgo = <Ok, Fail>(buildRequest: () => Request, opts: FetchOptions) =>
	tryFetch(buildRequest, (response) => parseBizgoResponse<Ok, Fail>(response), opts);
