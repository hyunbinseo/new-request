import { tryFetch } from '#lib/fetch.ts';
import type { Options, RequestBody, ResponseBodyError } from './types.ts';
export type { Options, RequestBody };

export const textToSpeech = (requestBody: RequestBody, opts: Options) =>
	tryFetch(
		() => {
			const { speaker, ...rest } = requestBody;

			const searchParams = new URLSearchParams(
				// See https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1568
				rest as Record<string, string | number> as Record<string, string>,
			);

			searchParams.append('speaker', speaker.code);

			return new Request('https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-NCP-APIGW-API-KEY-ID': opts.clientId,
					'X-NCP-APIGW-API-KEY': opts.clientSecret,
				},
				body: searchParams,
			});
		},
		async (response) =>
			response.ok
				? (response as Omit<Response, 'ok'> & { ok: true })
				: {
						ok: response.ok,
						body: (await response.json()) as ResponseBodyError,
					},
		opts,
	);
