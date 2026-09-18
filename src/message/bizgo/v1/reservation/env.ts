import { fallback, object, parse, pipe, startsWith, string } from 'valibot';

export const bizgoEnv = parse(
	object({
		BIZGO_API_KEY: fallback(pipe(string(), startsWith('mars_')), 'test-api-key'),
		BIZGO_PHONE_NUMBER: fallback(string(), '01000000000'),
		BIZGO_KAKAO_SENDER_KEY: fallback(string(), 'test-sender-key'),
		BIZGO_KAKAO_TEMPLATE_CODE: fallback(string(), 'test'),
	}),
	process.env,
);
