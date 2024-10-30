// Reference https://docs.nhncloud.com/ko/Notification/SMS/ko/api-guide/

export type Options = {
	appKey: string;
	secretKey: string;
	sendNo: string;
	fetch?: typeof fetch;
};

type SMS = { title?: never; type: 'auth/sms' | 'sms' | 'ad-sms' };
type MMS = { title: string; type: 'mms' | 'ad-mms' };

export type RequestBody = (SMS | MMS) & {
	body: string;
	sendNo?: string;
	recipientList: Array<{
		recipientNo: string;
		countryCode?: string;
		internationalRecipientNo?: string;
		templateParameter?: Record<string, string>;
		recipientGroupingKey?: string;
	}>;
	templateId?: string;
	requestDate?: string;
	senderGroupingKey?: string;
	userId?: string;
	statsId?: string;
	originCode?: string;
};

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
