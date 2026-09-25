// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { ReservationDestination } from '#bizgo/v1/reservation/types.ts';
import type { Common, Options, ResponseBodyException } from '#bizgo/v1/types.ts';

export type { Options, ReservationDestination, ResponseBodyException };

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
