import { env } from 'node:process';
import { nonEmpty, object, pipe, safeParse, string } from 'valibot';

// Server-to-Server OAuth app credentials, listed in `.env.example`.
// See https://developers.zoom.us/docs/internal-apps/s2s-oauth/
const ZoomEnvSchema = object({
	ZOOM_ACCOUNT_ID: pipe(string(), nonEmpty()),
	ZOOM_CLIENT_ID: pipe(string(), nonEmpty()),
	ZOOM_CLIENT_SECRET: pipe(string(), nonEmpty()),
});

const result = safeParse(ZoomEnvSchema, env);

// `undefined` unless every variable is set, so integration tests can skip.
export const zoomOpts = result.success
	? {
			accountId: result.output.ZOOM_ACCOUNT_ID,
			clientId: result.output.ZOOM_CLIENT_ID,
			clientSecret: result.output.ZOOM_CLIENT_SECRET,
		}
	: undefined;
