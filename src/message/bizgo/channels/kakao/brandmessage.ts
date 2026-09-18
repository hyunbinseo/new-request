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

// MAYBE split into a discriminated union based on `sendType`
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
	originCID?: string;
	unsubscribePhoneNumber?: string;
	unsubscribeAuthNumber?: string;
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
};
