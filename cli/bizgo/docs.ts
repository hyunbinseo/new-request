// Checks that Bizgo's web API reference and llms-full.txt describe the same fields
// for the wrapped endpoints, and snapshots them (no prose) to track upstream changes.
// https://github.com/hyunbinseo/new-request/issues/18

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseHTML } from 'linkedom';

// source
const ORIGIN = 'https://developers.bizgo.io';
const LANGS = { ko: '', en: '/en' };

// scope
// src/message/bizgo/v1/<endpoint>/<METHOD>
const ENDPOINTS = new Set([
	'POST /api/comm/v1/send/omni',
	'POST /api/comm/v1/reservation',
	'GET /api/comm/v1/reservation/list',
	'GET /api/comm/v1/reservation/resvKey/{resvKey}',
	'PUT /api/comm/v1/reservation/resvKey/{resvKey}',
	'POST /api/comm/v1/reservation/resvKey/{resvKey}/cancel',
	'POST /api/comm/v1/reservation/resvKey/{resvKey}/stop',
	'POST /api/comm/v1/reservation/resvKey/{resvKey}/resume',
	'POST /api/comm/v1/reservation/resvKey/{resvKey}/destinations',
	'GET /api/comm/v1/reservation/resvKey/{resvKey}/destinations',
	'DELETE /api/comm/v1/reservation/resvKey/{resvKey}/destinations/msgKey/{msgKey}',
]);
// channels in src/message/bizgo/v1/channels, and the reservation management endpoints
const PAGES = [
	'comm/international',
	'comm/kakao-alimtalk',
	'comm/kakao-brand',
	'comm/mt',
	'comm/naver-talktalk',
	'comm/rcs',
	'comm/reservation',
];

// parsing
const GROUPS = new Set([
	'Header',
	'Header Parameters',
	'Path Parameters',
	'Query Parameters',
	'Body Parameters',
	'Returns',
]);
const METHOD = /^(GET|POST|PUT|DELETE|PATCH)$/;
// e.g. String, Object Array, String(40). Unlisted types fall back to all labels but Required.
const TYPE = /^(String|Object|Integer|Long|Number|Double|Boolean|Binary)( Array)?(\(\d+\))?$/;
const REQUIRED = new Set(['Required', '필수']);
// Trailing tokens in llms descriptions (e.g. "min: 10 max: 86400 default: 180").
// The web pages don't render them, and llms-en words them differently (e.g. "1300자" vs
// "1300 characters"), so they're only taken from llms-ko and not compared.
const CONSTRAINTS = ['min', 'max', 'length', 'default', 'format'];
const TOKEN = /\b(min|max|length|default|format|example): /;

const parseConstraints = (description: string) => {
	// e.g. "format: Y or N (default: Y)" -> "format: Y or N default: Y"
	const parts = description.replace(/\((\w+: [^()]*)\)/g, ' $1').split(TOKEN);
	const values = new Map<string, string>();
	// a key can repeat (e.g. "max: 18 characters (WIDE) max: 12 characters (otherwise)")
	for (let i = 1; i < parts.length; i += 2) {
		const [key = '', value = ''] = [parts[i], parts[i + 1]?.trim()];
		values.set(key, values.has(key) ? `${values.get(key)}; ${value}` : value);
	}
	return CONSTRAINTS.map((key) => values.get(key) ?? '').join('\t');
};

// output
const HEADER = [
	'page',
	'endpoint',
	'section',
	'group',
	'path',
	'type',
	'required',
	...CONSTRAINTS,
].join('\t');
const SNAPSHOT_PATH = join(import.meta.dirname, 'docs.tsv');
const ASSERTIONS_PATH = join(import.meta.dirname, 'assertions.ts'); // uses checker.ts

type Row = string; // tab-separated HEADER columns, without CONSTRAINTS

