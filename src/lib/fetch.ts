export const tryFetch = async <Result>(
	buildRequest: () => Request,
	parseResponse: (response: Response) => Result | Promise<Result>,
	opts: { fetch?: typeof fetch },
) => {
	try {
		const request = buildRequest();
		const response = await (opts.fetch || globalThis.fetch)(request);
		return await parseResponse(response);
	} catch (error) {
		return error instanceof Error ? error : new Error(String(error), { cause: error });
	}
};
