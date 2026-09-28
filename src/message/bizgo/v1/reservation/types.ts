// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type { Common, Destination } from '#bizgo/v1/types.ts';

export type ResvSendTimeInput = {
	/**
	 * - `yyyy-MM-dd HH:mm:ss` in KST (e.g. `2026-05-01 10:00:00`)
	 * - `yyyy-MM-ddTHH:mm:ss` is rejected with `A315` on create
	 * - 10 minutes to 1 year ahead
	 * - Sooner is rejected with `A316` on create and `A823` on update, and later with `A331`
	 */
	resvSendTime: string;
};

export type Reservation = {
	seq: number;
	resvKey: string;
	paymentCode?: string;
	resvName?: string;
	productType: string;
	status: 'PENDING' | 'PROCESSING' | 'STOPPED' | 'CANCELLED' | 'COMPLETED';
	adYn: 'Y' | 'N';
	/** `yyyy-MM-ddTHH:mm:ss+09:00` */
	resvSendTime: string;
	resvData?: string;
	expectedCnt: number;
	sentCnt: number;
	successCnt: number;
	failCnt: number;
	/** `yyyy-MM-ddTHH:mm:ss+09:00` */
	updateDate: string;
	/** `yyyy-MM-ddTHH:mm:ss+09:00` */
	regDate: string;
};

export type ReservationDestination = {
	msgKey: string;
	destSeq: number;
	to: string;
	destData?: Destination;
	status?: string;
	responseCode?: string;
	responseText?: string;
};

export type ReservationResponseBody = {
	common: Common;
	data: {
		code: string;
		result: string;
		data: Reservation;
	};
};
