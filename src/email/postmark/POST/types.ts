// Reference https://postmarkapp.com/developer/api/email-api

export type Options = {
	serverToken: string;
	from: string;
	fetch?: typeof fetch;
};

type Body =
	| { HtmlBody: string; TextBody?: string } //
	| { HtmlBody?: string; TextBody: string };

export type RequestBody = { From?: string; To: string } & Body &
	Partial<{
		Cc: string;
		Bcc: string;
		Subject: string;
		Tag: string;
		ReplyTo: string;
		Headers: Array<{ Name: string; Value: string }>;
		TrackOpens: boolean;
		TrackLinks: 'None' | 'HtmlAndText' | 'HtmlOnly' | 'TextOnly';
		Metadata: Record<string, string>;
		Attachments: Array<{
			Name: string;
			Content: string;
			ContentType: string;
			ContentID?: string;
		}>;
		MessageStream: string;
	}>;

export type ResponseBody200 = {
	To: string;
	SubmittedAt: string;
	MessageID: string;
	ErrorCode: 0;
	Message: string;
};

export type ResponseBody4xx = {
	ErrorCode: ErrorCode;
	Message: string;
};

// Reference https://postmarkapp.com/developer/api/overview#error-codes
type ErrorCode =
	| 10
	| 11
	| 12
	| 13
	| 100
	| 300
	| 400
	| 401
	| 402
	| 403
	| 405
	| 406
	| 409
	| 410
	| 411
	| 412
	| 413
	| 500
	| 501
	| 502
	| 503
	| 504
	| 505
	| 506
	| 507
	| 510
	| 511
	| 512
	| 513
	| 514
	| 515
	| 516
	| 520
	| 521
	| 522
	| 600
	| 602
	| 603
	| 604
	| 605
	| 606
	| 607
	| 608
	| 609
	| 610
	| 611
	| 700
	| 701
	| 702
	| 703
	| 800
	| 809
	| 810
	| 811
	| 812
	| 813
	| 900
	| 1000
	| 1001
	| 1002
	| 1003
	| 1100
	| 1101
	| 1105
	| 1109
	| 1120
	| 1121
	| 1122
	| 1123
	| 1125
	| 1130
	| 1131
	| 1221
	| 1222
	| 1223
	| 1224
	| 1225
	| 1226
	| 1227
	| 1228
	| 1229
	| 1230
	| 1231
	| 1232
	| 1233
	| 1234
	| 1235
	| 1236
	| 1237
	| 1300
	| 1301
	| 1302;
