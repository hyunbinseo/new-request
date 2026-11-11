// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { DestinationsInput } from '#bizgo/v1/reservation/types.ts';
import type {
	Destination,
	DestinationResult,
	Options,
	ResponseBodyException,
	ResultBody,
} from '#bizgo/v1/types.ts';

export type { Destination, Options, ResponseBodyException };

export type RequestBody = DestinationsInput<Destination>;

export type ResponseBody = ResultBody<{ destinations: DestinationResult[] }>;
