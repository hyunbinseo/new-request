import assert from 'node:assert/strict';
import type { BizgoResult } from '#bizgo/v1/response.ts';

/** Unwraps a result, failing with the response body unless the API accepted the request. */
export const expectOk = <Ok, Fail>(result: BizgoResult<Ok, Fail> | Error) => {
	if (result instanceof Error) throw result;
	assert.ok(result.ok, JSON.stringify(result.body));
	return result.body;
};
