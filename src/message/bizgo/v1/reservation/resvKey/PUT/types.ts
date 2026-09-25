// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Reservation, ResvSendTimeInput } from '#bizgo/v1/reservation/types.ts';
import type { Common, Options, ResponseBodyException } from '#bizgo/v1/types.ts';

export type { Options, ResponseBodyException };

export type RequestBody = ResvSendTimeInput & {
	resvName?: string;
};

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: Reservation;
	};
};
