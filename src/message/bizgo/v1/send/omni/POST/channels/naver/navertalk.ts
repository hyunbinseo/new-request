// See https://developers.bizgo.io/api-sdk/api-reference/comm/naver-talktalk

export type NaverTalkMessage = {
	partnerKey: string;
	templateCode: string;
	productCode: string;
	userName?: string;
	text?: string;
	templateParams?: Record<string, string>;
	attachments?: { imageUrl?: string; imageHashId?: string };
	buttons?: {
		buttonCode: string;
		mobileUrl?: string;
		pcUrl?: string;
		aOsAppScheme?: string;
		iOsAppScheme?: string;
	}[];
	gift?: {
		code: string;
		imageUrl: string;
		endDate: string;
		name?: string;
		publisher?: string;
		couponDescription?: string;
		label?: string;
		value?: string;
	};
};
