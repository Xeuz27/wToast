import type { Toast, ToastOptions } from "../types/toast"
import { $ } from "./helpers"
import { addToastToState, getState, removeToastFromState } from "./state"

export function createContainer() {
	const container = document.createElement("div")
	container.className = "toast-container"
	document.body.appendChild(container)
	return container
}

export function renderToast(toast: Toast) {
	if (toast.rendered) return
	const container =
		document.querySelector(".toast-container") || createContainer()

	const div = document.createElement("div")
	div.id = toast.id
	div.textContent = toast.message
	div.className = `toast toast-${toast.options.type} ${toast.options.className || ""}`

	container.appendChild(div)

	toast.rendered = true
}

export function createToast(message: string, options: ToastOptions = {}) {
	const id = crypto.randomUUID().slice(0, 6)
	const toast: Toast = {
		id: id,
		message: message,
		options: {
			type: options.type || "default",
			duration: options.duration || 3000,
			className: options.className || "",
			icon: options.icon || "",
		},
		rendered: false,
	}

	addToastToState(toast)
	renderToast(toast)

	return toast
}
export function updateToast(
	id: string,
	message: string,
	options: ToastOptions = {}
) {
	const toasts = getState()
	const toast = toasts.find((t) => id === t.id)

	const toastDiv = $(`${id}`)

	//prettier-ignore
	toastDiv!.classList.replace(`toast-${toast!.options.type}`,`toast-${options.type}`)
	toastDiv!.textContent = message
	toast!.message = message
	toast!.options = options

	setTimeout(
		() => deleteToast(id),
		(options.duration || toast?.options.duration || 0) + 1500
	)
}
export function deleteToast(id: string) {
	const toasts = getState()
	if (toasts.length < 1) document.querySelector(".toast-container")?.remove()

	const div = document.getElementById(id)
	if (div) div.remove()
	removeToastFromState(id)
}
