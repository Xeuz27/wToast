export function createContainer() {
	const container = document.createElement("div")
	container.className = "toast-container"
	document.body.appendChild(container)
	return container
}
