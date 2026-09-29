// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { DestinationsInput } from '#bizgo/v1/reservation/types.ts';
import type {
	Common,
	Destination,
	DestinationResult,
	Options,
	ResponseBodyException,
} from '#bizgo/v1/types.ts';

export type { Destination, Options, ResponseBodyException };

export type RequestBody = DestinationsInput;

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
