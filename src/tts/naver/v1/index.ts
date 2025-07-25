import type { Options, RequestBody, ResponseBodyError } from './types.ts';
export type { Options, RequestBody };

export const textToSpeech = async (requestBody: RequestBody, opts: Options) => {
	const { speaker, ...rest } = requestBody;

	const searchParams = new URLSearchParams(
		// Reference https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1568
		rest as Record<string, string | number | boolean> as Record<string, string>,
	);

	searchParams.append('speaker', speaker.code);

	const request = new Request('https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-NCP-APIGW-API-KEY-ID': opts.clientId,
			'X-NCP-APIGW-API-KEY': opts.clientSecret,
		},
		body: searchParams,
	});

	try {
		const response = await (opts.fetch || fetch)(request);
		return response.ok
			? (response as Omit<Response, 'ok'> & { ok: true })
			: {
					ok: response.ok,
					body: (await response.json()) as ResponseBodyError,
			  };
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
