## Example

Save file locally using Node.js 18 and later.

```javascript
import { NaverTextToSpeech1 } from 'new-request';
import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';

const text =
  // 윤하 - 사건의 지평선, https://youtu.be/BBdC1rl5sKY
  '저기 사라진 별의 자리, 아스라이 하얀 빛, 한동안은 꺼내 볼 수 있을 거야';

const format = 'wav';

const response = await NaverTextToSpeech1(
  {
    text,
    speaker: {
      language: '한국어',
      isWoman: true,
      isChild: false,
      isPro: true,
      name: '아라',
      code: 'vara',
    },
    format,
  },
  // Provide your own secret.
  { clientId: '', clientSecret: '' },
);

if (response instanceof Error) {
  // Handle network error.
} else if (!response.ok) {
  // Handle HTTP 400 or 500 error.
} else {
  const writeStream = createWriteStream(`./${text}.${format}`);
  // @ts-ignore
  // response.body as ReadableStream<any>
  await finished(Readable.fromWeb(response.body).pipe(writeStream));
}
```

## Speakers

| Language          | Name         | Woman | Child | PRO   | Code          |
| ----------------- | ------------ | ----- | ----- | ----- | ------------- |
| 대만어            | 관린         | FALSE | FALSE | FALSE | kuanlin       |
| 대만어            | 차화         | TRUE  | FALSE | FALSE | chiahua       |
| 스페인어          | 호세         | FALSE | FALSE | FALSE | jose          |
| 스페인어          | 카르멘       | TRUE  | FALSE | FALSE | carmen        |
| 영어              | 매트         | FALSE | FALSE | FALSE | matt          |
| 영어              | 클라라       | TRUE  | FALSE | FALSE | clara         |
| 영어              | 안나         | TRUE  | FALSE | FALSE | danna         |
| 영어              | 조이         | TRUE  | FALSE | FALSE | djoey         |
| 일본어            | 아유무       | FALSE | FALSE | FALSE | dayumu        |
| 일본어            | 다이키       | FALSE | FALSE | FALSE | ddaiki        |
| 일본어            | 하지메       | FALSE | FALSE | FALSE | dhajime       |
| 일본어            | 신지         | FALSE | FALSE | FALSE | shinji        |
| 일본어            | 에리코       | TRUE  | FALSE | FALSE | deriko        |
| 일본어            | 나오미       | TRUE  | FALSE | FALSE | dnaomi        |
| 일본어            | 나오미(뉴스) | TRUE  | FALSE | FALSE | dnaomi_formal |
| 일본어            | 나오미(기쁨) | TRUE  | FALSE | FALSE | dnaomi_joyful |
| 일본어            | 리코         | TRUE  | FALSE | FALSE | driko         |
| 일본어            | 사유리       | TRUE  | FALSE | FALSE | dsayuri       |
| 일본어            | 토모코       | TRUE  | FALSE | FALSE | dtomoko       |
| 일본어            | 나오미       | TRUE  | FALSE | FALSE | nnaomi        |
| 일본어            | 사유리       | TRUE  | FALSE | FALSE | nsayuri       |
| 일본어            | 토모코       | TRUE  | FALSE | FALSE | ntomoko       |
| 일어              | 미오         | TRUE  | FALSE | FALSE | dmio          |
| 중국어            | 량량         | FALSE | FALSE | FALSE | liangliang    |
| 중국어            | 메이메이     | TRUE  | FALSE | FALSE | meimei        |
| 한국어            | 하준         | FALSE | TRUE  | FALSE | nhajun        |
| 한국어            | 멍멍이       | FALSE | TRUE  | FALSE | nwoof         |
| 한국어            | 다인         | TRUE  | TRUE  | FALSE | ndain         |
| 한국어            | 가람         | TRUE  | TRUE  | FALSE | ngaram        |
| 한국어            | 야옹이       | TRUE  | TRUE  | FALSE | nmeow         |
| 한국어            | 대성         | FALSE | FALSE | TRUE  | vdaeseong     |
| 한국어            | 동현         | FALSE | FALSE | TRUE  | vdonghyun     |
| 한국어            | 이안         | FALSE | FALSE | TRUE  | vian          |
| 한국어            | 아라         | TRUE  | FALSE | TRUE  | vara          |
| 한국어            | 다인         | TRUE  | FALSE | TRUE  | vdain         |
| 한국어            | 고은         | TRUE  | FALSE | TRUE  | vgoeun        |
| 한국어            | 혜리         | TRUE  | FALSE | TRUE  | vhyeri        |
| 한국어            | 미경         | TRUE  | FALSE | TRUE  | vmikyung      |
| 한국어            | 유나         | TRUE  | FALSE | TRUE  | vyuna         |
| 한국어            | 진호         | FALSE | FALSE | FALSE | jinho         |
| 한국어            | 대성         | FALSE | FALSE | FALSE | ndaeseong     |
| 한국어            | 동현         | FALSE | FALSE | FALSE | ndonghyun     |
| 한국어            | 기효         | FALSE | FALSE | FALSE | nes_c_kihyo   |
| 한국어            | 은우         | FALSE | FALSE | FALSE | neunwoo       |
| 한국어            | 경준         | FALSE | FALSE | FALSE | ngyeongjun    |
| 한국어            | 이안         | FALSE | FALSE | FALSE | nian          |
| 한국어            | 재욱         | FALSE | FALSE | FALSE | njaewook      |
| 한국어            | 지훈         | FALSE | FALSE | FALSE | njihun        |
| 한국어            | 지환         | FALSE | FALSE | FALSE | njihwan       |
| 한국어            | 진호         | FALSE | FALSE | FALSE | njinho        |
| 한국어            | 종혁         | FALSE | FALSE | FALSE | njonghyeok    |
| 한국어            | 종현         | FALSE | FALSE | FALSE | njonghyun     |
| 한국어            | 주안         | FALSE | FALSE | FALSE | njooahn       |
| 한국어            | 준영         | FALSE | FALSE | FALSE | njoonyoung    |
| 한국어            | 기태         | FALSE | FALSE | FALSE | nkitae        |
| 한국어            | 경태         | FALSE | FALSE | FALSE | nkyungtae     |
| 한국어            | 규원         | FALSE | FALSE | FALSE | nkyuwon       |
| 한국어            | 악마 마몬    | FALSE | FALSE | FALSE | nmammon       |
| 한국어            | 민상         | FALSE | FALSE | FALSE | nminsang      |
| 한국어            | 최무비       | FALSE | FALSE | FALSE | nmovie        |
| 한국어            | 래원         | FALSE | FALSE | FALSE | nraewon       |
| 한국어            | 박리뷰       | FALSE | FALSE | FALSE | nreview       |
| 한국어            | 상도         | FALSE | FALSE | FALSE | nsangdo       |
| 한국어            | 성훈         | FALSE | FALSE | FALSE | nseonghoon    |
| 한국어            | 승표         | FALSE | FALSE | FALSE | nseungpyo     |
| 한국어            | 신우         | FALSE | FALSE | FALSE | nsinu         |
| 한국어            | 시윤         | FALSE | FALSE | FALSE | nsiyoon       |
| 한국어            | 태진         | FALSE | FALSE | FALSE | ntaejin       |
| 한국어            | 원탁         | FALSE | FALSE | FALSE | nwontak       |
| 한국어            | 우식         | FALSE | FALSE | FALSE | nwoosik       |
| 한국어            | 영일         | FALSE | FALSE | FALSE | nyoungil      |
| 한국어            | 아라(화남)   | TRUE  | FALSE | FALSE | dara_ang      |
| 한국어            | 미진         | TRUE  | FALSE | FALSE | mijin         |
| 한국어            | 늘봄         | TRUE  | FALSE | FALSE | napple        |
| 한국어            | 아라         | TRUE  | FALSE | FALSE | nara          |
| 한국어            | 아라(상담원) | TRUE  | FALSE | FALSE | nara_call     |
| 한국어            | 보라         | TRUE  | FALSE | FALSE | nbora         |
| 한국어            | 혜리         | TRUE  | FALSE | FALSE | nes_c_hyeri   |
| 한국어            | 미경         | TRUE  | FALSE | FALSE | nes_c_mikyung |
| 한국어            | 소현         | TRUE  | FALSE | FALSE | nes_c_sohyun  |
| 한국어            | 은서         | TRUE  | FALSE | FALSE | neunseo       |
| 한국어            | 은영         | TRUE  | FALSE | FALSE | neunyoung     |
| 한국어            | 고은         | TRUE  | FALSE | FALSE | ngoeun        |
| 한국어            | 희라         | TRUE  | FALSE | FALSE | nheera        |
| 한국어            | 이현         | TRUE  | FALSE | FALSE | nihyun        |
| 한국어            | 드림         | TRUE  | FALSE | FALSE | njangj        |
| 한국어            | 지원         | TRUE  | FALSE | FALSE | njiwon        |
| 한국어            | 지윤         | TRUE  | FALSE | FALSE | njiyun        |
| 한국어            | 경리         | TRUE  | FALSE | FALSE | nkyunglee     |
| 한국어            | 민정         | TRUE  | FALSE | FALSE | nminjeong     |
| 한국어            | 민서         | TRUE  | FALSE | FALSE | nminseo       |
| 한국어            | 민영         | TRUE  | FALSE | FALSE | nminyoung     |
| 한국어            | 나래         | TRUE  | FALSE | FALSE | nnarae        |
| 한국어            | 봄달         | TRUE  | FALSE | FALSE | noyj          |
| 한국어            | 마녀 사비나  | TRUE  | FALSE | FALSE | nsabina       |
| 한국어            | 샤샤         | TRUE  | FALSE | FALSE | nshasha       |
| 한국어            | 수진         | TRUE  | FALSE | FALSE | nsujin        |
| 한국어            | 선희         | TRUE  | FALSE | FALSE | nsunhee       |
| 한국어            | 선경         | TRUE  | FALSE | FALSE | nsunkyung     |
| 한국어            | 기서         | TRUE  | FALSE | FALSE | ntiffany      |
| 한국어            | 예지         | TRUE  | FALSE | FALSE | nyeji         |
| 한국어            | 예진         | TRUE  | FALSE | FALSE | nyejin        |
| 한국어            | 정영화       | TRUE  | FALSE | FALSE | nyounghwa     |
| 한국어            | 영미         | TRUE  | FALSE | FALSE | nyoungmi      |
| 한국어            | 유진         | TRUE  | FALSE | FALSE | nyujin        |
| 한국어            | 유나         | TRUE  | FALSE | FALSE | nyuna         |
| 한국어+영어(미국) | 신우&매트    | FALSE | FALSE | FALSE | dsinu-matt    |
| 한국어+영어(미국) | 아라&안나    | TRUE  | FALSE | FALSE | dara-danna    |
