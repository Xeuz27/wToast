import type { Toast, ToastOptions, ToastStyles } from "../types/toast"
import { $ } from "./helpers"
import { addToastToState, getState, removeToastFromState } from "./state"

export function createContainer() {
	const container = document.createElement("div")
	container.className = "toast-container"
	document.body.appendChild(container)
	return container
}

const setStyles = (styles: ToastStyles | undefined, element: HTMLElement) => {
	for (var property in styles) {
		const value = styles[property]
		if (!value) return
		element.style.setProperty(property, value)
	}
}

export function renderToast(toast: Toast) {
	if (toast.rendered) return
	const container =
		document.querySelector(".toast-container") || createContainer()

	let toastContainer = document.createElement("div")
	toastContainer.id = toast.id
	toastContainer.className = `toast toast-${toast.options.type} ${toast.options.className || ""}`

	const { styles } = toast.options
	setStyles(styles, toastContainer)

	if (toast.options.title) {
		const toastContent = document.createElement("section")
		toastContent.className = "toast-content"

		const title = document.createElement("div")
		title.className = "toast-title"
		title.textContent = toast.options.title

		toastContainer.appendChild(title)
		toastContainer.appendChild(toastContent)
	}

	const toastMessage = document.createElement("p")
	toastMessage.textContent = toast.message
	toastContainer.appendChild(toastMessage)

	container.appendChild(toastContainer)

	toast.rendered = true
}

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
export function updateToast(
	id: string,
	message: string,
	options: ToastOptions = {}
) {
	const toasts = getState()
	const toast = toasts.find((t) => id === t.id)

	const toastDiv = $(`${id}`)

	const { styles } = toast!.options
	setStyles({ ...styles, ...options.styles }, toastDiv!)

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
