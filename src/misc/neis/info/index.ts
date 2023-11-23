import type { Options, ResponseBody, SearchParams } from './types.js';

const keyRelations = [
	['pageSize', 'pSize'],
	['educationOffice', 'ATPT_OFCDC_SC_CODE'],
	['code', 'SD_SCHUL_CODE'],
	['name', 'SCHUL_NM'],
	['foundedName', 'FOND_SC_NM'],
	['type', 'SCHUL_KND_SC_NM'],
	['region', 'LCTN_SC_NM'],
] as const;

export const searchSchools = async (params: SearchParams, opts: Options) => {
	const url = new URL('https://open.neis.go.kr/hub/schoolInfo');
	const searchParams = new URLSearchParams({ Type: 'json', KEY: opts.apiKey });

	if (params.pageIndex)
		searchParams.append('pIndex', (params.pageIndex + 1).toString());

	for (const [key, queryKey] of keyRelations) {
		const value = params[key];
		if (value) searchParams.append(queryKey, value.toString());
	}

	url.search = searchParams.toString();

	try {
		// response.status is always 200
		const response = await (opts.fetch || fetch)(url);
		const body = (await response.json()) as ResponseBody;
		const result = body.RESULT || body.schoolInfo[0].head[1].RESULT;
		const ok = result.CODE === 'INFO-000' || result.CODE === 'INFO-200';
		const schools = body.schoolInfo?.[1].row || [];
		return { ok, result, schools } as const;
	} catch (error) {
		return error instanceof Error ? error : new Error();
	}
};
