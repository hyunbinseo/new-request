// Reference https://pushover.net/api

export type Options = {
	token: string;
	user: string;
	filename?: string;
	fetch?: typeof fetch;
};

type Sound =
	| 'pushover'
	| 'bike'
	| 'bugle'
	| 'cashregister'
	| 'classical'
	| 'cosmic'
	| 'falling'
	| 'gamelan'
	| 'incoming'
	| 'intermission'
	| 'magic'
	| 'mechanical'
	| 'pianobar'
	| 'siren'
	| 'spacealarm'
	| 'tugboat'
	| 'alien'
	| 'climb'
	| 'persistent'
	| 'echo'
	| 'updown'
	| 'vibrate'
	| 'none'
	| (string & {});

type Image =
	| 'image/avif'
	| 'image/bmp'
	| 'image/gif'
	| 'image/heic'
	| 'image/jpeg'
	| 'image/png'
	| 'image/svg+xml'
	| 'image/tiff'
	| 'image/webp'
	| (`image/${string}` & {});

type Attachment =
	| {
			attachment: File | Blob;
			attachment_type: Image;
	  }
	| {
			attachment?: never;
			attachment_type?: never;
	  };

type Url =
	| { url: string; url_title?: string } //
	| { url?: never; url_title?: never };

export type RequestBody = { message: string } & (Attachment & Url) &
	Partial<{
		device: string;
		html: 0 | 1;
		priority: -2 | -1 | 0 | 1 | 2;
		sound: Sound;
		timestamp: number;
		title: string;
		ttl: number;
	}>;

export type ResponseBody200 = {
	status: 1;
	request: string;
	receipt?: string;
};

export type ResponseBody4xx = {
	status: number; // something other than 1
	request: string;
	errors: string[];
};
