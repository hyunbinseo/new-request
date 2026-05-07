// See https://developers.bizgo.io/api-sdk/api-reference/comm/kakao-brand

type BrandMessageButton = {
	type: string;
	name?: string;
	urlPc?: string;
	urlMobile?: string;
	schemeIos?: string;
	schemeAndroid?: string;
	chatExtra?: string;
	chatEvent?: string;
	bizFormKey?: string;
};

export type BrandMessage = {
	senderKey: string;
	sendType: 'basic' | 'template' | 'free';
	msgType: string;
	templateCode?: string;
	text?: string;
	targeting?: string;
	header?: string;
	additionalContent?: string;
	pushAlarm?: string;
	groupTagKey?: string;
	adult?: string;
	adFlag?: string;
	originCID?: string;
	unsubscribePhoneNumber?: string;
	unsubscribeAuthNumber?: string;
	paymentCode?: string;
	groupKey?: string;
	idempotencyKey?: string;
	idempotencyTtl?: number;
	messageVariable?: object;
	buttonVariable?: object;
	couponVariable?: object;
	imageVariable?: object;
	videoVariable?: object;
	commerceVariable?: object;
	carouselVariable?: object[];
	attachment?: {
		button?: BrandMessageButton[];
		image?: { imgUrl: string; imgLink?: string };
		item?: {
			list?: {
				title?: string;
				imgUrl?: string;
				urlMobile?: string;
				urlPc?: string;
				schemeIos?: string;
				schemeAndroid?: string;
			}[];
		};
		coupon?: {
			title: string;
			description: string;
			urlPc?: string;
			urlMobile?: string;
			schemeAndroid?: string;
			schemeIos?: string;
		};
		commerce?: {
			title: string;
			regularPrice: number;
			discountPrice?: number;
			discountRate?: number;
			discountFixed?: number;
		};
		video?: { videoUrl: string; thumbnailUrl?: string };
		carousel?: {
			head?: {
				header?: string;
				content?: string;
				imageUrl?: string;
				urlMobile?: string;
				urlPc?: string;
				schemeAndroid?: string;
				schemeIos?: string;
			};
			list?: object[];
			tail?: {
				urlMobile: string;
				urlPc?: string;
				schemeIos?: string;
				schemeAndroid?: string;
			};
		};
	};
};
