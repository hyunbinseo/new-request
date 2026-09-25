export type FetchOptions = {
	fetch?: typeof fetch;
	signal?: AbortSignal;
};

export const tryFetch = async <Result>(
	buildRequest: () => Request,
	parseResponse: (response: Response) => Result | Promise<Result>,
	opts: FetchOptions,
) => {
	try {
		const request = buildRequest();
		const response = await (opts.fetch || globalThis.fetch)(request, {
			signal: opts.signal ?? null,
		});
		return await parseResponse(response);
	} catch (error) {
		return error instanceof Error ? error : new Error(String(error), { cause: error });
	}
};
