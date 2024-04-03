// Reference https://www.twilio.com/docs/usage/api

export type Options = {
	accountSid: string;
	authToken: string;
	from: string;
	fetch?: Fetch;
};

// Reference https://www.twilio.com/docs/usage/requests-to-twilio
export type RequestBody = {
	// The message content is specified via one of the following parameters:
	// Reference https://www.twilio.com/docs/messaging/api/message-resource
	from?: string;
	body: string;
	to: string;
};

type Status =
	| 'queued'
	| 'sending'
	| 'sent'
	| 'failed'
	| 'delivered'
	| 'undelivered'
	| 'receiving'
	| 'received';
// | 'accepted'
// | 'scheduled'
// | 'read'
// | 'partially_delivered'
// | 'canceled';

// Reference https://www.twilio.com/docs/usage/twilios-response
export type ResponseBody = {
	account_sid: string;
	api_version: '2010-04-01';
	body: string;
	date_created: string;
	date_sent: null | string;
	date_updated: string;
	direction: 'outbound-api';
	// Reference https://www.twilio.com/docs/api/errors
	error_code: null | number;
	error_message: null | string;
	from: string;
	// The value is `null` if a Messaging Service was not used.
	messaging_service_sid: null;
	num_media: string; // '0'
	num_segments: string; // '1'
	price_unit: null | string;
	price: null | string;
	sid: string;
	status: Status;
	subresource_uris: { media: string };
	to: string;
	uri: string;
};

// Reference https://www.twilio.com/docs/usage/twilios-response
export type ResponseBodyException = {
	status: number;
	message: string;
	code?: number;
	more_info?: string;
};
