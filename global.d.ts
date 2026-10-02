// TODO Remove on @types/node@26.10 or later
declare module 'node:util' {
	function throttle<F extends (...args: never[]) => unknown>(
		fn: F,
		limit: number,
		interval: number,
		options?: { strict?: boolean },
	): (...args: Parameters<F>) => Promise<Awaited<ReturnType<F>>>;
}
