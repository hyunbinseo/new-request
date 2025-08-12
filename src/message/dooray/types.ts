// Reference https://helpdesk.dooray.com/share/pages/9wWo-xwiR66BO5LGshgVTg/2900079668515933969
// Reference https://helpdesk.dooray.com/share/pages/9wWo-xwiR66BO5LGshgVTg/2900079844453730084

export type Options = {
	url: string;
	fetch?: typeof fetch;
};

export type RequestBody = {
	botName: string;
	botIconImage?: `https://${string}`;
	text: string;
	attachments?: Array<
		Partial<{
			title: string;
			titleLink: `https://${string}`;
			text: string;
			color: string;
		}>
	>;
};
