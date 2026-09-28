// See https://developers.bizgo.io/api-sdk/api-reference/comm/mt

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
import type { ResvSendTimeInput } from '#bizgo/v1/reservation/types.ts';
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

export type RequestBody = ResvSendTimeInput & {
	/**
	 * - 1–200
	 * - One invalid `to` fails the whole request with `A306`
	 */
	destinations: Destination[];
	messageFlow: MessageFlowItem[];
	/** Max length 100 */
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
		ref?: string;
		data: {
			destinations: DestinationResult[];
		};
	};
};
