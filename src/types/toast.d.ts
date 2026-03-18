import type { JSX } from "react"

export type ToastType = "success" | "error" | "loading" | "default" | "info" | "warning"

export type ToastPositions = "bottom-left" | "bottom-right" | "top-left" | "top-right"

export type closeOptions = "button" | "swipe" | "both" | "none"

export type ToastStyles = Partial<CSSStyleDeclaration> & {
	[key: string]: string | undefined
}
export type ToastPromiseMessages = {
	success?: string
	error?: string
	loading?: string
}

export type ToastOptions = {
	title?: string
	type?: ToastType
	duration?: number
	className?: string
	icon?: HTMLElement | string | any | JSX.Element
	styles?: ToastStyles
	close?: closeOptions
}

export type ToastDefaults = {
	position: ToastPositions
}

export type Toast = {
	id: string
	title?: string
	message: string
	options: ToastOptions
	rendered: boolean
}

export type ToastState = {
	toasts: Toast[]
}
