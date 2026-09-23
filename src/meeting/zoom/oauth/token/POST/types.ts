// See https://developers.zoom.us/docs/internal-apps/s2s-oauth/

export type Options = {
	clientId: string;
	clientSecret: string;
	fetch?: typeof fetch;
};

export type RequestBody = {
	account_id: string;
};

export type ResponseBody200 = {
	access_token: string;
	token_type: 'bearer';
	expires_in: number; // 3599
	scope: string; // space-separated
	api_url: string; // 'https://api.zoom.us'
};

// See https://developers.zoom.us/docs/integrations/oauth/#error-responses
export type ResponseBody4xx = {
	error: string; // 'invalid_client'
	reason: string; // 'Invalid client_id or client_secret'
};
