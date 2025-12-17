export function createContainer() {
	const container = document.createElement("div")
	container.className = "toasts-container"
	document.body.appendChild(container)
	return container
}
