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

type ResultStatus = {
	code: string;
	result: string;
};

export type ResponseBodyException = {
	common: Common;
	data: ResultStatus;
};

// Successful responses nest the payload in `data.data`, with extra fields (e.g. `resvKey`) beside it.
export type ResultBody<Data, Extra = {}> = {
	common: Common;
	data: ResultStatus & Extra & { data: Data };
};

export type DestinationResult = {
	to: string;
	msgKey: string;
	code: string;
	result: string;
};

export type Destination = {
	to: string;
	replaceWords?: Record<string, string>;
	ref?: string;
};

// For requests with `messageFlow`, where each recipient can opt out of fallback.
export type MessageFlowDestination = Destination & { fallbackFlag?: 'Y' | 'N' };
