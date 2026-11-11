export const KST_OFFSET = 9 * 60 * 60 * 1000;

export const getFutureResvSendTime = (ms: number, from = new Date()) =>
	new Date(from.valueOf() + KST_OFFSET + ms) //
		.toISOString()
		.slice(0, 19)
		.replace('T', ' '); // yyyy-MM-dd HH:mm:ss
