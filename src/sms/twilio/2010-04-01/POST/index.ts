import { tryFetch } from '#lib/fetch.ts';
import type { Options, RequestBody, ResponseBody, ResponseBodyException } from './types.ts';
export type { Options, RequestBody };

export const sendSms = (requestBody: RequestBody, opts: Options) =>
	tryFetch(
		() => {
			const From = requestBody.from || opts.from;
			const { body: Body, to: To } = requestBody;

			const authorization = `Basic ${btoa(`${opts.accountSid}:${opts.authToken}`)}`;

			return new Request(
				new URL(
					`/2010-04-01/Accounts/${opts.accountSid}/Messages.json`, //
					'https://api.twilio.com',
				),
				{
					method: 'POST',
					headers: {
						'Authorization': authorization,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: new URLSearchParams({ From, Body, To }),
				},
			);
		},
		async (response) => {
			const body = await response.json();
			return response.ok
				? { ok: response.ok, body: body as ResponseBody }
				: { ok: response.ok, body: body as ResponseBodyException };
		},
		opts,
	);
