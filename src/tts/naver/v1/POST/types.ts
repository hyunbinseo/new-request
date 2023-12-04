export type Options = {
	clientId: string;
	clientSecret: string;
	fetch?: Fetch;
};

// Reference https://docs.sendgrid.com/api-reference/mail-send/mail-send
export type RequestBody = {
	text: string;
	speaker: Speaker;
} & Partial<{
	'volume': number; // 음성 볼륨
	'speed': number; // 음성 속도
	'pitch': number; // 음성 피치
	'emotion': number; // 음성 감정
	'emotion-strength': number; // 감정의 강도
	'alpha': number; // 음색
	'end-pitch': number; // 끝음 처리
}> &
	Partial<
		| {
				// mp3 포맷은 24000에서 변경 불가
				'format': 'mp3'; // 음성 포맷
				'sampling-rate': 24000; // 샘플링 레이트
		  }
		| {
				// wav 포맷일 때만 지원
				'format': 'wav'; // 음성 포맷
				'sampling-rate': 8000 | 16000 | 24000 | 48000; // 샘플링 레이트
		  }
	>;

export type ErrorBody = {
	details: string;
	errorCode:
		| 'VS01'
		| 'VS02'
		| 'VS03'
		| 'VS04'
		| 'VS05'
		| 'VS06'
		| 'VS07'
		| 'VS08'
		| 'VS09'
		| 'VS10'
		| 'VS11'
		| 'VS14'
		| 'VS18'
		| 'VS19'
		| 'VS26'
		| 'VS46'
		| 'VS99';
	message: string;
};

