export const $ = (string: string) => document.getElementById(string)
export const $$ = (string: string) => document.querySelectorAll(string)

let trueOrFalse = 1
export const sleep = async (ms: number) => {
	if (trueOrFalse % 2 === 0) {
		trueOrFalse += 1
		await new Promise((resolve, reject) => setTimeout(reject, ms))
	} else {
		trueOrFalse += 1
		await new Promise((resolve, reject) => setTimeout(resolve, ms))
	}
}
