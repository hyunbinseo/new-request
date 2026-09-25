import type { AlimtalkMessage } from '#bizgo/channels/kakao/alimtalk.ts';
import type { BrandMessage } from '#bizgo/channels/kakao/brandmessage.ts';
import type { MmsMessage } from '#bizgo/channels/mms.ts';
import type { NaverTalkMessage } from '#bizgo/channels/navertalk.ts';
import type { RcsMessage } from '#bizgo/channels/rcs.ts';
import type { SmsMessage } from '#bizgo/channels/sms.ts';
import type { FetchOptions } from '#lib/fetch.ts';

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

export type Options = FetchOptions & {
	apiKey: string;
	baseURL?:
		| 'https://mars.ibapi.kr' // Production
		| 'https://sandbox-mars.ibapi.kr'; // Sandbox
};

export type RequestBody = {
	destinations: Destination[];
	messageFlow: MessageFlowItem[];
	paymentCode?: string;
	groupKey?: string;
	idempotencyKey?: string;
	idempotencyTtl?: number;
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
	ref?: string;
};

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: {
			destinations: DestinationResult[];
		};
		ref?: string;
	};
};

export type ResponseBodyException = {
	common: Common;
	data: {
		code: string;
		result: string;
	};
};
