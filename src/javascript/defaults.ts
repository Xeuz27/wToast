export var defaults = {
	positions: "bottom-right",
	close: "none",
}
export function defaultOptions(options: any) {
	return {
		...defaults,
		...options,
	}
}
