import { nonEmpty, pipe, safeParse, string } from 'valibot';

// Server-to-Server OAuth app credentials.
// See https://developers.zoom.us/docs/internal-apps/s2s-oauth/
const schemas = {
	ZOOM_ACCOUNT_ID: pipe(string(), nonEmpty()),
	ZOOM_CLIENT_ID: pipe(string(), nonEmpty()),
	ZOOM_CLIENT_SECRET: pipe(string(), nonEmpty()),
};

type Key = keyof typeof schemas;
const keys = Object.keys(schemas) as Key[];

export const zoomEnv = Object.fromEntries(keys.map((k) => [k, process.env[k] ?? ''])) as Record<
	Key,
	string
>;

const missing = keys.filter((k) => !safeParse(schemas[k], process.env[k]).success);

export const skip = missing.length ? `Missing: ${missing.join(', ')}` : false;
