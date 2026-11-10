// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Options, ResponseBodyException } from '#bizgo/v1/types.ts';

export type { Options, ResponseBodyException };

// No `data.data`, so the success and error bodies share a shape.
export type ResponseBody = ResponseBodyException;
