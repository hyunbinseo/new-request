import type { InternationalMessage } from './international.ts';
import type {
	AlimtalkMessage,
	AlimtalkMessageRegular,
	AlimtalkMessageTemplate,
} from './kakao/alimtalk.ts';
import type {
	BrandMessage,
	BrandMessageBasic,
	BrandMessageFree,
	BrandMessageTemplate,
} from './kakao/brandmessage.ts';
import type { MmsMessage, MmsMessageImage, MmsMessageLong } from './mms.ts';
import type { NaverTalkMessage } from './navertalk.ts';
import type { RcsMessage, RcsReservationMessage } from './rcs.ts';
import type { SmsMessage } from './sms.ts';

export type {
	AlimtalkMessage,
	AlimtalkMessageRegular,
	AlimtalkMessageTemplate,
	BrandMessage,
	BrandMessageBasic,
	BrandMessageFree,
	BrandMessageTemplate,
	InternationalMessage,
	MmsMessage,
	MmsMessageImage,
	MmsMessageLong,
	NaverTalkMessage,
	RcsMessage,
	RcsReservationMessage,
	SmsMessage,
};

export type NonTemplateMessageFlowItem =
	| { sms: SmsMessage }
	| { mms: MmsMessage }
	| { rcs: RcsMessage }
	| { alimtalk: AlimtalkMessageRegular }
	| { brandmessage: BrandMessageBasic | BrandMessageFree }
	| { navertalk: NaverTalkMessage }
	| { international: InternationalMessage };

// `sendType: 'template'` fills the registered template with each destination's `replaceWords`.
// Other items may also have a `templateCode`, but their content is sent in the request.
export type TemplateMessageFlowItem =
	| { alimtalk: AlimtalkMessageTemplate }
	| { brandmessage: BrandMessageTemplate };

export type MessageFlowItem = NonTemplateMessageFlowItem | TemplateMessageFlowItem;
