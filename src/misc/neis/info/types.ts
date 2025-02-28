export type Options = {
	apiKey: string;
	fetch?: typeof fetch;
};

export type SearchParams = {
	pageIndex?: number;
	pageSize?: number;
	educationOffice?:
		| 'B10' // 서울특별시교육청
		| 'C10' // 부산광역시교육청
		| 'D10' // 대구광역시교육청
		| 'E10' // 인천광역시교육청
		| 'F10' // 광주광역시교육청
		| 'G10' // 대전광역시교육청
		| 'H10' // 울산광역시교육청
		| 'I10' // 세종특별자치시교육청
		| 'J10' // 경기도교육청
		| 'K10' // 강원특별자치도교육청
		| 'M10' // 충청북도교육청
		| 'N10' // 충청남도교육청
		| 'P10' // 전북특별자치도교육청
		| 'Q10' // 전라남도교육청
		| 'R10' // 경상북도교육청
		| 'S10' // 경상남도교육청
		| 'T10' // 제주특별자치도교육청
		| 'V10'; // 재외교육지원담당관실
} & Partial<Record<'code' | 'name' | 'foundedName' | 'type' | 'region', string>>;

type ErrorCode = `ERROR-${'300' | '290' | '310' | '333' | '336' | '337' | '500' | '600' | '601'}`;

type InfoCode = `INFO-${'000' | '100' | '300' | '200'}`;

type SchoolData = {
	ATPT_OFCDC_SC_CODE: string | null; // 시도교육청코드
	ATPT_OFCDC_SC_NM: string | null; // 시도교육청명
	SD_SCHUL_CODE: string | null; // 행정표준코드
	SCHUL_NM: string; // 학교명
	ENG_SCHUL_NM: string | null; // 영문학교명
	SCHUL_KND_SC_NM: string; // 학교종류명
	LCTN_SC_NM: string; // 시도명
	JU_ORG_NM: string; // 관할조직명
	FOND_SC_NM: string | null; // 설립명
	ORG_RDNZC: string | null; // 도로명우편번호
	ORG_RDNMA: string | null; // 도로명주소
	ORG_RDNDA: string | null; // 도로명상세주소
	ORG_TELNO: string; // 전화번호
	HMPG_ADRES: string | null; // 홈페이지주소
	COEDU_SC_NM: string; // 남녀공학구분명
	ORG_FAXNO: string | null; // 팩스번호
	HS_SC_NM: string | null; // 고등학교구분명
	INDST_SPECL_CCCCL_EXST_YN: 'N' | 'Y'; // 산업체특별학급존재여부
	HS_GNRL_BUSNS_SC_NM: string | null; // 고등학교일반전문구분명
	SPCLY_PURPS_HS_ORD_NM: string | null; // 특수목적고등학교계열명
	ENE_BFE_SEHF_SC_NM: string; // 입시전후기구분명
	DGHT_SC_NM: string; // 주야구분명
	FOND_YMD: string; // 설립일자
	FOAS_MEMRD: string; // 개교기념일
	LOAD_DTM: string; // 수정일자
};

type Result = { RESULT: { CODE: ErrorCode | InfoCode; MESSAGE: string } };

export type ResponseBody =
	| (Result & { schoolInfo?: never })
	| {
			RESULT?: never;
			schoolInfo: [{ head: [{ list_total_count: number }, Result] }, { row: Array<SchoolData> }];
	  };
