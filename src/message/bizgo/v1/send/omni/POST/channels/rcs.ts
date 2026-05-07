// See https://developers.bizgo.io/api-sdk/api-reference/comm/rcs

type RcsButtonAction = {
	urlAction?: { openUrl: { url: string } };
	dialerAction?: { dialPhoneNumber: { phoneNumber: string } };
	mapAction?: {
		showLocation: {
			location: { latitude: number; longitude: number; label?: number };
			query: string;
			fallbackUrl?: string;
			requestLocationPush?: object;
		};
	};
	calendarAction?: {
		createCalendarEvent: {
			startTime: string;
			endTime: string;
			title: string;
			description?: string;
		};
	};
	composeAction?: {
		composeTextMessage?: { phoneNumber: string; text?: string };
		composeRecordingMessage?: { phoneNumber: string; type: 'VIDEO' | 'AUDIO' };
	};
};

type RcsButton = {
	displayText: string;
	action: RcsButtonAction;
};

export type RcsMessage = {
	from: string;
	body: {
		title?: string;
		description?: string;
		media?: string;
		buttons?: RcsButton[];
		suggestions?: RcsButton[];
	};
	formatId: string;
	brandKey: string;
	brandId?: string;
	groupId?: string;
	expiryOption?: string;
	agencyId?: string;
	agencyKey?: string;
	ttl?: string;
	paymentCode?: string;
	groupKey?: string;
	idempotencyKey?: string;
	idempotencyTtl?: number;
};
