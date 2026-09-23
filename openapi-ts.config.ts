import { defineConfig } from '@hey-api/openapi-ts';

// See https://heyapi.dev/openapi-ts/configuration
// Specs: https://developers.zoom.us/docs/api/ (Download spec)
const specs = {
	user: 'https://developers.zoom.us/api-specs/user/methods/ZoomUserAPI-spec.json',
};

// One job per operation, so the generated files sit next to the module that uses them.
const operation = (spec: keyof typeof specs, include: string, path: string) => ({
	input: specs[spec],
	output: { path: `src/meeting/zoom/${path}`, clean: false, entryFile: false },
	parser: { filters: { operations: { include: [include] } } },
	plugins: ['@hey-api/typescript', 'valibot'] as const,
});

export default defineConfig([
	operation('user', 'GET /users/{userId}/token', 'users/GET/token'), //
]);
