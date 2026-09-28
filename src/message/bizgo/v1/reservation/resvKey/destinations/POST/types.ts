// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type {
	Common,
	Destination,
	DestinationResult,
	Options,
	ResponseBodyException,
} from '#bizgo/v1/types.ts';

export type { Destination, Options, ResponseBodyException };

export type RequestBody = {
	/** 1–1000 */
	destinations: Destination[];
};

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: {
			destinations: DestinationResult[];
		};
	};
};
