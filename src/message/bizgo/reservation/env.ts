import { nonEmpty, pipe, regex, safeParse, startsWith, string } from 'valibot';

const schemas = {
	BIZGO_API_KEY: pipe(string(), startsWith('mars_')),
	BIZGO_PHONE_NUMBER: pipe(string(), regex(/^\+?\d+$/)), // leading '+' for international
	BIZGO_KAKAO_SENDER_KEY: pipe(string(), nonEmpty()),
	BIZGO_KAKAO_TEMPLATE_CODE: pipe(string(), nonEmpty()),
};

type Key = keyof typeof schemas;
const keys = Object.keys(schemas) as Key[];

/** Real Bizgo credentials, or empty placeholders when absent (the affected tests skip). */
export const bizgoEnv = Object.fromEntries(keys.map((k) => [k, process.env[k] ?? ''])) as Record<
	Key,
	string
>;

/** Skip reason naming any missing/invalid vars, or `false` when all the listed ones are present. */
const skipUnless = (...needed: Key[]) => {
	const missing = needed.filter((k) => !safeParse(schemas[k], process.env[k]).success);
	return missing.length ? `Missing or invalid: ${missing.join(', ')}` : false;
};

/** Endpoints only need the API key; the create endpoint also needs the phone and Kakao template. */
export const skip = skipUnless('BIZGO_API_KEY');
export const skipCreate = skipUnless(...keys);
