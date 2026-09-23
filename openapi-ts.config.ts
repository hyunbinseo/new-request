import { defineConfig } from '@hey-api/openapi-ts';

// See https://heyapi.dev/openapi-ts/configuration
// Specs: https://developers.zoom.us/docs/api/ (Download spec)
export default defineConfig([
	{
		input: 'https://developers.zoom.us/api-specs/user/methods/ZoomUserAPI-spec.json',
		output: { path: 'src/meeting/zoom/generated/user', indexFile: false },
		parser: {
			filters: {
				operations: {
					include: [
						'GET /users/{userId}/token', //
					],
				},
			},
		},
		plugins: ['@hey-api/typescript', 'valibot'],
	},
]);
