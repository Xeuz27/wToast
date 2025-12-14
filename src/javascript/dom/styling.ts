import type { ToastStyles } from "../../types/toast.js"

//prettier-ignore
export const setStyles = (styles: ToastStyles | undefined, element: HTMLElement) => {
	for (var property in styles) {
		const value = styles[property]
		if (!value) return
		element.style.setProperty(property, value)
	}
}
//prettier-ignore
export const updateTimerDisplay = ( toastId: string, durationMs: number, remaining: number ) => {
	let toast = document.getElementById(toastId)
	let timerDisplay = toast?.querySelector("div.timeLeft") as HTMLElement
	if (!timerDisplay) return
	timerDisplay.style.width = `${(remaining / durationMs) * 100}%`
}
