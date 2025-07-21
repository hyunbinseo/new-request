import type { Options, RequestBody, ResponseBody200, ResponseError } from './types.ts';
export type { Options, RequestBody };

export const speechToText = async (requestBody: RequestBody, opts: Options) => {
	const request = new Request('http://aiopen.etri.re.kr:8000/WiseASR/Recognition', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json', // required
			'Authorization': opts.accessKey,
		},
		body: JSON.stringify(requestBody),
	});

	try {
		const response = await (opts.fetch || fetch)(request);
		return response.ok
			? {
					ok: response.ok,
					status: response.status as 200,
					body: (await response.json()) as ResponseBody200,
			  }
			: ({
					ok: response.ok,
					status: response.status,
					body: await response.json(),
			  } as ResponseError);
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