// Collects a page's fields for ENDPOINTS. A page can document one more than once
// (e.g. per message type), so each occurrence is numbered (e.g. "#2")
// and its heading is kept in `titles` (e.g. "SMS(단문메시지) 발송").
const createPage = (name: string) => {
	const rows = new Set<Row>();
	const duplicates: Row[] = []; // listed more than once in the same occurrence
	const constraints = new Map<Row, string>(); // tab-separated CONSTRAINTS columns
	const titles: { method: string; title: string }[] = [];
	let title: string | undefined; // e.g. "SMS(단문메시지) 발송"
	let method: string | undefined; // e.g. "POST /api/comm/v1/send/omni"
	let occurrence: string | undefined; // e.g. "#2"
	let group: string | undefined; // e.g. "Body Parameters"
	let count = 0;

	return {
		rows,
		duplicates,
		constraints,
		titles,
		heading: (text: string) => {
			title = text;
			method = occurrence = group = undefined;
		},
		method: (verb: string, url: string) => {
			method = `${verb} ${url}`;
		},
		group: (label: string | undefined) => {
			group = label;
		},
		field: (path: string, type: string, required: boolean, description?: string) => {
			if (!group || !method || !ENDPOINTS.has(method)) return;
			if (!occurrence) {
				occurrence = `#${++count}`;
				titles.push({ method, title: title ?? '' });
			}
			const row = [name, method, occurrence, group, path, type, required ? 'Yes' : 'No'].join('\t');
			if (rows.has(row)) duplicates.push(row);
			rows.add(row);
			if (description !== undefined) constraints.set(row, parseConstraints(description));
		},
	};
};

const parseWeb = (name: string, html: string) => {
	const page = createPage(name);
	const { document } = parseHTML(html);
	// in document order: headings, method badges (<span>POST</span><span>/url</span>), group labels, fields
	// h4 and below end the group, matching `####` in parseLlms
	for (const el of document.querySelectorAll(
		'h2[id], h3[id], h4, h5, h6, div > span:first-child, p',
	)) {
		const text = el.textContent.trim();
		if (el.tagName === 'H2' || el.tagName === 'H3') {
			page.heading(text);
		} else if (/^H[4-6]$/.test(el.tagName)) {
			page.group(undefined);
		} else if (el.tagName === 'SPAN') {
			const url = el.nextElementSibling;
			if (url?.tagName === 'SPAN' && METHOD.test(text)) page.method(text, url.textContent.trim());
		} else if (el.hasAttribute('data-spec-name')) {
			// field name, followed by label badges (e.g. <span>String</span><span>Required</span>)
			const labels: string[] = [];
			for (let sib = el.nextElementSibling; sib?.tagName === 'SPAN'; sib = sib.nextElementSibling) {
				labels.push(sib.textContent.trim());
			}
			const rest = labels.filter((label) => !REQUIRED.has(label));
			const type = rest.find((label) => TYPE.test(label)) ?? (rest.join(' ') || '?');
			page.field(el.getAttribute('data-spec-name') ?? '', type, rest.length < labels.length);
		} else if (GROUPS.has(text)) {
			page.group(text);
		}
	}
	return page;
};

