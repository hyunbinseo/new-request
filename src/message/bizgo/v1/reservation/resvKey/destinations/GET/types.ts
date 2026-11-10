// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { ReservationDestination } from '#bizgo/v1/reservation/types.ts';
import type { Options, ResponseBodyException, ResultBody } from '#bizgo/v1/types.ts';

export type { Options, ReservationDestination, ResponseBodyException };

export type Query = {
	lastSeq?: number;
	/**
	 * - Up to 1000
	 * - `0` returns an empty page with `hasNext: true`
	 * - Over 1000 is rejected with `A213`, and negative values with `A010`
	 */
	limit?: number;
};

export type ResponseBody = ResultBody<{
	destinations: ReservationDestination[];
	lastSeq: number;
	hasNext: boolean;
}>;
