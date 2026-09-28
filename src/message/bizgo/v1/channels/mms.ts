// See https://developers.bizgo.io/api-sdk/api-reference/comm/mt

export type MmsMessage = {
	from: string;
	title?: string;
	text: string;
	/** Up to 3 */
	fileKey?: string[];
	ttl?: string;
	originCID?: string;
};
