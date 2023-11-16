import type { Options, RequestBody, ResponseBody } from './types.js';

export const sendSms = async (requestBody: RequestBody, opts: Options) => {
	requestBody.sendNo = requestBody.sendNo || opts.sendNo;

	const request = new Request(
		new URL(
			`/sms/v3.0/appKeys/${opts.appKey}/sender/${opts.type}`,
			'https://api-sms.cloud.toast.com'
		),
		{
			method: 'POST',
			headers: {
				'X-Secret-Key': opts.secretKey,
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(requestBody),
		}
	);

	try {
		// Always responds with 200 OK
		const response = await (opts.fetch || fetch)(request);
		return (await response.json()) as ResponseBody;
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
