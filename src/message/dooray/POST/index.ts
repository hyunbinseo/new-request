import { tryFetch } from '#lib/fetch.ts';
import type { Options, RequestBody } from './types.ts';
export type { Options, RequestBody };

export const sendMessage = (requestBody: RequestBody, opts: Options) =>
	tryFetch(
		() =>
			new Request(opts.url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...requestBody,
					botIconImage:
						requestBody.botIconImage || 'https://static.dooray.com/static_images/dooray-bot.png',
				}),
			}),
		(response) => ({
			ok: response.ok,
			status: response.status,
		}),
		opts,
	);
