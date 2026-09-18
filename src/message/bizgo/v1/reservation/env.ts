import { digits, object, pipe, safeParse, startsWith, string } from 'valibot';

const result = safeParse(
	object({
		BIZGO_API_KEY: pipe(string(), startsWith('mars_')),
		BIZGO_PHONE_NUMBER: pipe(string(), digits()),
		BIZGO_KAKAO_SENDER_KEY: string(),
		BIZGO_KAKAO_TEMPLATE_CODE: string(),
	}),
	process.env,
);

/** Real Bizgo credentials, or empty placeholders when any is missing (tests skip). */
export const bizgoEnv = result.success
	? result.output
	: {
			BIZGO_API_KEY: '',
			BIZGO_PHONE_NUMBER: '',
			BIZGO_KAKAO_SENDER_KEY: '',
			BIZGO_KAKAO_TEMPLATE_CODE: '',
		};

/** Skip reason for tests that hit the live sandbox when real credentials are absent. */
export const skip = result.success ? false : 'Set BIZGO_* environment variables to run.';
