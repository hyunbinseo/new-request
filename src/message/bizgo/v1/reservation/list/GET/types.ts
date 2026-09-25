// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Reservation } from '#bizgo/v1/reservation/types.ts';
import type { Common, Options, ResponseBodyException } from '#bizgo/v1/types.ts';

export type { Options, ResponseBodyException };

export type Query = {
	/**
	 * - `yyyy-MM-dd HH:mm:ss` in KST (e.g. `2026-05-01 10:00:00`)
	 * - Month or day alone (e.g. `2026-05`) is rejected with `A213`
	 * - Matches reservations at or after this time
	 */
	resvSendTime: string;
	paymentCode?: string;
	lastSeq?: number;
	/**
	 * - 1–1000, defaults to 100
	 * - `0` returns an empty page
	 * - Over 1000 is rejected with `A213`, and negative values with `A010`
	 */
	limit?: number;
};

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: {
			lastSeq: number;
			hasNext: boolean;
			reservations: Reservation[];
		};
	};
};
