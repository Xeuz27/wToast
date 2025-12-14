import type { ToastOptions, ToastPromiseMessages } from "../types/toast.d.ts"
import { toastPromise } from "./classes/toastPromise.ts"
import { createToast } from "./core/createToast.ts"
import { startTimer } from "./core/timeManagement.ts"

export function wToast() {
	return {
		show: (message: string, options: ToastOptions = {}): void => {
			const toast = createToast(message, options)

			startTimer(toast)
		},
		promise: <T>(
			promise: Promise<T>,
			messages: ToastPromiseMessages,
			options: ToastOptions = {}
		): toastPromise<T> => {
			return new toastPromise(promise, messages, options)
		},
	}
}
