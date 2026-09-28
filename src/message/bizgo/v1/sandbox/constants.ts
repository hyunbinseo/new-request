import type { MessageFlowItem } from '#bizgo/v1/channels/index.ts';

export const 국내_수신번호 = '01012345678';
export const 국제_수신번호 = '819012345678';
export const 발신번호 = '0212345678';
export const 카카오톡_발신_프로필_키 = 'SENDER_KEY';
export const 카카오톡_알림톡_템플릿_코드 = 'TEMPLATE_CODE';

export const 카카오톡_알림톡_메시지: MessageFlowItem = {
	alimtalk: {
		msgType: 'AT',
		senderKey: 카카오톡_발신_프로필_키,
		templateCode: 카카오톡_알림톡_템플릿_코드,
		text: '알림톡 발송 테스트입니다.',
	},
};
