export const parseResponse = async <ResponseBody, ResponseBodyException>(response: Response) => {
	const body = await response.json();
	return response.ok
		? { ok: response.ok, body: body as ResponseBody }
		: { ok: response.ok, body: body as ResponseBodyException };
};
