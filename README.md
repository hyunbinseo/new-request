# new-request

Use 3rd party REST APIs with confidence.

[SendGrid], [Twilio SMS], [CLOVA Voice], … [show more](#services)

[SendGrid]: https://sendgrid.com/
[Twilio SMS]: https://www.twilio.com/
[CLOVA Voice]: https://www.ncloud.com/product/aiService/clovaVoice

## Benefits

- **Type Safety**: Fully typed request and response bodies.
- **Easy Migration**: Uses the API's request body format.
- **Small in Size**: Mostly types. Minimum runtime code.
- **Error Handling** without using a `try...catch` block.
- **Fetch API ❤️** with a custom `fetch` function support.

## Usage

```shell
npm i new-request -D
```

All modules have a similar structure.

```ts
// Pseudocode using TypeScript type names.
const response = await moduleName(RequestBody, Options);

// Response body type can be easily narrowed.
if (response.ok) response.body; // ResponseBody
if (!response.ok) response.body; // ResponseBody4xx
```

Reference the [services](#services) section for the specific types.

```ts
// Example using the SendGrid mail send API v3.

// Rename the imported module for better readability.
import { SendGridSendEmail3 as sendEmail } from 'new-request';

// Everything is typed and autocompleted.
const response = await sendEmail(
  {
    // Request body goes here. Reference the official documentation.
    // The `from` value is optional, and will override the sender.
    // https://docs.sendgrid.com/api-reference/mail-send/mail-send
  },
  // Following `options` object can modularized and reused.
  {
    apiKey: 'SG.this_is_a_secret_api_key.do_not_expose',
    from: { email: 'sender@example.com' },
    // Custom `fetch` can be provided here.
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

### POST Method

| Service         | Module Name          | Types                                                 |
| --------------- | -------------------- | ----------------------------------------------------- |
| [SendGrid]      | `SendGridSendEmail3` | [`types.ts`](src/email/send-grid/v3/POST/types.ts)    |
| [Twilio SMS]    | `TwilioSendSms2010`  | [`types.ts`](src/sms/twilio/2010-04-01/POST/types.ts) |
| [NHN Cloud SMS] | `NhnSendSms3`        | [`types.ts`](src/sms/nhn/3.0/POST/types.ts)           |
| [CLOVA Voice]   | `NaverTextToSpeech1` | [`types.ts`](src/tts/naver/v1/types.ts)               |

[NHN Cloud SMS]: https://docs.nhncloud.com/ko/Notification/SMS/ko/Overview/

### GET Method

| Service               | Module Name        | Types                                     |
| --------------------- | ------------------ | ----------------------------------------- |
| [NEIS 학교 기본 정보] | `NeisSearchSchool` | [`types.ts`](src/misc/neis/info/types.ts) |

[NEIS 학교 기본 정보]: https://open.neis.go.kr/portal/data/service/selectServicePage.do?infId=OPEN17020190531110010104913&infSeq=2
