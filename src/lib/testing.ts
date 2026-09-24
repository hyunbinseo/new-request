export const captureFetch = () => {
	const requests: Request[] = [];
	const capture: typeof fetch = async (input, init) => {
		requests.push(new Request(input, init));
		return Response.json({});
	};
	return { fetch: capture, requests };
};
