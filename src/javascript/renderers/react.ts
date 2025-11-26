const REACT_ELEMENT_TYPE = Symbol.for("react.element")

export const isReactElement = (value) => {
	return (
		value && typeof value === "object" && value.$$typeof === REACT_ELEMENT_TYPE
	)
}
export const renderReactElement = async (icon, container: HTMLElement) => {
	// Load ReactDOM dynamically (only when needed)
	const { createRoot } = await import("react-dom/client")

	const root = createRoot(container)
	root.render(icon)

	// Return cleanup so toast can unmount later
	return () => root.unmount()
}
