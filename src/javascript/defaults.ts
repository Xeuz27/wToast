export var defaults = {
	positions: "bottom-right",
}
export function defaultOptions(options: any) {
	return {
		...defaults,
		...options,
	}
}
