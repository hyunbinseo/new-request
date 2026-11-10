// See https://developers.bizgo.io/api-sdk/api-reference/comm/rcs

type RcsButtonAction = {
	urlAction?: { openUrl: { url: string } };
	dialerAction?: { dialPhoneNumber: { phoneNumber: string } };
	mapAction?: {
		showLocation: {
			location: { latitude: number; longitude: number; label?: number; query: string };
			fallbackUrl?: string;
		};
		requestLocationPush?: Record<string, unknown>;
	};
	calendarAction?: {
		createCalendarEvent: {
			startTime: string;
			endTime: string;
			title: string;
			description?: string;
		};
	};
	composeAction?: RcsComposeAction;
};

// Either a text or a recording message, not both.
type RcsComposeAction =
	| {
			composeTextMessage: { phoneNumber: string; text?: string };
			composeRecordingMessage?: never;
	  }
	| {
			composeTextMessage?: never;
			composeRecordingMessage: { phoneNumber: string; type: 'VIDEO' | 'AUDIO' };
	  };

type RcsSuggestion = {
	displayText: string;
	action?: RcsButtonAction;
};

// Reservations don't take `copyAllowed`, `header`, or `footer`, which `RcsMessage` adds.
export type RcsReservationMessage = {
	from: string;
	body: {
		title?: string;
		description?: string;
		media?: string;
	};
	buttons?: { suggestions?: RcsSuggestion[] }[];
	formatId: string;
	brandKey: string;
	brandId?: string;
	groupId?: string;
	expiryOption?: string;
	agencyId?: string;
	agencyKey?: string;
	ttl?: string;
};

export type RcsMessage = RcsReservationMessage & {
	copyAllowed?: string;
	header?: string;
	footer?: string;
};
