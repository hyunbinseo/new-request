[CLOVA Voice]: https://www.ncloud.com/product/aiService/clovaVoice
[NEIS 학교 기본 정보]: https://open.neis.go.kr/portal/data/service/selectServicePage.do?infId=OPEN17020190531110010104913&infSeq=2
[NHN Cloud SMS]: https://docs.nhncloud.com/ko/Notification/SMS/ko/Overview/
[NHN Dooray!]: https://dooray.com/
[Postmark]: https://postmarkapp.com/
[Pushover]: https://pushover.net/
[SendGrid]: https://sendgrid.com/
[Twilio SMS]: https://www.twilio.com/

# new-request

Type-safe wrappers for third-party REST APIs.

Supports [Twilio SMS], [SendGrid], [Postmark], and more. [Show all](#services)

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

**Email:** [SendGrid], [Postmark]

<!-- Resend's official Node.js SDK uses the Fetch API. -->

```ts
import { sendEmail } from 'new-request/email/send-grid/v3/POST';
import { sendEmail } from 'new-request/email/postmark/POST';
```

**SMS:** [Twilio SMS], [NHN Cloud SMS]

```ts
import { sendSms } from 'new-request/sms/twilio/2010-04-01/POST';
import { sendSms } from 'new-request/sms/nhn/v3.0/POST';
```

**Message:** [Pushover], [NHN Dooray!]

```ts
import { pushMessage } from 'new-request/message/pushover/1';
import { sendMessage } from 'new-request/message/dooray';
```

**TTS:** [CLOVA Voice]

```ts
import { textToSpeech } from 'new-request/tts/naver/v1';
```

**Misc:** [NEIS 학교 기본 정보]

```ts
import { searchSchool } from 'new-request/misc/neis/info';
```
