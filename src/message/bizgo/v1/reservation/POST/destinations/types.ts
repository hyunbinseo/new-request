// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Common, Destination } from '#bizgo/reservation';

export type { Destination };

export type Options = {
	apiKey: string;
	baseURL?:
		| 'https://mars.ibapi.kr' // Production
		| 'https://sandbox-mars.ibapi.kr'; // Sandbox
	fetch?: typeof fetch;
};

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

export type ResponseBodyException = {
	common: Common;
	data: {
		code: string;
		result: string;
	};
};
