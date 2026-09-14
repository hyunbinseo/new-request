// See https://developers.bizgo.io/api-sdk/api-reference/comm/reservation

export type Common = {
	authCode: string;
	authResult: string;
	infobankTrId: string;
};

export type Destination = {
	to: string;
	replaceWords?: Record<string, string>;
	ref?: string;
};

export type Reservation = {
	seq: number;
	resvKey: string;
	paymentCode?: string;
	resvName?: string;
	productType: string;
	status: string;
	adYn: string;
	resvSendTime: string;
	expectedCnt: number;
	sentCnt: number;
	successCnt: number;
	failCnt: number;
	updateDate: string;
	regDate: string;
};

export type ReservationDestination = {
	msgKey: string;
	destSeq: number;
	to: string;
	destData?: string;
	status: string;
	responseCode: string;
	responseText: string;
};
