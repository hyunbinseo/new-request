import type { Common, Reservation } from '#bizgo/reservation';

export type Options = {
	apiKey: string;
	baseURL?:
		| 'https://mars.ibapi.kr' // Production
		| 'https://sandbox-mars.ibapi.kr'; // Sandbox
	fetch?: typeof fetch;
};

export type RequestBody = {
	/** e.g. `2026-05-01 10:00:00` */
	resvSendTime: string;
	resvName?: string;
};

export type ResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: Reservation;
	};
};

export type ResponseBodyException = {
	common: Common;
	data: {
		code: string;
		result: string;
	};
};
