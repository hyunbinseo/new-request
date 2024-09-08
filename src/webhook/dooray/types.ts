// Reference https://helpdesk.dooray.com/share/pages/9wWo-xwiR66BO5LGshgVTg/2900079668515933969

export type Options = {
	url: `https://hook.dooray.com/services/${string}`;
	fetch?: Fetch;
};

export type RequestBody = {
	botName: string;
	botIconImage?: `https://${string}`;
	text: string;
};
