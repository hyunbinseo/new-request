import assert from 'node:assert';
import { globSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

assert(cwd() === join(import.meta.dirname, '..'));
assert(statSync('./dist').isDirectory());

const pkgJson = JSON.parse(readFileSync('package.json', { encoding: 'utf-8' }));

pkgJson.exports = globSync('./dist/**/index.js')
	.sort()
	.reduce((exports, _path) => {
		const path = _path.replaceAll(/\\+/g, '/');
		const key = path.replace(/^dist/, '.').replace(/\/index.js$/, '');
		exports[key] = `./${path}`;
		return exports;
	}, {});

writeFileSync('package.json', JSON.stringify(pkgJson, null, '\t') + '\n');
