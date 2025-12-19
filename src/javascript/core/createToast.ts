import type { Toast, ToastOptions } from "../../types/toast.js"

import arrowLoad from "../../assets/icons/arrow-load.svg?raw"
import circleCheck from "../../assets/icons/circle-check-big.svg?raw"
import error from "../../assets/icons/error.svg?raw"
import ok from "../../assets/icons/ok.svg?raw"
import { renderToast } from "../dom/renderToast.ts"
import { addToastToState } from "../state.ts"

export const whatIcon = (type: string) => {
	let icon: any = {
		default: ok,
		loading: arrowLoad,
		success: circleCheck,
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
			icon: whatIcon(options.type || "default"),
			styles: options.styles || {},
		},
		rendered: false,
	}

	addToastToState(toast)
	renderToast(toast)

	return toast
}
