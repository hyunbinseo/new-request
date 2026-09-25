// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Common, Destination, Options, ResponseBodyException } from '#bizgo/v1/types.ts';

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
			/** Registration results, not delivery results. */
			destinations: {
				to: string;
				msgKey: string;
				code: string;
				result: string;
			}[];
		};
	};
};
