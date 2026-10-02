export const captureFetch = (
	respond: (request: Request) => Response | Promise<Response> = () => Response.json({}),
): {
	fetch: typeof fetch;
	requests: readonly Request[];
} => {
	const requests: Request[] = [];
	const capture: typeof fetch = async (input, init) => {
		const request = new Request(input, init);
		requests.push(request);
		return respond(request.clone());
	};
	return { fetch: capture, requests };
};
