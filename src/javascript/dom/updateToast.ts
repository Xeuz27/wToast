import type { ToastOptions } from "../../types/toast.js"
import { whatIcon } from "../core/createToast.ts"
import { deleteToast } from "../core/deleteToast.ts"
import { startTimer } from "../core/timeManagement.ts"
import { renderIcon } from "../renderers/index.ts"
import { getState } from "../state.ts"
import { $ } from "../utils/helpers.ts"
import { setStyles } from "./styling.ts"

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

	let timeLeftDiv = document.createElement("div")
	timeLeftDiv.classList.add("timeLeft")
	toastDiv!.appendChild(timeLeftDiv)

	startTimer(toast!)

	//prettier-ignore
	toastDiv!.classList.replace(`toast-${toast!.options.type}`,`toast-${options.type}`)

	if (options.className) {
		if (options.className.split(" ").length > 1) {
			options.className.split(" ").map((c) => toastDiv!.classList.add(c))
		} else {
			toastDiv!.classList.add(options.className)
		}
	}

	if (options.icon) {
		renderIcon(
			whatIcon(options.type!),
			toastDiv!.querySelector("span.toast-icon")
		)
	}

	if (options.title) {
		let toastTitle = toastDiv!.querySelector("span.toast-title")
		if (toastTitle) {
			toastTitle.textContent = options.title
		} else {
			const title = document.createElement("span")
			title.className = "toast-title"
			title.textContent = options.title
			toastDiv!.querySelector("section.toast-content")?.prepend(title)
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
