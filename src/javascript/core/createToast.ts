import type { Toast, ToastOptions } from "../../types/toast.js"

import { error } from "../../assets/icons/error.ts"
import { info } from "../../assets/icons/info.ts"
import { loading } from "../../assets/icons/loading.ts"
import { success } from "../../assets/icons/success.ts"
import { warning } from "../../assets/icons/warning.ts"
import { renderToast } from "../dom/renderToast.ts"
import { addToastToState } from "../state.ts"

export const whatIcon = (type: string) => {
	let icon: any = {
		default: "",
		info: info,
		warning: warning,
		loading: loading,
		success: success,
		error: error,
	}
	//pasar 3 iconos en promesa, 1 solo en show?
	let rawSVG = icon[type]
	return rawSVG
}
export function createToast(message: string, options: ToastOptions = {}) {
	const id = crypto.randomUUID().slice(0, 6)
	// (if no icon no icon render?)
	const toast: Toast = {
		id: id,
		message: message,
		options: {
			title: options.title || "",
			type: options.type || "default",
			duration: options.duration || 3000,
			className: options.className || "",
			icon: options.icon || whatIcon(options.type || "default"),
			styles: options.styles || {},
		},
		rendered: false,
	}

	addToastToState(toast)
	renderToast(toast)

	return toast
}
