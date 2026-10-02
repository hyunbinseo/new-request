# new-request

Type-safe wrappers for third-party REST APIs.

Supports [Twilio], [Postmark], and more. [Show all](#services)

[Twilio]: https://www.twilio.com/
[Postmark]: https://postmarkapp.com/

```ts
// before - nothing is typed
await fetch('https://api.postmarkapp.com/email', {
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'X-Postmark-Server-Token': 'secret',
	},
	body: JSON.stringify(body),
});

// after - fully typed request and response
await sendEmail(body, { serverToken: 'secret', from: 'sender@example.com' });
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

// Failures are returned, not thrown
if (response instanceof Error) return; // network error, etc.

// Response types are automatically narrowed
if (response.ok) response; // success type
if (!response.ok) response; // error type
```

## Example

Sending an email with the [Postmark API](https://postmarkapp.com/developer/api/email-api):

```ts
import { sendEmail, type Options } from 'new-request/email/postmark/POST';

// Options can be modularized and exported
const options: Options = {
	serverToken: 'your_server_token_here',
	from: 'sender@example.com',
};

const response = await sendEmail(
	{
		// Request body matches the Postmark API for easy migration
		// https://postmarkapp.com/developer/api/email-api
		To: 'recipient@example.com',
		Subject: 'Hello World',
		TextBody: 'Email body',
		From: 'sender@example.com', // optional override
	},
	options,
);

if (response instanceof Error) {
	// Network error, unparsable body, etc.
	console.error('Request failed:', response.message);
	return;
}

if (!response.ok) {
	response.status; // 401 | 404 | 413 | 415 | 422 | 429 | 500 | 503
	response.body.ErrorCode; // Postmark error code
	return;
}

response.body.MessageID; // 200 OK
```

## Services

> [!NOTE]
> 나이스 교육정보 개방 포털 학교기본정보 was removed. Use [`neis-school-info`](https://github.com/hyunbinseo/neis-school-info) instead.

### Email

- [Postmark](https://postmarkapp.com/)

<!-- Resend's official Node.js SDK uses the Fetch API. -->

```ts
import { sendEmail } from 'new-request/email/postmark/POST';
```

### Message (Web Hook, Push, etc.)

- [Pushover](https://pushover.net/)
- [비즈고](https://developers.bizgo.io/) (문자, RCS, 카카오 비즈메시지, 네이버 톡톡, 국제메시지)
- [NHN Dooray! 두레이 메신저 웹 훅](https://helpdesk.dooray.com/share/pages/9wWo-xwiR66BO5LGshgVTg/2900079421986850197)

```ts
import { sendMessage } from 'new-request/message/bizgo/v1/send/omni/POST';
import { sendMessage } from 'new-request/message/dooray/POST';
import { pushMessage } from 'new-request/message/pushover/1/POST';
```

See [비즈고 예약 메시지](docs/비즈고-예약-메시지.md) for the reservation endpoints.

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
