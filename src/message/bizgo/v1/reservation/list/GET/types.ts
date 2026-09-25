// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

import type {
	Common,
	Options,
	Reservation,
	ResponseBodyException,
} from '#bizgo/v1/reservation/types.ts';

export type { Options, ResponseBodyException };

export type Query = {
	/**
	 * Uses KST (Asia/Seoul).
	 * The docs claim month/day/time granularity is accepted (e.g. `2026-05`, `2026-05-01`,
	 * `2026-05-01 10:00:00`), but live sandbox testing only accepted a full timestamp
	 * (`2026-05-01 10:00:00`) — month/day-only values returned A213 "Invalid or empty".
	 * This is not an exact-match filter: the list returns reservations *at or after* this
	 * timestamp, capped by `limit`. Confirmed by Bizgo.
	 * See https://community.bizgo.io/t/api/237/4
	 */
	resvSendTime: string;
	paymentCode?: string;
	lastSeq?: number;
	/**
	 * Page size, `min: 1`, `max: 1000`. Omitting it defaults to 100 — Bizgo confirmed this
	 * default directly, since the API reference documents only the min/max, not the default.
	 * See https://community.bizgo.io/t/api/237/6
	 * Live testing: `max` is enforced (1001 → A213), but `min` is not — `limit: 0` returns an
	 * empty page (`hasNext: true`) rather than an error, and a negative value fails as A010.
	 */
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
