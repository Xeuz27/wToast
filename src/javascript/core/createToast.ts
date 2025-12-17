import type { Toast, ToastOptions } from "../../types/toast.js"

import error from "../../assets/icons/error.svg"
import { renderToast } from "../dom/renderToast.ts"
import { addToastToState } from "../state.ts"

const whatIcon = (type: string) => {
	let icon: any = {
		default: "",
		loading: error,
		success: "",
		error: error,
	}
	//pasar 3 iconos en promesa, 1 solo en show?
	console.log(icon[type], "sad", type)
	return icon[type]
}
export function createToast(message: string, options: ToastOptions = {}) {
	const id = crypto.randomUUID().slice(0, 6)
	// console.log(whatIcon(options.type || "default"), "dsadasd")
	const toast: Toast = {
		id: id,
		message: message,
		options: {
			title: options.title || "",
			type: options.type || "default",
			duration: options.duration || 3000,
			className: options.className || "",
			// icon: whatIcon(options.type || "default"),
			styles: options.styles || {},
		},
		rendered: false,
	}

	addToastToState(toast)
	renderToast(toast)

	return toast
}
