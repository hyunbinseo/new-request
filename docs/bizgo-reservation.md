# 비즈고 예약 발송

> [!NOTE]
> `createReservation`/`updateReservation`의 `resvSendTime`은 KST(Asia/Seoul) 기준 문자열을 기대함 (UTC로 보내면 조용히 잘못된 시각으로 처리됨).
> 위 `resvSendTime`은 현재 시각 기준 **10분 후 ~ 1년 이내**만 허용됨 (API 레퍼런스엔 없고 비즈고 공지에만 있던 내용, `A316` 에러로 재현 확인).
> `getReservation`/`getReservations`/`updateReservation` 응답의 `resvSendTime`은 요청과 다른 포맷(2026-05-01T10:00:00+09:00, ISO 8601 + 오프셋)으로 내려옴.
> `getReservations`의 `resvSendTime`은 정확히 일치하는 건이 아니라 **해당 일시를 포함한 그 이후(미래)** 예약을 반환함 (비즈고 확인).
> `getReservations`의 `limit`은 `min:1`, `max:1000`이며, API 레퍼런스엔 기본값이 명시돼 있지 않지만 비즈고 확인 결과 생략 시 기본값은 **100**임 (community.bizgo.io/t/api/237/6). 단 `min:1`은 실제로 강제되지 않아 `limit=0`은 에러가 아닌 빈 페이지를 반환함.

> [!WARNING]
> `getReservation`/`getReservations`/`updateReservation` 응답에 문서에 없는 `resvData` 필드가 있음 (등록 요청 바디를 JSON 문자열로 그대로 담고 있음).
> `createReservation` 성공 응답에 문서 예시엔 없는 `ref`, `data.destinations[]`(수신자별 검증 결과)가 포함됨.
> `getReservations`는 문서상 "월/일/시각 단위 조회 가능"이라고 되어 있지만, 실제로는 전체 타임스탬프만 통과되고 월/일 단위는 A213 에러가 남.

```ts
import { createReservation } from 'new-request/message/bizgo/v1/reservation/POST';
import { getReservations } from 'new-request/message/bizgo/v1/reservation/list/GET';
import { getReservation } from 'new-request/message/bizgo/v1/reservation/resvKey/GET';
import { updateReservation } from 'new-request/message/bizgo/v1/reservation/resvKey/PUT';
import { cancelReservation } from 'new-request/message/bizgo/v1/reservation/resvKey/cancel/POST';
import { resumeReservation } from 'new-request/message/bizgo/v1/reservation/resvKey/resume/POST';
import { stopReservation } from 'new-request/message/bizgo/v1/reservation/resvKey/stop/POST';
import { getReservationDestinations } from 'new-request/message/bizgo/v1/reservation/resvKey/destinations/GET';
import { addReservationDestinations } from 'new-request/message/bizgo/v1/reservation/resvKey/destinations/POST';
import { deleteReservationDestination } from 'new-request/message/bizgo/v1/reservation/resvKey/destinations/msgKey/DELETE';
```
