import type { Options, RequestBody, ResponseBody } from './types.ts';
export type { Options, RequestBody };

export const sendSms = async <TemplateKeys extends string = never>(
	requestBody: RequestBody<TemplateKeys>,
	opts: Options,
) => {
	const request = new Request(
		new URL(
			`/sms/v3.0/appKeys/${opts.appKey}/sender/${requestBody.type}`,
			// See https://www.nhncloud.com/kr/support/notice/7645
			'https://sms.api.nhncloudservice.com',
		),
		{
			method: 'POST',
			headers: {
				'X-Secret-Key': opts.secretKey,
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(requestBody),
		},
	);

	try {
		// response.status is always 200
		const response = await (opts.fetch || fetch)(request);
		const body = (await response.json()) as ResponseBody;
		return { ok: body.header.isSuccessful, ...body };
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
