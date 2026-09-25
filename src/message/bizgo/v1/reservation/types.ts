// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Common } from '#bizgo/v1/types.ts';

export type ResvSendTimeInput = {
	/**
	 * - `yyyy-MM-dd HH:mm:ss` in KST (e.g. `2026-05-01 10:00:00`)
	 * - 10 minutes (`A316`/`A823`) to 1 year (`A331`) ahead
	 */
	resvSendTime: string;
};

export type Reservation = {
	seq: number;
	resvKey: string;
	paymentCode?: string;
	resvName?: string;
	productType: string;
	status: string;
	adYn: string;
	/** `yyyy-MM-ddTHH:mm:ss+09:00` */
	resvSendTime: string;
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

export type ReservationResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: Reservation;
	};
};
