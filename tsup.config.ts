import { defineConfig } from 'tsup';

export default defineConfig({
	// Multiple entry points using glob pattern.
	// https://github.com/egoist/tsup/issues/728
	entry: ['src/**/index.ts'],
	format: ['esm'],
	dts: true,
	clean: true,
});
