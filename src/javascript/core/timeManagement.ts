import type { Toast } from "../../types/toast.js"
import { updateTimerDisplay } from "../dom/styling.ts"
import { deleteToast } from "./deleteToast.ts"

const intervalo = 50 // en milisegundos. a mas bajo el numero, mas preciso el timer, pero tambien mas pesado cuantos mas timers haya.
type toastTimer = {
	remaining: number | undefined
	duration: number | undefined
	interval?: number | undefined
	originalDuration?: number | undefined
	// onFinish?: undefined | (() => void)
}
type timers = {
	[key: string]: toastTimer
}

const timers: timers = {} // aquí vive el estado de todos los toasts

export const startTimer = (toast: Toast) =>
	// , onFinish?: () => void
	{
		if (timers[toast.id]) return // ya existe

		let toastTimer: toastTimer = {
			remaining: toast.options.duration,
			duration: toast.options.duration,
			// onFinish,
		}

		timers[toast.id] = toastTimer

		toastTimer.interval = setInterval(() => {
			toastTimer.remaining = toastTimer.remaining! - intervalo
			updateTimerDisplay(toast.id, toastTimer.duration!, toastTimer.remaining)
			if (toastTimer.remaining! <= 0) {
				deleteToast(toast.id)
				clearInterval(toastTimer.interval)
				delete timers[toast.id]
				// toastTimer.onFinish?.()
			}
		}, intervalo)
	}

export const pauseTimer = (toastId: string) => {
	let timer = timers[toastId]
	if (!timer) return

	if (!timer.originalDuration) {
		timer.originalDuration = timer.duration
	}
	timer.duration = timer.remaining
	clearInterval(timer.interval)
}
export const resumeTimer = (toastId: string) => {
	let timer = timers[toastId]
	if (!timer) return

	timer.interval = setInterval(() => {
		timer.remaining = timer.remaining! - intervalo
		//prettier-ignore
		updateTimerDisplay(toastId, timer.originalDuration!, timer.remaining)

		if (timer.remaining! <= 0) {
			deleteToast(toastId)
			clearInterval(timer.interval)
			delete timers[toastId]
			// toastTimer.onFinish?.()
		}
	}, intervalo)
}
export const stopTimer = (toastId: string) => {
	let timer = timers[toastId]
	if (!timer) return

	deleteToast(toastId)
	clearInterval(timer.interval)
	delete timers[toastId]
}
