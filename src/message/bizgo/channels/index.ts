import type { InternationalMessage } from './international.ts';
import type { AlimtalkMessage } from './kakao/alimtalk.ts';
import type { BrandMessage } from './kakao/brandmessage.ts';
import type { MmsMessage } from './mms.ts';
import type { NaverTalkMessage } from './navertalk.ts';
import type { RcsMessage } from './rcs.ts';
import type { SmsMessage } from './sms.ts';

export type {
	AlimtalkMessage, //
	BrandMessage,
	InternationalMessage,
	MmsMessage,
	NaverTalkMessage,
	RcsMessage,
	SmsMessage,
};

export type MessageFlowItem =
	| { sms: SmsMessage }
	| { mms: MmsMessage }
	| { rcs: RcsMessage }
	| { alimtalk: AlimtalkMessage }
	| { brandmessage: BrandMessage }
	| { navertalk: NaverTalkMessage }
	| { international: InternationalMessage };
