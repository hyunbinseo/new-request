import type { Options, RequestBody, ResponseBody, ResponseBodyException } from './types.js';
export type { Options, RequestBody };

export const sendSms = async (requestBody: RequestBody, opts: Options) => {
	const From = requestBody.from || opts.from;
	const { body: Body, to: To } = requestBody;

	const authorization = `Basic ${btoa(`${opts.accountSid}:${opts.authToken}`)}`;

	const request = new Request(
		`https://api.twilio.com/2010-04-01/Accounts/${opts.accountSid}/Messages.json`,
		{
			method: 'POST',
			headers: {
				'Authorization': authorization,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({ From, Body, To }),
		},
	);

	try {
		const response = await (opts.fetch || fetch)(request);
		const body = await response.json();
		return response.ok
			? { ok: response.ok, body: body as ResponseBody }
			: { ok: response.ok, body: body as ResponseBodyException };
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
