// See https://developers.bizgo.io/api-sdk/api-reference/comm/mt

import type { AlimtalkMessage } from '#bizgo/channels/kakao/alimtalk.ts';
import type { BrandMessage } from '#bizgo/channels/kakao/brandmessage.ts';
import type { MmsMessage } from '#bizgo/channels/mms.ts';
import type { NaverTalkMessage } from '#bizgo/channels/navertalk.ts';
import type { RcsMessage } from '#bizgo/channels/rcs.ts';
import type { SmsMessage } from '#bizgo/channels/sms.ts';
import type { Common, Destination } from '#bizgo/reservation';

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
	/** Uses KST (Asia/Seoul), e.g. `2026-05-01 10:00:00`. */
	resvSendTime: string;
	resvName?: string;
	paymentCode?: string;
	ref?: string;
};

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		resvKey: string;
	};
};

export type ResponseBodyException = {
	common: Common;
	data: {
		code: string;
		result: string;
	};
};
