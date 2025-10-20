import type { Status4xx } from '../../../types.ts';
import type { Options, RequestBody, ResponseBody200, ResponseBody4xx } from './types.ts';
export type { Options, RequestBody };

export const pushMessage = async (requestBody: RequestBody, opts: Options) => {
	if (requestBody.attachment && requestBody.attachment.size > 5242880)
		return new Error('Content Too Large');

	const requestInit: RequestInit = !requestBody.attachment
		? {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: Object.entries(requestBody).reduce(
					(searchParams, [key, value]) => {
						if (value) searchParams.append(key, value.toString());
						return searchParams;
					},
					new URLSearchParams({ token: opts.token, user: opts.user }),
				),
			}
		: {
				method: 'POST',
				body: Object.entries(requestBody).reduce((formData, [key, value], index) => {
					if (!index) {
						formData.append('token', opts.token);
						formData.append('user', opts.user);
					}
					if (value instanceof File || value instanceof Blob) {
						formData.append(key, value, opts.filename || Date.now().toString());
					} else if (value !== undefined) {
						formData.append(key, value.toString());
					}
					return formData;
				}, new FormData()),
			};

	const request = new Request('https://api.pushover.net/1/messages.json', requestInit);

	try {
		const response = await (opts.fetch || fetch)(request);
		return response.ok
			? {
					ok: response.ok,
					status: response.status as 200,
					body: (await response.json()) as ResponseBody200,
				}
			: {
					ok: response.ok,
					status: response.status as Status4xx,
					body: (await response.json()) as ResponseBody4xx,
				};
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
