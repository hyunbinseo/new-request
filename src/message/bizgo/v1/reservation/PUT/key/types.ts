// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Common, Reservation } from '#bizgo/reservation';

export type Options = {
	apiKey: string;
	baseURL?:
		| 'https://mars.ibapi.kr' // Production
		| 'https://sandbox-mars.ibapi.kr'; // Sandbox
	fetch?: typeof fetch;
};

export type RequestBody = {
	/**
	 * Uses KST (Asia/Seoul), e.g. `2026-05-01 10:00:00`.
	 * Must be at least 10 minutes and at most 1 year from now.
	 * See https://community.bizgo.io/t/topic/91/3
	 */
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
