// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Common, Destination, Options, ResponseBodyException } from '#bizgo/reservation';

export type { Destination, Options, ResponseBodyException };

export type RequestBody = {
	destinations: Destination[];
};

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: {
			inserted: number;
		};
	};
};
