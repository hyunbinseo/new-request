[CLOVA Voice]: https://www.ncloud.com/product/aiService/clovaVoice
[NEIS 학교 기본 정보]: https://open.neis.go.kr/portal/data/service/selectServicePage.do?infId=OPEN17020190531110010104913&infSeq=2
[NHN Cloud SMS]: https://docs.nhncloud.com/ko/Notification/SMS/ko/Overview/
[NHN Dooray!]: https://dooray.com/
[Postmark]: https://postmarkapp.com/
[Pushover]: https://pushover.net/
[SendGrid]: https://sendgrid.com/
[Twilio SMS]: https://www.twilio.com/

# new-request

Use 3rd party REST APIs with confidence.

[Twilio SMS], [SendGrid], [Postmark], … [show more](#services)

```js
// before
await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer secret`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body), // not typed.
});

// after - the request body is fully typed!
await sendEmail(body, { apiKey: 'secret' });
```

## Benefits

- **Type Safety**: Fully typed request and response bodies.
- **Easy Migration**: Uses the API's request body format.
- **Small in Size**: Mostly types. Minimum runtime code.
- **Error Handling** without using a `try...catch` block.
- **Fetch API ❤️** with a custom `fetch` function support.

## Usage

```shell
npm i new-request
```

All modules have a similar structure.

```ts
// Pseudocode using TypeScript type names.
const response = await moduleName(RequestBody, Options);

// Response body type can be easily narrowed.
if (response.ok) response.body; // ResponseBody
if (!response.ok) response.body; // ResponseBody4xx
```

Reference the [services](#services) section for all available modules.

```ts
import { send // This will autocomplete module import in most IDEs.
```

The parameter types are exported for TypeScript and JSDoc usage.

```ts
import type { RequestBody, Options } from 'new-request/email/send-grid/v3/POST';

type Email = NonNullable<RequestBody['from']>;
```

## Example

[SendGrid mail send API](https://www.twilio.com/docs/sendgrid/api-reference/mail-send/mail-send) v3

```ts
import { sendEmail } from 'new-request/email/send-grid/v3/POST';

// Everything is typed and autocompleted.
const response = await sendEmail(
  // First parameter closely matches the API's request body.
  // In this example, reference the SendGrid API documentation.
  // https://docs.sendgrid.com/api-reference/mail-send/mail-send
  {
    personalizations: [{ to: [{ email: 'recipient@example.com' }] }],
    subject: 'title',
    content: [{ type: 'text/plain', value: 'body' }],
    from: { email: 'sender@example.com' }, // optional, override
    // ...
  },

  // Second parameter `options` can be modularized and reused.
  {
    apiKey: 'SG.this_is_a_secret_api_key.do_not_expose',
    from: { email: 'sender@example.com' }, // required
    // Custom `fetch` function can be provided here.
  },
);

if (response instanceof Error) {
  // Handle fetch error, which is most-likely a network issue.
} else if (!response.ok) {
  response.status; // 400 | 401 | 403 | 404 | 413 | 500
  // The response body can be narrowed based on the status.
  if (response.status !== 500) response.body; // ResponseBody4xx
  if (response.status === 500) response.body; // ResponseBody5xx
} else {
  response.status; // 202, Successfully sent the mail.
}
```

## Services

**Email:** [SendGrid], [Postmark]

<!-- Resend's official Node.js SDK uses the Fetch API. -->

```js
import { sendEmail } from 'new-request/email/send-grid/v3/POST';
import { sendEmail } from 'new-request/email/postmark/POST';
```

**SMS:** [Twilio SMS], [NHN Cloud SMS]

```js
import { sendSms } from 'new-request/sms/twilio/2010-04-01/POST';
import { sendSms } from 'new-request/sms/nhn/v3.0/POST';
```

**Message:** [Pushover], [NHN Dooray!]

```js
import { pushMessage } from 'new-request/message/pushover/1';
import { sendMessage } from 'new-request/message/dooray';
```

**TTS:** [CLOVA Voice]

```js
import { textToSpeech } from 'new-request/tts/naver/v1';
```

**Misc:** [NEIS 학교 기본 정보]

```js
import { searchSchool } from 'new-request/misc/neis/info';
```
