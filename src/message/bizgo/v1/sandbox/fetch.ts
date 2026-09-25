import { setTimeout as wait } from 'node:timers/promises';
import { throttle } from 'node:util';
import { is, literal, object } from 'valibot';
import { SANDBOX_BASE_URL } from '#bizgo/v1/constants.ts';

// 기본 Rate Limit은 현재 기준 발송 API는 `200 TPS`,
// 그 외 관리·조회·리포트 등 비발송 API는 `5 TPS`로 적용됩니다.
// See https://developers.bizgo.io/api-sdk/api-reference#rate-limit
const throttledFetch = throttle(fetch, 4, 1000, { strict: true });

const RateLimitedSchema = object({ data: object({ code: literal('A020') }) });

// Retried on `A020`, in case other test files share the limit.
export const sandboxFetch: typeof fetch = async (input, init) => {
	for (let attempt = 0; ; attempt++) {
		const response = await throttledFetch(input instanceof Request ? input.clone() : input, init);

		const body: unknown = await response
			.clone()
			.json()
			.catch(() => undefined);

		if (!is(RateLimitedSchema, body) || attempt === 3) return response;

		await wait(1000);
	}
};

// The API key is shared with production, so `baseURL` must never be omitted.
export const sandboxOpts = { baseURL: SANDBOX_BASE_URL, fetch: sandboxFetch };
