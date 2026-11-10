import type {
	AlimtalkMessage,
	BrandMessage,
	InternationalMessage,
	MessageFlowItem,
	MmsMessage,
	NaverTalkMessage,
	NonTemplateMessageFlowItem,
	RcsMessage,
	SmsMessage,
} from '#bizgo/v1/channels/index.ts';
import type {
	DestinationResult,
	MessageFlowDestination,
	Options,
	ResponseBodyException,
	ResultBody,
} from '#bizgo/v1/types.ts';

export type {
	AlimtalkMessage, //
	BrandMessage,
	InternationalMessage,
	MmsMessage,
	NaverTalkMessage,
	Options,
	RcsMessage,
	ResponseBodyException,
	SmsMessage,
};

type RequestBodyBase<Recipient, Item> = {
	/**
	 * - 1–1000 (docs recommend 200)
	 * - Over 1000 is rejected with `A318`
	 */
	destinations: Recipient[];
	messageFlow: Item[];
	groupKey?: string;
	idempotencyKey?: string;
	idempotencyTtl?: number;
	ref?: string;
};

type NonTemplateRequestBody = RequestBodyBase<MessageFlowDestination, NonTemplateMessageFlowItem>;

// Template substitution fills each destination's `replaceWords`, so they're required.
export type TemplateRequestBody = RequestBodyBase<
	MessageFlowDestination & { replaceWords: Record<string, string> },
	MessageFlowItem
>;

export type RequestBody = NonTemplateRequestBody | TemplateRequestBody;

export type ResponseBody = ResultBody<
	{ destinations: (DestinationResult & { ref?: string })[] },
	{ ref?: string }
>;
