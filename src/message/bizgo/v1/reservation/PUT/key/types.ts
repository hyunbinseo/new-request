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
	 * Uses KST (Asia/Seoul), e.g. `2026-05-01 10:00:00`. A UTC string is not rejected —
	 * it's silently misinterpreted as KST, so the reservation fires at the wrong time.
	 * Must be at least 10 minutes and at most 1 year from now, or the API responds with
	 * an A316 error. Undocumented in the API reference; only mentioned in a Bizgo notice.
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
