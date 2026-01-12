
const REACT_ELEMENT_TYPE = Symbol.for("react.element")
const REACT_FORWARD_REF_ELEMENT_TYPE = Symbol.for("react.forward_ref")

export const isReactElement = (value: any) => {
	return (
		(value &&
			typeof value === "object" &&
			value.$$typeof === REACT_ELEMENT_TYPE) ||
		(value &&
			typeof value === "object" &&
			value.$$typeof === REACT_FORWARD_REF_ELEMENT_TYPE)
	)
}
export const renderReactElement = async (icon: any, container: HTMLElement) => {
	const { createRoot } = await import("react-dom/client")
	const root = createRoot(container)
	root.render(icon)
	//es necesario el async/await?
	// Return cleanup so toast can unmount later
	return () => root.unmount()
}
