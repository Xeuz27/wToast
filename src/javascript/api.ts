import type { ToastOptions, ToastPromiseMessages } from "../types/toast.d.ts"
import { toastPromise } from "./defaults"
import { createToast, deleteToast } from "./render"

export function wToast() {
	return {
		show: (message: string, options: ToastOptions = {}): void => {
			const toast = createToast(message, options)

			setTimeout(() => {
				deleteToast(toast.id)
			}, toast.options.duration)
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
