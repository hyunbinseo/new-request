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

type BrandMessageBase<SendType extends 'basic' | 'template' | 'free'> = {
	sendType: SendType;
	senderKey: string;
	pushAlarm?: 'Y' | 'N';
	originCID?: string;
	unsubscribePhoneNumber?: string;
	unsubscribeAuthNumber?: string;
};

type BrandMessageContent<SendType extends 'basic' | 'free'> = BrandMessageBase<SendType> & {
	msgType: string;
	text?: string;
	header?: string;
	/** `msgType: 'FG'` only */
	headerDescription?: string;
	additionalContent?: string;
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
			regularPriceName?: string;
			discountPriceName?: string;
			discountRateName?: string;
			discountFixedName?: string;
		};
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
				image?: { imgUrl: string; imgLink?: string };
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
					regularPriceName?: string;
					discountPriceName?: string;
					discountRateName?: string;
					discountFixedName?: string;
				};
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

export type BrandMessageBasic = BrandMessageContent<'basic'> & {
	templateCode: string;
	targeting: string;
	messageVariable?: Record<string, unknown>;
	buttonVariable?: Record<string, unknown>;
	couponVariable?: Record<string, unknown>;
	imageVariable?: Record<string, unknown>;
	videoVariable?: Record<string, unknown>;
	commerceVariable?: Record<string, unknown>;
	carouselVariable?: {
		messageVariable?: Record<string, unknown>;
		buttonVariable?: Record<string, unknown>;
		couponVariable?: Record<string, unknown>;
		imageVariable?: Record<string, unknown>;
		commerceVariable?: Record<string, unknown>;
	}[];
	/** `msgType: 'FG'` only */
	catalogVariable?: {
		messageVariable?: Record<string, unknown>;
		commerceVariable?: Record<string, unknown>;
		imageVariable?: Record<string, unknown>;
	}[];
};

export type BrandMessageTemplate = BrandMessageBase<'template'> & {
	templateCode: string;
	targeting: string;
};

export type BrandMessageFree = BrandMessageContent<'free'> & {
	targeting?: string;
	groupTagKey?: string;
	adult?: 'Y' | 'N';
	adFlag?: 'Y' | 'N';
};

export type BrandMessage =
	| BrandMessageBasic //
	| BrandMessageTemplate
	| BrandMessageFree;
