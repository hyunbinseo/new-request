import { type FetchOptions, tryFetch } from '#lib/fetch.ts';

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

/**
 * Sends the request built by `createRequest` and parses the response. Anything that throws,
 * from building the request (e.g. an invalid header) to a network failure, is returned as an
 * Error instead, so callers only ever handle a result or an Error.
 */
export const fetchBizgo = <Ok, Fail>(createRequest: () => Request, opts: FetchOptions) =>
	tryFetch(createRequest, parseBizgoResponse<Ok, Fail>, opts);
