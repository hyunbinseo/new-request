export const captureFetch = (
	respond: (request: Request) => Response | Promise<Response> = () => Response.json({}),
) => {
	const requests: Request[] = [];
	const capture: typeof fetch = async (input, init) => {
		const request = new Request(input, init);
		requests.push(request);
		return respond(request);
	};
	return { fetch: capture, requests };
};
