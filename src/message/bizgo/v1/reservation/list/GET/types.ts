// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Common, Reservation } from '#bizgo/reservation';

export type Options = {
	apiKey: string;
	baseURL?:
		| 'https://mars.ibapi.kr' // Production
		| 'https://sandbox-mars.ibapi.kr'; // Sandbox
	fetch?: typeof fetch;
};

export type Query = {
	/**
	 * Uses KST (Asia/Seoul).
	 * The docs claim month/day/time granularity is accepted (e.g. `2026-05`, `2026-05-01`,
	 * `2026-05-01 10:00:00`), but live sandbox testing only accepted a full timestamp
	 * (`2026-05-01 10:00:00`) — month/day-only values returned A213 "Invalid or empty".
	 */
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
