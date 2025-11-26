import type { ToastStyles } from "../../types/toast.js"

//prettier-ignore
export const setStyles = (styles: ToastStyles | undefined, element: HTMLElement) => {
	for (var property in styles) {
		const value = styles[property]
		if (!value) return
		element.style.setProperty(property, value)
	}
}
