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
} from '#bizgo/channels/index.ts';
import type { Common, Destination, Options, ResponseBodyException } from '#bizgo/reservation';

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
	destinations: Destination[];
	messageFlow: MessageFlowItem[];
	/**
	 * Uses KST (Asia/Seoul), e.g. `2026-05-01 10:00:00`. A UTC string is not rejected —
	 * it's silently misinterpreted as KST, so the reservation fires at the wrong time.
	 * Must be at least 10 minutes and at most 1 year from now, or the API responds with
	 * an A316 error. Undocumented in the API reference; only mentioned in a Bizgo notice.
	 * See https://community.bizgo.io/t/topic/91/3
	 */
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
		/** Echoes the request's `ref`. Undocumented; confirmed by live testing. */
		ref?: string;
		/**
		 * Per-destination *registration* result, not the final delivery outcome — confirmed
		 * by live testing. A malformed `to` (e.g. wrong format) fails the entire request instead
		 * (see `ResponseBodyException`), so every entry here is `code: 'A000'` as long as the
		 * request succeeds; whether the message is actually delivered at `resvSendTime` can
		 * only be checked afterwards via `getReservationDestinations`.
		 */
		data?: {
			destinations: {
				to: string;
				msgKey: string;
				code: string;
				result: string;
			}[];
		};
	};
};
