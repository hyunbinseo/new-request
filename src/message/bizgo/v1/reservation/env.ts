import { fallback, object, parse, pipe, startsWith, string } from 'valibot';

export const env = parse(
	object({ BIZGO_API_KEY: fallback(pipe(string(), startsWith('mars_')), 'test-api-key') }),
	process.env,
);
