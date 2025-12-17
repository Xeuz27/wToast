import { isReactElement, renderReactElement } from "./react.ts"

export const toastUnmounts = new Map() // id -> unmount function

export async function renderIcon(icon: any, container: any) {
	// --- STRING SVG / HTML ---
	if (typeof icon === "string") {
		container.innerHTML = icon
		return
	}

	// --- DOM NODE / ELEMENT ---
	if (typeof icon === "object" && icon instanceof Node) {
		container.appendChild(icon)
		return
	}
	// --- SVG ELEMENT? ---
	if (typeof icon === "object" && !(icon instanceof Node)) {
		let svg = document.createElement("img")
		svg.src = icon.src
		container.appendChild(svg)

		return
	}

	// --- REACT ELEMENT ---
	if (isReactElement(icon)) {
		return renderReactElement(icon, container)
	}

	console.warn("[wtoast]: Unsupported icon type:", icon)
}
