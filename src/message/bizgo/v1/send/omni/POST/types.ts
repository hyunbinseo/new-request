import type {
	AlimtalkMessage,
	BrandMessage,
	InternationalMessage,
	MessageFlowItem,
	MmsMessage,
	NaverTalkMessage,
	RcsMessage,
	SmsMessage,
} from '#bizgo/v1/channels/index.ts';
import type { Common, Destination, ResponseBodyException } from '#bizgo/v1/reservation/types.ts';
import type { FetchOptions } from '#lib/fetch.ts';

export type {
	AlimtalkMessage, //
	BrandMessage,
	InternationalMessage,
	MmsMessage,
	NaverTalkMessage,
	RcsMessage,
	ResponseBodyException,
	SmsMessage,
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
