import type { Toast, ToastOptions, ToastStyles } from "../types/toast.d.ts"
import { $ } from "./helpers.js"
import { addToastToState, getState, removeToastFromState } from "./state.ts"

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

const toastUnmounts = new Map() // id -> unmount function

export async function renderToast(toast: Toast) {
	if (toast.rendered) return
	const container =
		document.querySelector(".toast-container") || createContainer()

	let toastContainer = document.createElement("div")
	toastContainer.id = toast.id
	toastContainer.className = `toast toast-${toast.options.type} ${toast.options.className || ""}`

	const { styles } = toast.options
	setStyles(styles, toastContainer)

	if (toast.options.icon) {
		const toastIcon = document.createElement("span")
		toastIcon.className = "toast-icon"
		const unmount = await renderIcon(toast.options.icon, toastIcon)
		toastContainer.append(toastIcon)
		// save unmount function by toast id
		toastUnmounts.set(toast.id, unmount)
	}

	if (toast.options.title) {
		const title = document.createElement("span")
		title.className = "toast-title"
		title.textContent = toast.options.title

		const toastContent = document.createElement("section")
		toastContent.className = "toast-content"

		toastContent.appendChild(title)

		const toastMessage = document.createElement("p")
		toastMessage.className = "toast-message"
		toastMessage.textContent = toast.message

		toastContent.appendChild(toastMessage)

		toastContainer.appendChild(toastContent)
	} else {
		const toastMessage = document.createElement("p")
		toastMessage.className = "toast-message"
		toastMessage.textContent = toast.message

		toastContainer.appendChild(toastMessage)
	}

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

	if (options.className) {
		if (options.className.split(" ").length > 1) {
			options.className.split(" ").map((c) => toastDiv!.classList.add(c))
		} else {
			toastDiv!.classList.add(options.className)
		}
	}

	if (options.title) {
		let toastTitle = toastDiv!.querySelector("span.toast-title")
		if (toastTitle) {
			toastTitle.textContent = options.title
		} else {
			const title = document.createElement("span")
			title.className = "toast-title"
			title.textContent = options.title

			toastDiv?.prepend(title)
		}
	} else {
		toastDiv!.querySelector("span.toast-title")?.remove()
	}

	toastDiv!.querySelector("p.toast-message")!.textContent = message
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

	// call the unmount function if any
	const unmount = toastUnmounts.get(id)
	if (unmount) unmount()
	toastUnmounts.delete(id)
}

const REACT_ELEMENT_TYPE = Symbol.for("react.element")

export function isReactElement(value: any) {
	return (
		value && typeof value === "object" && value.$$typeof === REACT_ELEMENT_TYPE
	)
}
export async function renderIcon(icon: any, container: any) {
	// --- STRING SVG / HTML ---
	if (typeof icon === "string") {
		container.innerHTML = icon
		return
	}

	// --- DOM NODE / ELEMENT ---
	if (icon instanceof Node) {
		container.appendChild(icon)
		return
	}

	// --- REACT ELEMENT ---
	if (isReactElement(icon)) {
		// Load ReactDOM dynamically (only when needed)
		const { createRoot } = await import("react-dom/client")

		const root = createRoot(container)
		root.render(icon)

		// Return cleanup so toast can unmount later
		return () => root.unmount()
	}

	console.warn("[wtoast]: Unsupported icon type:", icon)
}
