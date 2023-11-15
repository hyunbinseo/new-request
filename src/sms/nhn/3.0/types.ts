export type Options = {
	env: { appKey: string; secretKey: string };
	type: 'auth/sms' | 'sms' | 'mms' | 'ad-sms' | 'ad-mms';
	fetch?: Fetch;
};
