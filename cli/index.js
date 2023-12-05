import { readFileSync, writeFileSync } from 'node:fs';

const file = './package.json';

/** @type {{ tsup: { entry: string[] } }} */
const json = JSON.parse(readFileSync(file).toString());

const entries = json.tsup.entry.map((v) => v.replace(/^src\//, '').replace(/\/?index\.ts$/, ''));

/** @type {Record<string, Record<'import' | 'require', Record<'types' | 'default', string>>>} */
const exports = {
	'.': {
		import: {
			types: './dist/index.d.ts',
			default: './dist/index.js',
		},
		require: {
			types: './dist/index.d.cts',
			default: './dist/index.cjs',
		},
	},
};

for (const entry of entries) {
	if (!entry) continue;
	exports[`./${entry}`] = {
		import: {
			types: `./dist/${entry}/index.d.ts`,
			default: `./dist/${entry}/index.js`,
		},
		require: {
			types: `./dist/${entry}/index.d.cts`,
			default: `./dist/${entry}/index.cjs`,
		},
	};
}

writeFileSync(file, JSON.stringify({ ...json, exports }, null, '\t') + '\n');
