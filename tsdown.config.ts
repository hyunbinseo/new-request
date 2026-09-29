import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: 'src/**/{GET,POST,PUT,DELETE}/index.ts',
	dts: true,
	format: ['esm'],
	target: ['es2023'], // sync with tsconfig.lib.json's lib
	platform: 'neutral',
	exports: true,
	publint: true,
	attw: { profile: 'esm-only' },
});