const parseLlms = (text: string) => {
	const pages = new Map<string, ReturnType<typeof createPage>>();
	let page: ReturnType<typeof createPage> | undefined;
	let method: string | undefined; // from "- Method:", used by the following "- URL:"
	for (const line of text.split(/\r?\n/)) {
		let m;
		if (line.startsWith('URL: ')) {
			const name = line.match(/\/api-sdk\/api-reference\/(.+)$/)?.[1] ?? '';
			page = PAGES.includes(name) ? createPage(name) : undefined;
			if (page) pages.set(name, page);
			method = undefined;
		} else if (!page) {
			continue;
		} else if ((m = line.match(/^#{2,3} (.+)$/))) {
			const heading = m[1]?.trim() ?? '';
			if (GROUPS.has(heading)) page.group(heading);
			else if (heading.endsWith(' example')) page.group(undefined);
			else {
				page.heading(heading);
				method = undefined;
			}
		} else if (line.startsWith('#')) {
			page.group(undefined);
		} else if ((m = line.match(/^- Method: `(\w+)`/))) {
			method = m[1];
		} else if ((m = line.match(/^- URL: `(.+)`/)) && method) {
			page.method(method, m[1] ?? '');
			method = undefined;
		} else if ((m = line.match(/^\| `([^`]+)` \| ([^|]+?) \| (Yes|No) \|(.*)\|\s*$/))) {
			page.field(m[1] ?? '', m[2] ?? '', m[3] === 'Yes', m[4] ?? '');
		}
	}
	return pages;
};

const get = async (path: string) => {
	const res = await fetch(ORIGIN + path);
	if (!res.ok) throw new Error(`${res.status} ${ORIGIN + path}`);
	return res.text();
};

const fetchSources = async (lang: string, prefix: string) => {
	const [llms, ...web] = await Promise.all([
		get(`${prefix}/llms-full.txt`),
		...PAGES.map((name) => get(`${prefix}/api-sdk/api-reference/${name}`)),
	]);
	const llmsPages = parseLlms(llms);
	return [
		[`web-${lang}`, PAGES.map((name, i) => parseWeb(name, web[i] ?? ''))],
		[`llms-${lang}`, PAGES.map((name) => llmsPages.get(name) ?? createPage(name))],
	] as const;
};

const parsed = new Map(
	(
		await Promise.all(Object.entries(LANGS).map(([lang, prefix]) => fetchSources(lang, prefix)))
	).flat(),
);
const sources = new Map(
	[...parsed].map(([source, pages]) => [source, new Set(pages.flatMap((page) => [...page.rows]))]),
);

// One row per distinct field, in document order. A row missing from earlier sources
// is inserted after the row that precedes it in its own source.
const rows: Row[] = [];
for (const source of sources.values()) {
	let at = 0;
	for (const row of source) {
		const i = rows.indexOf(row);
		if (i === -1) rows.splice(at++, 0, row);
		else at = i + 1;
	}
}
const constraints = new Map((parsed.get('llms-ko') ?? []).flatMap((page) => [...page.constraints]));
const drift = [
	...rows.flatMap((row) => {
		const missing = [...sources].filter(([, rows]) => !rows.has(row)).map(([source]) => source);
		return missing.length ? [`${row}\tmissing from ${missing.join(', ')}`] : [];
	}),
	...[...parsed].flatMap(([source, pages]) =>
		pages.flatMap((page) => page.duplicates.map((row) => `${row}\tduplicated in ${source}`)),
	),
];

// The snapshot labels each occurrence by its llms-ko heading instead of its number,
// so adding or removing a section doesn't renumber the rows after it.
// A heading repeated for the same endpoint on a page keeps the number, so its occurrences stay distinct.
const titles = new Map(
	(parsed.get('llms-ko') ?? []).flatMap((page, i) =>
		page.titles.map(({ method, title }, n) => {
			const same = page.titles.filter((t) => t.method === method && t.title === title);
			return [`${PAGES[i]}\t#${n + 1}` as string, same.length === 1 ? title : ''] as const;
		}),
	),
);
const label = (row: Row) => {
	const [page, method, occurrence, ...rest] = row.split('\t');
	const values = constraints.get(row);
	const empty = CONSTRAINTS.map(() => '').join('\t');
	const section = titles.get(`${page}\t${occurrence}`) || occurrence;
	return [page, method, section, ...rest, values ?? empty].join('\t');
};

const next = [HEADER, ...rows.map(label)].join('\n') + '\n';
const previous = await readFile(SNAPSHOT_PATH, 'utf8').catch(() => '');
await writeFile(SNAPSHOT_PATH, next);

// Documented paths per endpoint and group, to find fields the types have but the docs don't.
const documented = [
	...new Set(
		rows.map((row) => {
			const [, endpoint, , group, path] = label(row).split('\t');
			return `${endpoint} | ${group} | ${path}`;
		}),
	),
];

// One assertion per row, so `tsc` reports where the hand-written types differ from the snapshot.
const literal = (value = '') => `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
const assertions = rows.map((row) => {
	const [page, endpoint, section, group, path, type, required] = label(row).split('\t');
	const args = [page, endpoint, section, group, path, type?.replace(/\(\d+\)$/, ''), required];
	return `\tAssertTrue<Check<${args.map(literal).join(', ')}>>,`;
});
await writeFile(
	ASSERTIONS_PATH,
	[
		'// Generated by docs.ts. Do not edit.',
		`import type { AssertNever, AssertTrue, Check, Extra } from './checker.ts';`,
		'',
		'export type Checks = [',
		...assertions,
		'];',
		'',
		'type Documented =',
		...documented.map((key) => `\t| ${literal(key)}`),
		';',
		'',
		'export type Extras = [',
		...[...new Set(documented.map((key) => key.split(' | ').slice(0, 2).join(' | ')))]
			.filter((key) => !key.endsWith(' | Path Parameters'))
			.map(
				(key) => `\tAssertNever<Extra<${key.split(' | ').map(literal).join(', ')}, Documented>>,`,
			),
		'];',
	].join('\n') + '\n',
);

console.log(`${rows.length} fields from ${[...sources.keys()].join(', ')}`);
if (drift.length) {
	console.error(`${drift.length} fields differ:\n${drift.join('\n')}`);
	process.exitCode = 1;
}
if (previous !== next) {
	console.error('Snapshot changed: review and commit cli/bizgo/docs.tsv');
	process.exitCode = 1;
}
