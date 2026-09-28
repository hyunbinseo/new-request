import type { FetchOptions } from '#lib/fetch.ts';

// See https://developers.zoom.us/docs/internal-apps/s2s-oauth/

export type Options = FetchOptions & {
	clientId: string;
	clientSecret: string;
};

export type RequestBody = {
	account_id: string;
};

export type ResponseBody200 = {
	access_token: string;
	token_type: 'bearer';
	/** In seconds (e.g. `3599`) */
	expires_in: number;
	/** Space-separated */
	scope: string;
	/** Regional (e.g. `https://api-us.zoom.us`), not always `https://api.zoom.us` */
	api_url: string;
};

// See https://developers.zoom.us/docs/integrations/oauth/#error-responses
/**
 * - Invalid `clientId` or `clientSecret` is rejected with 400 `invalid_client`, not 401
 * - Invalid `account_id` is rejected with 400 `invalid_request`
 */
export type ResponseBody4xx = {
	error: string; // 'invalid_client' | 'invalid_request'
	reason: string; // 'Invalid client_id or client_secret' | 'Bad Request'
};
