export type ToastType = "success" | "error" | "loading" | "default"

export type ToastOptions = {
	type?: ToastType
	duration?: number
	className?: string
	icon?: HTMLElement | string
}

export type Toast = {
	id: string
	message: string
	options: ToastOptions
	rendered: boolean
}

export type ToastState = {
	toasts: Toast[]
}
