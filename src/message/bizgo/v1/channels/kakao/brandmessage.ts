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

type BrandMessageImage = { imgUrl: string; imgLink?: string };

type BrandMessageCoupon = {
	title: string;
	description: string;
	urlPc?: string;
	urlMobile?: string;
	schemeAndroid?: string;
	schemeIos?: string;
};

type BrandMessageCommerce = {
	title: string;
	regularPrice: number;
	discountPrice?: number;
	discountRate?: number;
	discountFixed?: number;
	regularPriceName?: string;
	discountPriceName?: string;
	discountRateName?: string;
	discountFixedName?: string;
};

type Variables = Record<string, unknown>;

type BrandMessageBase = {
	senderKey: string;
	pushAlarm?: 'Y' | 'N';
	originCID?: string;
	unsubscribePhoneNumber?: string;
	unsubscribeAuthNumber?: string;
};

type BrandMessageContent = {
	msgType: string;
	text?: string;
	header?: string;
	/** `msgType: 'FG'` only */
	headerDescription?: string;
	additionalContent?: string;
	attachment?: {
		button?: BrandMessageButton[];
		image?: BrandMessageImage;
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
		coupon?: BrandMessageCoupon;
		commerce?: BrandMessageCommerce;
		video?: { videoUrl: string; thumbnailUrl?: string };
		/** `msgType: 'FG'` only */
		catalog?: {
			list?: {
				type: string;
				imgUrl?: string;
				imgLink?: string;
				title?: string;
				description?: string;
				regularPrice?: number;
				discountPrice?: number;
				discountRate?: number;
				discountFixed?: number;
				regularPriceName?: string;
				discountPriceName?: string;
				regularPriceVariableName?: string;
				discountPriceVariableName?: string;
				discountRateVariableName?: string;
				discountFixedVariableName?: string;
			}[];
		};
	};
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
		list?: {
			header?: string;
			message?: string;
			additionalContent?: string;
			attachment?: {
				button?: BrandMessageButton[];
				image?: BrandMessageImage;
				coupon?: BrandMessageCoupon;
				commerce?: BrandMessageCommerce;
			};
		}[];
		tail?: {
			urlMobile: string;
			urlPc?: string;
			schemeIos?: string;
			schemeAndroid?: string;
		};
	};
};

export type BrandMessageBasic = BrandMessageBase &
	BrandMessageContent & {
		sendType: 'basic';
		templateCode: string;
		targeting: string;
		messageVariable?: Variables;
		buttonVariable?: Variables;
		couponVariable?: Variables;
		imageVariable?: Variables;
		videoVariable?: Variables;
		commerceVariable?: Variables;
		carouselVariable?: {
			messageVariable?: Variables;
			buttonVariable?: Variables;
			couponVariable?: Variables;
			imageVariable?: Variables;
			commerceVariable?: Variables;
		}[];
		/** `msgType: 'FG'` only */
		catalogVariable?: {
			messageVariable?: Variables;
			commerceVariable?: Variables;
			imageVariable?: Variables;
		}[];
	};

export type BrandMessageTemplate = BrandMessageBase & {
	sendType: 'template';
	templateCode: string;
	targeting: string;
};

export type BrandMessageFree = BrandMessageBase &
	BrandMessageContent & {
		sendType: 'free';
		targeting?: string;
		groupTagKey?: string;
		adult?: 'Y' | 'N';
		adFlag?: 'Y' | 'N';
	};

export type BrandMessage =
	| BrandMessageBasic //
	| BrandMessageTemplate
	| BrandMessageFree;
