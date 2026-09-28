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
import type {
	Common,
	Destination,
	DestinationResult,
	Options,
	ResponseBodyException,
} from '#bizgo/v1/types.ts';

export type {
	AlimtalkMessage, //
	BrandMessage,
	InternationalMessage,
	MmsMessage,
	NaverTalkMessage,
	Options,
	RcsMessage,
	ResponseBodyException,
	SmsMessage,
};

export type RequestBody = {
	/** 1–200 */
	destinations: Destination[];
	messageFlow: MessageFlowItem[];
	paymentCode?: string;
	groupKey?: string;
	idempotencyKey?: string;
	idempotencyTtl?: number;
	ref?: string;
};

type OmniDestinationResult = DestinationResult & { ref?: string };

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: {
			destinations: OmniDestinationResult[];
		};
		ref?: string;
	};
};
