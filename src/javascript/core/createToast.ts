import type { Toast, ToastOptions } from "../../types/toast.js"

import { renderToast } from "../dom/renderToast.ts"
import { addToastToState } from "../state.ts"

export function createToast(message: string, options: ToastOptions = {}) {
	const id = crypto.randomUUID().slice(0, 6)
	const toast: Toast = {
		id: id,
		message: message,
		options: {
			title: options.title || "",
			type: options.type || "default",
			duration: options.duration || 3000,
			className: options.className || "",
			icon: options.icon || "",
			styles: options.styles || {},
		},
		rendered: false,
	}

	addToastToState(toast)
	renderToast(toast)

	return toast
}
