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

> [!NOTE]
> 나이스 교육정보 개방 포털 학교기본정보 was removed. Use [`neis-school-info`](https://github.com/hyunbinseo/neis-school-info) instead.

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
- [비즈고](https://developers.bizgo.io/) (문자, RCS, 카카오 비즈메시지, 네이버 톡톡, 국제메시지)
- [NHN Dooray! 두레이 메신저 웹 훅](https://helpdesk.dooray.com/share/pages/9wWo-xwiR66BO5LGshgVTg/2900079421986850197)

```ts
import { sendMessage } from 'new-request/message/bizgo/v1/send/omni/POST';
import { sendMessage } from 'new-request/message/dooray/POST';
import { pushMessage } from 'new-request/message/pushover/1/POST';
```

#### 비즈고 예약 발송

> [!NOTE]
> `createReservation`/`updateReservation`의 `resvSendTime`은 KST(Asia/Seoul) 기준 문자열을 기대함 (UTC로 보내면 조용히 잘못된 시각으로 처리됨).
> 위 `resvSendTime`은 현재 시각 기준 **10분 후 ~ 1년 이내**만 허용됨 (API 레퍼런스엔 없고 비즈고 공지에만 있던 내용, `A316` 에러로 재현 확인).
> `getReservation`/`getReservations`/`updateReservation` 응답의 `resvSendTime`은 요청과 다른 포맷(2026-05-01T10:00:00+09:00, ISO 8601 + 오프셋)으로 내려옴.

> [!WARNING]
> `getReservation`/`getReservations`/`updateReservation` 응답에 문서에 없는 `resvData` 필드가 있음 (등록 요청 바디를 JSON 문자열로 그대로 담고 있음).
> `createReservation` 성공 응답에 문서 예시엔 없는 `ref`, `data.destinations[]`(수신자별 검증 결과)가 포함됨.
> `getReservations`는 문서상 "월/일/시각 단위 조회 가능"이라고 되어 있지만, 실제로는 전체 타임스탬프만 통과되고 월/일 단위는 A213 에러가 남.

```ts
import {
	getReservations,
	getReservation,
	getReservationDestinations,
} from 'new-request/message/bizgo/v1/reservation/GET';
import {
	createReservation,
	cancelReservation,
	addReservationDestinations,
	resumeReservation,
	stopReservation,
} from 'new-request/message/bizgo/v1/reservation/POST';
import { updateReservation } from 'new-request/message/bizgo/v1/reservation/PUT';
import { deleteReservationDestination } from 'new-request/message/bizgo/v1/reservation/DELETE';
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
