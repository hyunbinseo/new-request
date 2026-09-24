// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Common, Options, Reservation, ResponseBodyException } from '#bizgo/reservation';

export type { Options, ResponseBodyException };

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: Reservation;
	};
};
