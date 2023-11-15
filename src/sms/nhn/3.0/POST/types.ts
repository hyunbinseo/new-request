export type RequestBody = {
	title?: string;
	body: string;
	sendNo: string;
	recipientList: Array<{
		recipientNo: string;
		countryCode?: string;
		internationalRecipientNo?: string;
		templateParameter?: Record<string, Record<string, unknown>>;
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
