type Email = {
	email: string;
	name?: string;
};

export type Options = {
	apiKey: string;
	from: Email;
	fetch?: typeof fetch;
};

// Reference https://docs.sendgrid.com/for-developers/sending-email/personalizations
type Personalization = { to: Array<Email> } & Partial<{
	cc: Array<Email>;
	bcc: Array<Email>;
	from: Email;
	subject: string;
	headers: Record<string, string>;
	// substitutions
	// custom_args
	send_at: number;
}>;

// Reference https://docs.sendgrid.com/api-reference/mail-send/mail-send
export type RequestBody = {
	personalizations: Array<Personalization>;
	from?: Email;
	subject: string;
	content: Array<{
		type: 'text/plain' | 'text/html';
		value: string;
	}>;
} & Partial<{
	reply_to: Email;
	reply_to_list: Array<Email>;
	attachments: Array<
		{
			content: string;
			filename: string;
		} & Partial<{
			type: string;
			disposition: 'inline' | 'attachment';
		}>
	>;
	template_id: string;
	headers: Record<string, string>;
	categories: Array<string>;
	custom_args: string;
	send_at: number;
	batch_id: string;
	asm: {
		group_id: number;
		groups_to_display?: Array<number>;
	};
	ip_pool_name: string;
	// mail_settings
	// tracking_settings
}>;

// Reference https://docs.sendgrid.com/api-reference/mail-send/mail-send
export type ResponseBody4xx = {
	errors: Array<{
		message: string;
		field?: string | null;
		help?: Record<string, unknown>;
	}>;
	id?: string;
};

// Reference https://docs.sendgrid.com/api-reference/mail-send/mail-send
export type ResponseBody5xx = { errors: Array<{ message?: string }> };
