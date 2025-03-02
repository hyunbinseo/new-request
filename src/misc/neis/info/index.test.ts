import { doesNotThrow } from 'node:assert';
import { env, loadEnvFile } from 'node:process';
import test from 'node:test';
import { digits, length, nullable, object, parse, pipe, string } from 'valibot';
import { searchSchool } from './index.ts';

loadEnvFile('.env.local');
if (!env.NEIS_API_KEY) throw new TypeError();

const response = await searchSchool({ educationOffice: 'V10' }, { apiKey: env.NEIS_API_KEY });
if (response instanceof Error) throw response;
if (!response.ok || !response.schools.length) throw new Error();

const SchoolSchema = object({
	ORG_RDNZC: nullable(pipe(string(), digits(), length(5))),
	SD_SCHUL_CODE: nullable(pipe(string(), digits(), length(7))),
});

test('Search Schools', () => {
	for (const school of response.schools) {
		doesNotThrow(() => parse(SchoolSchema, school));
	}
});
