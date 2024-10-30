// Reference https://docs.nhncloud.com/ko/Notification/SMS/ko/api-guide/

export type Options = {
	appKey: string;
	secretKey: string;
	fetch?: typeof fetch;
};

type SMS = { title?: never; type: 'auth/sms' | 'sms' | 'ad-sms' };
type MMS = { title: string; type: 'mms' | 'ad-mms' };

type Shared = {
	requestDate?: string;
	senderGroupingKey?: string;
	userId?: string;
	statsId?: string;
	originCode?: string;
};

type Recipient = {
	recipientNo: string;
	countryCode?: string;
	internationalRecipientNo?: string;
	recipientGroupingKey?: string;
};

type WithoutTemplate = {
	templateId?: never;
	body: string;
	sendNo: string;
	recipientList: Array<Recipient & { templateParameter?: never }>;
};

type WithTemplate = {
	templateId: string;
	body?: never;
	sendNo?: never;
	recipientList: Array<Recipient & { templateParameter: Record<string, string> }>;
};

export type RequestBody = Shared & (SMS | MMS) & (WithoutTemplate | WithTemplate);

export type ResponseBody = {
	header: {
		isSuccessful: boolean;
		resultCode: number;
		resultMessage: string;
	};
	body: {
		data: {
			requestId: string;
			statusCode: string;
			senderGroupingKey: string;
			sendResultList: Array<{
				recipientNo: string;
				resultCode: number;
				resultMessage: string;
				recipientSeq: number;
				recipientGroupingKey: string;
			}>;
		};
	};
};
