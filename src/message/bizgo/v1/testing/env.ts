import { env } from 'node:process';
import {
	digits,
	entriesFromList,
	maxLength,
	minLength,
	object,
	optional,
	parse,
	pipe,
	regex,
	startsWith,
	string,
	transform,
	union,
} from 'valibot';

const keys = [
	'BIZGO_API_KEY',
	'BIZGO_DESTINATION_PHONE_NUMBER',
	'BIZGO_KAKAO_SENDER_KEY',
	'BIZGO_KAKAO_TEMPLATE_CODE',
] as const;

const SandboxEnvSchema = pipe(
	object(
		entriesFromList(
			keys,
			pipe(
				optional(string()),
				transform((v) => v || undefined),
			),
		),
	),
	object({
		BIZGO_API_KEY: optional(pipe(string(), startsWith('mars_'))),
		BIZGO_DESTINATION_PHONE_NUMBER: optional(
			union([
				pipe(string(), digits(), startsWith('01'), minLength(10), maxLength(11)),
				pipe(
					string(),
					// See https://github.com/hyunbinseo/new-request/issues/15
					regex(/^\+?[1-9]\d{1,14}$/), // E.164 with optional '+'
				),
			]),
		),
		BIZGO_KAKAO_SENDER_KEY: optional(string()),
		BIZGO_KAKAO_TEMPLATE_CODE: optional(string()),
	}),
	transform((v) => {
		if (
			!v.BIZGO_API_KEY ||
			!v.BIZGO_DESTINATION_PHONE_NUMBER ||
			!v.BIZGO_KAKAO_SENDER_KEY ||
			!v.BIZGO_KAKAO_TEMPLATE_CODE
		)
			return undefined;
		return {
			opts: {
				apiKey: v.BIZGO_API_KEY,
				baseURL: 'https://sandbox-mars.ibapi.kr' as const,
			},
			destinationPhoneNumber: v.BIZGO_DESTINATION_PHONE_NUMBER,
			kakao: {
				senderKey: v.BIZGO_KAKAO_SENDER_KEY,
				templateCode: v.BIZGO_KAKAO_TEMPLATE_CODE,
			},
		};
	}),
);

/** Undefined unless every sandbox variable is set. */
export const sandbox = parse(SandboxEnvSchema, env);
