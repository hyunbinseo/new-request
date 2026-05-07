// See https://developers.bizgo.io/api-sdk/api-reference/comm/kakao-alimtalk

type KakaoLink = {
	urlPc: string;
	urlMobile: string;
	schemeAndroid?: string;
	schemeIos?: string;
};

type AlimtalkButton = {
	type: string;
	name: string;
	urlPc?: string;
	urlMobile?: string;
	schemeIos?: string;
	schemeAndroid?: string;
	target?: string;
	chatExtra?: string;
	chatEvent?: string;
	pluginId?: string;
	relayId?: string;
	oneclickId?: string;
	productId?: string;
	bizFormKey?: string;
	bizFormId?: number;
	telNumber?: string;
};

export type AlimtalkMessage = {
	msgType: 'AT' | 'AI';
	senderKey: string;
	templateCode: string;
	responseMethod?: string;
	timeout?: string;
	text: string;
	title?: string;
	header?: string;
	link?: KakaoLink;
	attachment?: {
		button?: AlimtalkButton[];
		item?: {
			list?: { title: string; description: string }[];
			summary?: { title: string; description: string };
			itemHighlight?: { title: string; description: string };
		};
		supplement?: {
			quickReply?: {
				type: string;
				name: string;
				urlPc?: string;
				urlMobile?: string;
				schemeIos?: string;
				schemeAndroid?: string;
				chatExtra?: string;
				chatEvent?: string;
				bizFormId?: number;
			}[];
		};
	};
	price?: string;
	currencyType?: string;
	paymentCode?: string;
	groupKey?: string;
	idempotencyKey?: string;
	idempotencyTtl?: number;
	ref?: string;
};
