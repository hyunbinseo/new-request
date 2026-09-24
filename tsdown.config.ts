import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: 'src/**/index.ts',
	dts: true,
	format: ['esm'],
	target: 'node20',
	platform: 'neutral',
	exports: true,
	publint: true,
	attw: { profile: 'esm-only' },
});
