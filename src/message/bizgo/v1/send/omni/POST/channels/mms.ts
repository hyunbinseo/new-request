// See https://developers.bizgo.io/api-sdk/api-reference/comm/mt

export type MmsMessage = {
	from: string;
	title?: string;
	text: string;
	fileKey?: string[];
	ttl?: string;
	originCID?: string;
	paymentCode?: string;
	groupKey?: string;
	idempotencyKey?: string;
	idempotencyTtl?: number;
	ref?: string;
};
