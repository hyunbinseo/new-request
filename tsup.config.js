import { defineConfig } from 'tsup';

// TODO Keep directory structure on build output.
// Reference https://github.com/egoist/tsup/issues/728

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	dts: true,
	clean: true,
});
