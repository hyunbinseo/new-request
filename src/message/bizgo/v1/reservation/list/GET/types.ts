import type { Common, Reservation } from '#bizgo/reservation';

export type Options = {
	apiKey: string;
	baseURL?:
		| 'https://mars.ibapi.kr' // Production
		| 'https://sandbox-mars.ibapi.kr'; // Sandbox
	fetch?: typeof fetch;
};

export type Query = {
	/** e.g. `2026-05`, `2026-05-01`, `2026-05-01 10:00:00` */
	resvSendTime: string;
	paymentCode?: string;
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
			reservations: Reservation[];
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
