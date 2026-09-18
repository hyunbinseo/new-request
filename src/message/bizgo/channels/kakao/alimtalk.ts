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

type AlimtalkMessageBase = {
	senderKey: string;
	templateCode: string;
	responseMethod?: string;
	timeout?: string;
	price?: string;
	currencyType?: string;
};

type AlimtalkMessageRegular = AlimtalkMessageBase & {
	msgType: 'AT' | 'AI';
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
	sendType?: never;
};

type AlimtalkMessageTemplate = AlimtalkMessageBase & { sendType: 'template' };

export type AlimtalkMessage = AlimtalkMessageRegular | AlimtalkMessageTemplate;
