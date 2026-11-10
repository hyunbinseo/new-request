// Checks that Bizgo's web API reference and llms-full.txt describe the same fields
// for the wrapped endpoint, and snapshots them (no prose) to track upstream changes.
// https://github.com/hyunbinseo/new-request/issues/18

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseHTML } from 'linkedom';

// source
const ORIGIN = 'https://developers.bizgo.io';
const LANGS = { ko: '', en: '/en' };

// scope
const ENDPOINT = 'POST /api/comm/v1/send/omni';
// linked from src/message/bizgo/v1/channels
const PAGES = [
	'comm/kakao-alimtalk',
	'comm/kakao-brand',
	'comm/mt',
	'comm/naver-talktalk',
	'comm/rcs',
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
// The web pages don't render them, so they're only compared between llms sources.
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
const HEADER = ['page', 'section', 'group', 'path', 'type', 'required', ...CONSTRAINTS].join('\t');
const SNAPSHOT_PATH = join(import.meta.dirname, 'docs.tsv');

type Row = string; // tab-separated HEADER columns, without CONSTRAINTS

// Collects a page's fields for ENDPOINT. A page can document it more than once
// (e.g. per message type), so each occurrence is numbered (e.g. "POST /api/... #2")
// and its heading is kept in `titles` (e.g. "Send an SMS (short message)").
const createPage = (name: string) => {
	const rows = new Set<Row>();
	const duplicates: Row[] = []; // listed more than once in the same occurrence
	const constraints = new Map<Row, string>(); // tab-separated CONSTRAINTS columns
	const titles: string[] = [];
	let title: string | undefined; // e.g. "Send an SMS (short message)"
	let method: string | undefined; // e.g. "POST /api/comm/v1/send/omni"
	let endpoint: string | undefined; // e.g. "POST /api/comm/v1/send/omni #2"
	let group: string | undefined; // e.g. "Body Parameters"
	let count = 0;

	return {
		rows,
		duplicates,
		constraints,
		titles,
		heading: (text: string) => {
			title = text;
			method = endpoint = group = undefined;
		},
		method: (verb: string, url: string) => {
			method = `${verb} ${url}`;
		},
		group: (label: string | undefined) => {
			group = label;
		},
		field: (path: string, type: string, required: boolean, description?: string) => {
			if (!group || method !== ENDPOINT) return;
			if (!endpoint) {
				endpoint = `${ENDPOINT} #${++count}`;
				titles.push(title ?? '');
			}
			const row = [name, endpoint, group, path, type, required ? 'Yes' : 'No'].join('\t');
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
const constraints = [...parsed]
	.filter(([source]) => source.startsWith('llms-'))
	.map(([source, pages]) => {
		const map = new Map(pages.flatMap((page) => [...page.constraints]));
		return [source, map] as const;
	});
const drift = [
	...rows.flatMap((row) => {
		const missing = [...sources].filter(([, rows]) => !rows.has(row)).map(([source]) => source);
		return missing.length ? [`${row}\tmissing from ${missing.join(', ')}`] : [];
	}),
	...rows.flatMap((row) => {
		const values = constraints.filter(([, map]) => map.has(row));
		const differ = new Set(values.map(([, map]) => map.get(row))).size > 1;
		return differ
			? [
					`${row}\tconstraints differ: ${values.map(([s, map]) => `${s}=${map.get(row)?.replaceAll('\t', '|')}`).join(', ')}`,
				]
			: [];
	}),
	...[...parsed].flatMap(([source, pages]) =>
		pages.flatMap((page) => page.duplicates.map((row) => `${row}\tduplicated in ${source}`)),
	),
];

// The snapshot labels each occurrence by its llms-en heading instead of its number,
// so adding or removing a section doesn't renumber the rows after it.
// A heading repeated on the same page keeps the number, so its occurrences stay distinct.
const titles = new Map(
	(parsed.get('llms-en') ?? []).flatMap((page, i) =>
		page.titles.map((title, n) => {
			const unique = page.titles.indexOf(title) === page.titles.lastIndexOf(title);
			return [`${PAGES[i]}\t${ENDPOINT} #${n + 1}` as string, unique ? title : ''] as const;
		}),
	),
);
// Constraints also come from llms-en, matching the titles. Differences are reported as drift.
const label = (row: Row) => {
	const [page, endpoint, ...rest] = row.split('\t');
	const values = (constraints.find(([source, map]) => source === 'llms-en' && map.has(row)) ??
		constraints.find(([, map]) => map.has(row)))?.[1].get(row);
	const empty = CONSTRAINTS.map(() => '').join('\t');
	return [page, titles.get(`${page}\t${endpoint}`) || endpoint, ...rest, values ?? empty].join(
		'\t',
	);
};

const next = [HEADER, ...rows.map(label)].join('\n') + '\n';
const previous = await readFile(SNAPSHOT_PATH, 'utf8').catch(() => '');
await writeFile(SNAPSHOT_PATH, next);

console.log(`${rows.length} fields from ${[...sources.keys()].join(', ')}`);
if (drift.length) {
	console.error(`${drift.length} fields differ:\n${drift.join('\n')}`);
	process.exitCode = 1;
}
if (previous !== next) {
	console.error('Snapshot changed: review and commit cli/bizgo/docs.tsv');
	process.exitCode = 1;
}
