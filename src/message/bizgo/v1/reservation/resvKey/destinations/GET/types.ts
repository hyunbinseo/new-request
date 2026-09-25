// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type {
	Common,
	Options,
	ReservationDestination,
	ResponseBodyException,
} from '#bizgo/v1/reservation/types.ts';

export type { Options, ResponseBodyException };

export type Query = {
	lastSeq?: number;
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
			destinations: ReservationDestination[];
		};
	};
};
