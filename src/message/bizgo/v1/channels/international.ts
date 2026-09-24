// See https://developers.bizgo.io/api-sdk/api-reference/comm/international

export type InternationalMessage = {
	from: string;
	text: string;
	ttl?: string;
	clientSubId?: string;
};
