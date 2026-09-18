import { nonEmpty, pipe, regex, safeParse, startsWith, string } from 'valibot';

const env = process.env;

/** Real Bizgo credentials, or empty placeholders when absent (the affected tests skip). */
export const bizgoEnv = {
	BIZGO_API_KEY: env['BIZGO_API_KEY'] ?? '',
	BIZGO_PHONE_NUMBER: env['BIZGO_PHONE_NUMBER'] ?? '',
	BIZGO_KAKAO_SENDER_KEY: env['BIZGO_KAKAO_SENDER_KEY'] ?? '',
	BIZGO_KAKAO_TEMPLATE_CODE: env['BIZGO_KAKAO_TEMPLATE_CODE'] ?? '',
};

const valid = {
	BIZGO_API_KEY: safeParse(pipe(string(), startsWith('mars_')), env['BIZGO_API_KEY']).success,
	// International numbers may carry a leading '+', so digits-only is too strict.
	BIZGO_PHONE_NUMBER: safeParse(pipe(string(), regex(/^\+?\d+$/)), env['BIZGO_PHONE_NUMBER'])
		.success,
	BIZGO_KAKAO_SENDER_KEY: safeParse(pipe(string(), nonEmpty()), env['BIZGO_KAKAO_SENDER_KEY'])
		.success,
	BIZGO_KAKAO_TEMPLATE_CODE: safeParse(pipe(string(), nonEmpty()), env['BIZGO_KAKAO_TEMPLATE_CODE'])
		.success,
};

/** A node:test skip reason naming the missing/invalid vars, or `false` when all are present. */
const skipUnless = (...needed: (keyof typeof valid)[]) => {
	const missing = needed.filter((key) => !valid[key]);
	return missing.length > 0 ? `Missing or invalid: ${missing.join(', ')}` : false;
};

/** Endpoints that only need the API key for the Authorization header. */
export const skip = skipUnless('BIZGO_API_KEY');

/** The create endpoint additionally needs the sender phone and the Kakao template. */
export const skipCreate = skipUnless(
	'BIZGO_API_KEY',
	'BIZGO_PHONE_NUMBER',
	'BIZGO_KAKAO_SENDER_KEY',
	'BIZGO_KAKAO_TEMPLATE_CODE',
);
