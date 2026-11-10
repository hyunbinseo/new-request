// See https://developers.bizgo.io/api-sdk/api-reference/comm/mt

import type {
	AlimtalkMessageRegular,
	BrandMessageBasic,
	BrandMessageFree,
	InternationalMessage,
	MmsMessage,
	RcsReservationMessage,
	SmsMessage,
} from '#bizgo/v1/channels/index.ts';
import type { DestinationsInput, ResvSendTimeInput } from '#bizgo/v1/reservation/types.ts';
import type {
	DestinationResult,
	MessageFlowDestination,
	Options,
	ResponseBodyException,
	ResultBody,
} from '#bizgo/v1/types.ts';

export type {
	AlimtalkMessageRegular, //
	BrandMessageBasic,
	BrandMessageFree,
	InternationalMessage,
	MmsMessage,
	Options,
	RcsReservationMessage,
	ResponseBodyException,
	SmsMessage,
};

// The reservation docs list fewer channels and fields than the send docs.
type ReservationMessageFlowItem =
	| { sms: SmsMessage }
	| { mms: MmsMessage }
	| { rcs: RcsReservationMessage }
	| { alimtalk: AlimtalkMessageRegular }
	| { brandmessage: BrandMessageBasic | BrandMessageFree }
	| { international: InternationalMessage };

export type RequestBody = DestinationsInput<MessageFlowDestination> &
	ResvSendTimeInput & {
		messageFlow: ReservationMessageFlowItem[];
		/** Max length 100 */
		resvName?: string;
		ref?: string;
	};

export type ResponseBody = ResultBody<
	{
		destinations: (DestinationResult & {
			/** Echoes `destinations[].ref`, missing in the docs */
			ref?: string;
		})[];
	},
	{ resvKey: string; ref?: string }
>;
