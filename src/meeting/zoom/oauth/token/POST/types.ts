import type { FetchOptions } from '#lib/fetch.ts';

// See https://developers.zoom.us/docs/internal-apps/s2s-oauth/

export type Options = FetchOptions & {
	accountId: string;
	clientId: string;
	clientSecret: string;
};

export type ResponseBody200 = {
	access_token: string;
	token_type: 'bearer';
	expires_in: number; // 3599
	scope: string; // space-separated
	// See https://developers.zoom.us/docs/api/using-zoom-apis/
	api_url: string; // 'https://api.zoom.us' | 'https://api-us.zoom.us' | ...
};

/**
 * Undocumented. Confirmed by integration tests:
 * - Invalid `clientId` or `clientSecret` is rejected with 400 `invalid_client`
 * - Invalid `accountId` is rejected with 400 `invalid_request`
 */
export type ResponseBody4xx = {
	error: string; // 'invalid_client' | 'invalid_request'
	reason: string; // 'Invalid client_id or client_secret' | 'Bad Request'
};
