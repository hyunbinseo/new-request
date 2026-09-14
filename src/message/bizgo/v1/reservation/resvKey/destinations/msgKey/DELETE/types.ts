import type { Common } from '#bizgo/reservation';

export type Options = {
	apiKey: string;
	baseURL?:
		| 'https://mars.ibapi.kr' // Production
		| 'https://sandbox-mars.ibapi.kr'; // Sandbox
	fetch?: typeof fetch;
};

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
	};
};

export type ResponseBodyException = {
	common: Common;
	data: {
		code: string;
		result: string;
	};
};
