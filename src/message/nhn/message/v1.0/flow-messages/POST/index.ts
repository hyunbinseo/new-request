import type { Options, RequestBody, ResponseBody } from './types.ts';
export type { Options, RequestBody };

export const sendFlowMessage = async (requestBody: RequestBody, opts: Options) => {
	const request = new Request(
		new URL(
			`/message/v1.0/flow-messages/${opts.messagePurpose}`,
			'https://notification-hub.api.nhncloudservice.com',
		),
		{
			method: 'POST',
			headers: {
				'X-NC-APP-KEY': opts.appKey,
				'X-NHN-Authorization': `Bearer ${opts.accessToken}`,
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(requestBody),
		},
	);

	try {
		const response = await (opts.fetch || fetch)(request);
		const body = (await response.json()) as ResponseBody;
		return { ok: body.header.isSuccessful, ...body };
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
