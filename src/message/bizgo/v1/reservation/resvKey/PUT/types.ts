// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { ResvSendTimeInput } from '#bizgo/v1/reservation/types.ts';

export type { Options, ResponseBodyException } from '#bizgo/v1/types.ts';
export type { ReservationResponseBody as ResponseBody } from '#bizgo/v1/reservation/types.ts';

export type RequestBody = ResvSendTimeInput & {
	/** Max length 100 */
	resvName?: string;
};
