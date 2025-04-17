// Reference https://aiopen.etri.re.kr/guide/Recognition

export type Options = {
	accessKey: string;
	fetch?: typeof fetch;
};

export type LanguageCode =
	| 'korean'
	| 'english'
	| 'japanese'
	| 'chinese'
	| 'spanish'
	| 'french'
	| 'german'
	| 'russian'
	| 'vietnam'
	| 'arabic'
	| 'thailand'
	| 'portuguese'
	| 'malaysia'
	| 'indonesian'
	| 'cantonese'
	| 'nederlands';

export type RequestBody = {
	argument: {
		language_code: LanguageCode;
		audio: string;
	};
};

export type ResponseBody200 = {
	request_id: string;
	result: 0;
	return_object: { recognized: string };
};

// TODO Check response status value and body type for this failure case:
// 음성인식이 제대로 이루어지지 않았을 경우에는 음성인식 결과 대신 오류 메시지가 반환됩니다.

type ErrorReason = {
	400:
		| 'ASR_NOTOKEN' // 파일이 요구사항(샘플링 주파수 16kHz)에 맞지 않을 때
		| 'SayTranError NoToken'
		| 'SayTranError NoSpeech'
		| 'SayTranError NetworkError'
		| 'SayTranError NetworkError - SR data block broken'
		| 'SayTranError NetworkError - BufferOverflow'
		| 'SayTranError InputError - sr unknown LANG'
		| 'SayTranError InputError - sr header mismatchr'
		| 'SayTranError EngineBusy - sr engine full';
	403:
		| 'Empty Auth Header'
		| 'Invalid Key'
		| 'Blocked KEY'
		| 'Daily Limit Exceeded'
		| 'Monthly Limit Exceeded'
		| 'Yearly Limit Exceeded'
		| 'Too Many Keys'
		| 'Too Many IPs'
		| 'Not Allowed IP'
		| 'Not Allowed Subpath'
		| 'Invalid API';
	408: 'Request Timeout';
	413: 'Body Size Limit Exceeded';
	429: 'Concurrent Limit Exceeded';
	500: 'Internal Server Error';
};

export type ResponseError =
	| _ResponseError<400>
	| _ResponseError<403>
	| _ResponseError<408>
	| _ResponseError<413>
	| _ResponseError<429>
	| _ResponseError<500>;

type _ResponseError<Status extends keyof ErrorReason> = {
	ok: false;
	status: Status;
	body: {
		request_id: string;
		result: -1;
		reason: ErrorReason[Status];
	};
};