type Speaker =
	| {
			language: '대만어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '관린';
			code: 'kuanlin';
	  }
	| {
			language: '대만어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '차화';
			code: 'chiahua';
	  }
	| {
			language: '스페인어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '호세';
			code: 'jose';
	  }
	| {
			language: '스페인어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '카르멘';
			code: 'carmen';
	  }
	| {
			language: '영어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '매트';
			code: 'matt';
	  }
	| {
			language: '영어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '클라라';
			code: 'clara';
	  }
	| {
			language: '영어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '안나';
			code: 'danna';
	  }
	| {
			language: '영어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '조이';
			code: 'djoey';
	  }
	| {
			language: '일본어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '아유무';
			code: 'dayumu';
	  }
	| {
			language: '일본어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '다이키';
			code: 'ddaiki';
	  }
	| {
			language: '일본어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '하지메';
			code: 'dhajime';
	  }
	| {
			language: '일본어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '신지';
			code: 'shinji';
	  }
	| {
			language: '일본어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '에리코';
			code: 'deriko';
	  }
	| {
			language: '일본어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '나오미';
			code: 'dnaomi';
	  }
	| {
			language: '일본어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '나오미(뉴스)';
			code: 'dnaomi_formal';
	  }
	| {
			language: '일본어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '나오미(기쁨)';
			code: 'dnaomi_joyful';
	  }
	| {
			language: '일본어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '리코';
			code: 'driko';
	  }
	| {
			language: '일본어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '사유리';
			code: 'dsayuri';
	  }
	| {
			language: '일본어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '토모코';
			code: 'dtomoko';
	  }
	| {
			language: '일본어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '나오미';
			code: 'nnaomi';
	  }
	| {
			language: '일본어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '사유리';
			code: 'nsayuri';
	  }
	| {
			language: '일본어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '토모코';
			code: 'ntomoko';
	  }
	| {
			language: '일어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '미오';
			code: 'dmio';
	  }
	| {
			language: '중국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '량량';
			code: 'liangliang';
	  }
	| {
			language: '중국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '메이메이';
			code: 'meimei';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: true;
			isPro: false;
			name: '하준';
			code: 'nhajun';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: true;
			isPro: false;
			name: '멍멍이';
			code: 'nwoof';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: true;
			isPro: false;
			name: '다인';
			code: 'ndain';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: true;
			isPro: false;
			name: '가람';
			code: 'ngaram';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: true;
			isPro: false;
			name: '야옹이';
			code: 'nmeow';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: true;
			name: '대성';
			code: 'vdaeseong';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: true;
			name: '동현';
			code: 'vdonghyun';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: true;
			name: '이안';
			code: 'vian';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: true;
			name: '아라';
			code: 'vara';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: true;
			name: '다인';
			code: 'vdain';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: true;
			name: '고은';
			code: 'vgoeun';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: true;
			name: '혜리';
			code: 'vhyeri';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: true;
			name: '미경';
			code: 'vmikyung';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: true;
			name: '유나';
			code: 'vyuna';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '진호';
			code: 'jinho';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '대성';
			code: 'ndaeseong';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '동현';
			code: 'ndonghyun';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '기효';
			code: 'nes_c_kihyo';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '은우';
			code: 'neunwoo';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '경준';
			code: 'ngyeongjun';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '이안';
			code: 'nian';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '재욱';
			code: 'njaewook';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '지훈';
			code: 'njihun';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '지환';
			code: 'njihwan';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '진호';
			code: 'njinho';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '종혁';
			code: 'njonghyeok';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '종현';
			code: 'njonghyun';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '주안';
			code: 'njooahn';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '준영';
			code: 'njoonyoung';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '기태';
			code: 'nkitae';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '경태';
			code: 'nkyungtae';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '규원';
			code: 'nkyuwon';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '악마 마몬';
			code: 'nmammon';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '민상';
			code: 'nminsang';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '최무비';
			code: 'nmovie';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '래원';
			code: 'nraewon';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '박리뷰';
			code: 'nreview';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '상도';
			code: 'nsangdo';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '성훈';
			code: 'nseonghoon';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '승표';
			code: 'nseungpyo';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '신우';
			code: 'nsinu';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '시윤';
			code: 'nsiyoon';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '태진';
			code: 'ntaejin';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '원탁';
			code: 'nwontak';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '우식';
			code: 'nwoosik';
	  }
	| {
			language: '한국어';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '영일';
			code: 'nyoungil';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '아라(화남)';
			code: 'dara_ang';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '미진';
			code: 'mijin';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '늘봄';
			code: 'napple';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '아라';
			code: 'nara';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '아라(상담원)';
			code: 'nara_call';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '보라';
			code: 'nbora';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '혜리';
			code: 'nes_c_hyeri';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '미경';
			code: 'nes_c_mikyung';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '소현';
			code: 'nes_c_sohyun';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '은서';
			code: 'neunseo';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '은영';
			code: 'neunyoung';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '고은';
			code: 'ngoeun';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '희라';
			code: 'nheera';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '이현';
			code: 'nihyun';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '드림';
			code: 'njangj';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '지원';
			code: 'njiwon';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '지윤';
			code: 'njiyun';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '경리';
			code: 'nkyunglee';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '민정';
			code: 'nminjeong';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '민서';
			code: 'nminseo';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '민영';
			code: 'nminyoung';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '나래';
			code: 'nnarae';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '봄달';
			code: 'noyj';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '마녀 사비나';
			code: 'nsabina';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '샤샤';
			code: 'nshasha';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '수진';
			code: 'nsujin';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '선희';
			code: 'nsunhee';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '선경';
			code: 'nsunkyung';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '기서';
			code: 'ntiffany';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '예지';
			code: 'nyeji';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '예진';
			code: 'nyejin';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '정영화';
			code: 'nyounghwa';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '영미';
			code: 'nyoungmi';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '유진';
			code: 'nyujin';
	  }
	| {
			language: '한국어';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '유나';
			code: 'nyuna';
	  }
	| {
			language: '한국어+영어(미국)';
			isWoman: false;
			isChild: false;
			isPro: false;
			name: '신우&매트';
			code: 'dsinu-matt';
	  }
	| {
			language: '한국어+영어(미국)';
			isWoman: true;
			isChild: false;
			isPro: false;
			name: '아라&안나';
			code: 'dara-danna';
	  };
