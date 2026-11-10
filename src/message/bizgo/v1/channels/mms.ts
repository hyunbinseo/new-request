// See https://developers.bizgo.io/api-sdk/api-reference/comm/mt

type MmsMessageBase = {
	from: string;
	title?: string;
	text: string;
	ttl?: string;
	originCID?: string;
};

// LMS and MMS share `mms`, and only MMS has files.
export type MmsMessageLong = MmsMessageBase & { fileKey?: never };
export type MmsMessageImage = MmsMessageBase & {
	/** Up to 3 */
	fileKey: string[];
};

export type MmsMessage = MmsMessageLong | MmsMessageImage;
