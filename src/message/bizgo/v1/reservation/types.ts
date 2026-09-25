import type { FetchOptions } from '#lib/fetch.ts';

// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

export type Options = FetchOptions & {
	apiKey: string;
	baseURL: 'https://mars.ibapi.kr' | 'https://sandbox-mars.ibapi.kr'; // Production | Sandbox
};

export type Common = {
	authCode: string;
	authResult: string;
	infobankTrId: string;
};

export type ResponseBodyException = {
	common: Common;
	data: {
		code: string;
		result: string;
	};
};

export type Destination = {
	to: string;
	replaceWords?: Record<string, string>;
	ref?: string;
};

export type Reservation = {
	seq: number;
	resvKey: string;
	paymentCode?: string;
	resvName?: string;
	productType: string;
	status: string;
	adYn: string;
	/** Space-separated on write (KST), but returned as an ISO 8601 string with a +09:00 offset. */
	resvSendTime: string;
	/**
	 * A JSON-stringified copy of the original registration request body.
	 * Undocumented; confirmed by live testing. May be absent on some responses.
	 */
	resvData?: string;
	expectedCnt: number;
	sentCnt: number;
	successCnt: number;
	failCnt: number;
	updateDate: string;
	regDate: string;
};

export type ReservationDestination = {
	msgKey: string;
	destSeq: number;
	to: string;
	destData?: string;
	status: string;
	responseCode: string;
	responseText: string;
};
