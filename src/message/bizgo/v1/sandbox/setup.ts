import { env } from 'node:process';
import { is, literal, object, string } from 'valibot';
import { getReservations } from '#bizgo/v1/reservation/list/GET/index.ts';
import { sandboxOpts } from '#bizgo/v1/sandbox/fetch.ts';
import { getFutureResvSendTime } from '#bizgo/v1/sandbox/time.ts';

const ForbiddenSchema = object({
	common: object({
		authCode: literal('A403'),
		authResult: string(), // e.g. NOT_PERMISSION ACL Not Allowed. Please register: '<IP>'
	}),
});

// Stops the run before any test if this IP is not on the API key's allowlist.
export const globalSetup = async () => {
	const { BIZGO_API_KEY } = env;
	if (!BIZGO_API_KEY) return;

	const response = await getReservations(
		{ resvSendTime: getFutureResvSendTime(0), limit: 0 },
		{ ...sandboxOpts, apiKey: BIZGO_API_KEY },
	);
	if (!(response instanceof Error) && is(ForbiddenSchema, response.body))
		throw new Error(`Bizgo sandbox: ${response.body.common.authResult}`);
};
