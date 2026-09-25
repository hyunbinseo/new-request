import { tryFetch } from '#lib/fetch.ts';
import type { Options, RequestBody, ResponseBody4xx, ResponseBody5xx } from './types.ts';
export type { Options, RequestBody };

export const sendEmail = (requestBody: RequestBody, opts: Options) =>
	tryFetch(
		() =>
			new Request('https://api.sendgrid.com/v3/mail/send', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${opts.apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...requestBody, from: requestBody.from || opts.from }),
			}),
		async (response) => {
			if (response.status === 202) return { ok: true, status: response.status } as const;

			if (response.status === 500) {
				const body = (await response.json()) as ResponseBody5xx;
				return { ok: false, status: response.status, body } as const;
			}

			return {
				ok: false,
				status: response.status as 400 | 401 | 403 | 404 | 413,
				body: (await response.json()) as ResponseBody4xx,
			} as const;
		},
		opts,
	);
