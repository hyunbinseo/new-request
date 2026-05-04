// See https://docs.nhncloud.com/ko/Notification/Notification%20Hub/ko/api-guide-v1x0/message

export type SmsContent = {
	messageType: 'SMS' | 'LMS' | 'MMS';
	title?: string;
	body: string;
	attachmentIds?: Array<string>;
};

export type EmailContent = {
	title: string;
	body: string;
	attachmentIds?: Array<string>;
};

type RcsButtonType =
	| 'COMPOSE'
	| 'CLIPBOARD'
	| 'DIALER'
	| 'MAP_SHOW'
	| 'MAP_QUERY'
	| 'MAP_SHARE'
	| 'URL'
	| 'CALENDAR';

type RcsButton = {
	buttonType: RcsButtonType;
	buttonJson?: Record<string, unknown>;
};

type RcsCard = {
	title?: string;
	description?: string;
	attachmentId?: string;
	mTitle?: string;
	mTitleMedia?: string;
	title1?: string;
	title2?: string;
	title3?: string;
	description1?: string;
	description2?: string;
	description3?: string;
	buttons?: Array<RcsButton>;
};

export type RcsContent = {
	messageType?: 'SMS' | 'LMS' | 'MMS' | 'RBC_TEMPLATE';
	title?: string;
	body?: string;
	smsType?: 'STANDALONE' | 'UNIFIED_STANDALONE';
	lmsType?:
		| 'STANDALONE'
		| 'FORMAT_BASIC'
		| 'FORMAT_TITLE_HIGHLIGHT'
		| 'FORMAT_PARAGRAPH'
		| 'UNIFIED_STANDALONE';
	mmsType?:
		| 'HORIZONTAL'
		| 'VERTICAL'
		| 'CAROUSEL_MEDIUM'
		| 'CAROUSEL_SMALL'
		| 'UNIFIED_HORIZONTAL'
		| 'UNIFIED_VERTICAL';
	messagebaseId?: string;
	unsubscribePhoneNumber?: string;
	cards?: Array<RcsCard>;
	buttons?: Array<RcsButton>;
};

type PushMedia = {
	sourceType: string;
	source?: string;
	mediaType?: string;
	extension?: string;
	expandable?: boolean;
};

export type PushContent = {
	title: string;
	body: string;
	unsubscribePhoneNumber?: string;
	unsubscribeGuide?: string;
	richMessage?: {
		buttons?: Array<{
			name: string;
			submitName?: string;
			buttonType: 'REPLY' | 'DEEP_LINK' | 'OPEN_APP' | 'OPEN_URL' | 'DISMISS';
			link?: string;
			hint?: string;
		}>;
		media?: PushMedia;
		androidMedia?: PushMedia;
		iosMedia?: PushMedia;
		largeIcon?: { sourceType: string; source: string };
		group?: { key: string; description?: string };
	};
	style?: { useHtmlStyle?: boolean };
};
