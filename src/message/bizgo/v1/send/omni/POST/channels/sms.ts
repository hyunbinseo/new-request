// See https://developers.bizgo.io/api-sdk/api-reference/comm/mt

export type SmsMessage = {
	from: string;
	text: string;
	ttl?: string;
	originCID?: string;
};
