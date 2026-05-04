import type { SmsContent, EmailContent, RcsContent, PushContent } from '../../types.ts';

// See https://docs.nhncloud.com/ko/Notification/Notification%20Hub/ko/api-guide-v1x0/message/#_3

export type Options = {
	appKey: string;
	accessToken: string;
	messagePurpose: string;
	fetch?: typeof fetch;
};

type ContactType =
	| 'PHONE_NUMBER'
	| 'EMAIL_ADDRESS'
	| 'TOKEN_ADM'
	| 'TOKEN_FCM'
	| 'TOKEN_APNS'
	| 'TOKEN_APNS_SANDBOX'
	| 'TOKEN_APNS_SANDBOX_VOIP'
	| 'TOKEN_APNS_VOIP';

type MessageChannel =
	| 'SMS' //
	| 'ALIMTALK'
	| 'EMAIL'
	| 'RCS'
	| 'PUSH';

type Contact = {
	contactType: ContactType;
	contact: string;
	clientReference?: string;
};

type Recipient = {
	contacts: Array<Contact>;
	templateParameters?: Record<string, string>;
};

type FlowStep =
	| {
			messageChannel: 'SMS';
			// TODO Check if senders are optional
			sender: { senderPhoneNumber: string };
			content: SmsContent;
	  }
	| {
			messageChannel: 'RCS';
			sender: { brandId: string; chatbotId: string };
			content: RcsContent;
			options?: { expiryOption?: number; groupId?: string };
	  }
	| {
			messageChannel: 'EMAIL';
			sender: { senderMailAddress: string };
			content: EmailContent;
	  }
	| {
			messageChannel: 'ALIMTALK';
			sender: { senderKey: string; senderProfileType: 'GROUP' | 'NORMAL' };
	  }
	| {
			messageChannel: 'PUSH';
			content: PushContent;
	  };

type FlowStepWithNextSteps = FlowStep & { nextSteps: Array<{ messageChannel: MessageChannel }> };

export type RequestBody = {
	statsKeyId?: string;
	// 등록한 플로우를 이용해 메시지를 발송합니다.
	// 플로우를 등록하지 않았다면, 플로우를 등록하고 발송해야 합니다.
	flowId?: string; // TODO Check if this is required
	scheduledDateTime?: string; // e.g. 2024-10-29T06:00:01.000+09:00
	confirmBeforeSend?: boolean;
	templateParameters?: Record<string, string>;
} & (
	| { recipients: Array<Recipient>; id?: never } // 단건 수신자
	| { recipients?: never; id: string } // 대량/그룹 수신자
) & { flow?: { steps: [...FlowStepWithNextSteps[], FlowStep] } };

export type ResponseBody = {
	header: {
		isSuccessful: boolean;
		resultCode: number;
		resultMessage: string;
	};
	messageId: string;
};
