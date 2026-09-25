import type { PRODUCTION_BASE_URL, SANDBOX_BASE_URL } from '#bizgo/v1/constants.ts';
import type { FetchOptions } from '#lib/fetch.ts';

export type Options = FetchOptions & {
	apiKey: string;
	baseURL?: typeof PRODUCTION_BASE_URL | typeof SANDBOX_BASE_URL;
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
