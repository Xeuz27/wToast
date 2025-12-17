import type { Toast } from "../../types/toast.js"
import { pauseTimer, resumeTimer, stopTimer } from "../core/timeManagement.ts"
import { renderIcon, toastUnmounts } from "../renderers/index.ts"
import { createContainer } from "./createContainer.ts"
import { setStyles } from "./styling.ts"

export async function renderToast(toast: Toast) {
	if (toast.rendered) return
	const container =
		document.querySelector(".toasts-container") || createContainer()

	let toastContainer = document.createElement("div")
	toastContainer.id = toast.id
	toastContainer.className = `toast toast-${toast.options.type} ${toast.options.className || ""}`

	// isolar
	// isolar
	// isolar
	toastContainer.addEventListener("mouseenter", () => {
		pauseTimer(toast.id)
	})
	//hasta donde se el evento solo se agrega una vez, cleanup? ya las funciones evitan re correr si ya fueron creadas
	toastContainer.addEventListener("mouseleave", () => {
		resumeTimer(toast.id)
	})
	toastContainer.addEventListener("click", () => {
		//agregar icono de cerrar xd
		stopTimer(toast.id)
	})
	//isolar
	//isolar
	//isolar

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
	let timeLeftDiv = document.createElement("div")
	timeLeftDiv.classList.add("timeLeft")
	toastContainer.appendChild(timeLeftDiv)

	container.appendChild(toastContainer)

	toast.rendered = true
}
