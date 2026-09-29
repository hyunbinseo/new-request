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
import type { DestinationsInput, ResvSendTimeInput } from '#bizgo/v1/reservation/types.ts';
import type {
	Common,
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

export type RequestBody = DestinationsInput & ResvSendTimeInput & {
	messageFlow: MessageFlowItem[];
	/** Max length 100 */
	resvName?: string;
	paymentCode?: string;
	ref?: string;
};

type ReservationDestinationResult = DestinationResult & { ref?: string };

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		resvKey: string;
		ref?: string;
		data: {
			destinations: ReservationDestinationResult[];
		};
	};
};
