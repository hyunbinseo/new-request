# new-request

Type-safe wrappers for third-party REST APIs.

Supports [Twilio], [SendGrid], [Postmark], and more. [Show all](#services)

[Twilio]: https://www.twilio.com/
[SendGrid]: https://sendgrid.com/
[Postmark]: https://postmarkapp.com/

```ts
// before - nothing is typed
await fetch('https://api.sendgrid.com/v3/mail/send', {
	method: 'POST',
	headers: {
		'Authorization': `Bearer secret`,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(body),
});

// after - fully typed request and response
await sendEmail(body, { apiKey: 'secret' });
```

## Features

- **Type Safety**: Fully typed request and response bodies
- **Zero Overhead**: Primarily types with minimal runtime code
- **Easy Migration**: Uses each API's native request body format
- **Explicit Errors**: Type-safe responses without `try...catch`
- **Fetch API**: Built on the Fetch API with override support

## Installation

```shell
npm install new-request
```

## Usage

All modules follow a consistent pattern:

```ts
const response = await moduleName(requestBody, options);

// Response types are automatically narrowed
if (response.ok) response.body; // success type
if (!response.ok) response.body; // error type
```

## Example

Sending an email with the [SendGrid API](https://www.twilio.com/docs/sendgrid/api-reference/mail-send/mail-send):

```ts
import { sendEmail, type Options } from 'new-request/email/send-grid/v3/POST';

// Options can be modularized and exported
const options: Options = {
	apiKey: 'SG.your_api_key_here',
	from: { email: 'sender@example.com' },
};

const response = await sendEmail(
	{
		// Request body matches the SendGrid API for easy migration
		// https://www.twilio.com/docs/sendgrid/api-reference/mail-send
		personalizations: [{ to: [{ email: 'recipient@example.com' }] }],
		subject: 'Hello World',
		content: [{ type: 'text/plain', value: 'Email body' }],
		from: { email: 'sender@example.com' }, // optional override
	},
	options,
);

if (response instanceof Error) {
	// Network error or fetch failure
	console.error('Request failed:', response.message);
	return;
}

if (!response.ok) {
	response.status; // 400 | 401 | 403 | 404 | 413 | 500
	if (response.status !== 500) response.body; // 4xx error details
	if (response.status === 500) response.body; // 5xx error details
	return;
}

response.status; // 202 Accepted
```

## Services

### Email

- [SendGrid](https://sendgrid.com/)
- [Postmark](https://postmarkapp.com/)

<!-- Resend's official Node.js SDK uses the Fetch API. -->

```ts
import { sendEmail } from 'new-request/email/postmark/POST';
import { sendEmail } from 'new-request/email/send-grid/v3/POST';
```

### Message (Web Hook, Push, etc.)

- [Pushover](https://pushover.net/)
- [비즈고](https://developers.bizgo.io/) (문자, RCS, 카카오 비즈메시지, 네이버 톡톡)
- [NHN Dooray! 두레이 메신저 웹 훅](https://helpdesk.dooray.com/share/pages/9wWo-xwiR66BO5LGshgVTg/2900079421986850197)

```ts
import { sendMessage } from 'new-request/message/bizgo/v1/send/omni/POST';
import { sendMessage } from 'new-request/message/dooray/POST';
import { pushMessage } from 'new-request/message/pushover/1/POST';
```

### SMS

- [Twilio](https://www.twilio.com/en-us/messaging/channels/sms)
- [NHN Cloud Notification](https://docs.nhncloud.com/ko/Notification/SMS/ko/Overview/)

```ts
import { sendSms } from 'new-request/sms/nhn/v3.0/POST';
import { sendSms } from 'new-request/sms/twilio/2010-04-01/POST';
```

### TTS

- [CLOVA Voice](https://www.ncloud.com/product/aiService/clovaVoice)

```ts
import { textToSpeech } from 'new-request/tts/naver/v1/POST';
```
