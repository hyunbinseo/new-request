import type { AlimtalkMessage } from './channels/kakao/alimtalk.ts';
import type { BrandMessage } from './channels/kakao/brandmessage.ts';
import type { MmsMessage } from './channels/mms.ts';
import type { NaverTalkMessage } from './channels/naver/navertalk.ts';
import type { RcsMessage } from './channels/rcs.ts';
import type { SmsMessage } from './channels/sms.ts';

export type {
	AlimtalkMessage, //
	BrandMessage,
	MmsMessage,
	NaverTalkMessage,
	RcsMessage,
	SmsMessage,
};

type MessageFlowItem =
	| { sms: SmsMessage }
	| { mms: MmsMessage }
	| { rcs: RcsMessage }
	| { alimtalk: AlimtalkMessage }
	| { brandmessage: BrandMessage }
	| { navertalk: NaverTalkMessage };

type Destination = {
	to: string;
	replaceWords?: Record<string, string>;
	ref?: string;
};

export type Options = {
	apiKey: string;
	baseURL?:
		| 'https://mars.ibapi.kr' // Production
		| 'https://sandbox-mars.ibapi.kr'; // Sandbox
	fetch?: typeof fetch;
};

export type RequestBody = {
	destinations: Destination[];
	messageFlow: MessageFlowItem[];
	ref?: string;
};

type Common = {
	authCode: string;
	authResult: string;
	infobankTrId: string;
};

type DestinationResult = {
	to: string;
	msgKey: string;
	code: string;
	result: string;
	ref: string;
};

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: {
			destinations: DestinationResult[];
		};
		ref: string;
	};
};

export type ResponseBodyException = {
	common: Common;
	data: {
		code: string;
		result: string;
	};
};
