import type { ToastOptions, ToastPromiseMessages } from "../types/toast"
import { createToast, updateToast } from "./render"

export var defaults = {
	positions: "bottom-right",
}
export function defaultOptions(options: any) {
	return {
		...defaults,
		...options,
	}
}
export class toastPromise<T> {
	private promise: Promise<T>
	private messages: ToastPromiseMessages
	private options: ToastOptions

	private onResolveConfig: ToastOptions
	private onRejectConfig: ToastOptions

	private onResolveCallback?: (data: any) => void
	private onRejectCallback?: (error: Error) => void

	constructor(
		promise: Promise<T>,
		messages: ToastPromiseMessages,
		options?: ToastOptions,

		onResolveConfig?: ToastOptions,
		onRejectConfig?: ToastOptions
	) {
		this.promise = promise
		this.messages = messages
		this.options = options || {}

		this.onResolveConfig = onResolveConfig || {}
		this.onRejectConfig = onRejectConfig || {}

		this.onResolveCallback = this.onResolveCallback || function () {}
		this.onRejectCallback = this.onRejectCallback || function () {}

		// no ejecutar despues de los tiempos de sleep()
		this.run()
	}

	/*function overloads */
	onResolve(config: ToastOptions): this
	onResolve(callback: (data: unknown) => void): this
	onResolve(config: ToastOptions, callback: (data: unknown) => void): this
	//prettier-ignore
	onResolve(configOrCallback: ToastOptions | ((data: unknown) => void) = {}, maybeCallback?: (data: unknown) => void) {
		typeof configOrCallback === "object"
			? (this.onResolveConfig = {
					...this.onResolveConfig,
					...configOrCallback,
				})
			: (this.onResolveCallback = configOrCallback)
		maybeCallback && (this.onResolveCallback = maybeCallback)
		return this
	}
	/*function overloads */
	onReject(config: ToastOptions): this
	onReject(callback: (error: Error) => void): this
	onReject(config: ToastOptions, callback: (error: Error) => void): this
	//prettier-ignore
	onReject(configOrCallback: ToastOptions | ((error: Error) => void) = {}, maybeCallback?: (error: Error) => void) {
		typeof configOrCallback === "object"
			? (this.onRejectConfig = {
					...this.onRejectConfig,
					...configOrCallback,
				})
			: (this.onRejectCallback = configOrCallback)
		maybeCallback && (this.onRejectCallback = maybeCallback)
		return this
	}

	async run(): Promise<[null, T] | [Error, null]> {
		const loadingToast = createToast(this.messages.loading!, {
			...this.options,
			type: "loading",
		})
		return this.promise
			.then((result): [null, T] => {
				updateToast(loadingToast.id, this.messages.success!, {
					...loadingToast.options,
					...this.onResolveConfig,
					type: "success",
				})
				if (this.onResolveCallback) {
					this.onResolveCallback(result)
				}
				return [null, result]
			})
			.catch((error: Error): [Error, null] => {
				updateToast(loadingToast.id, this.messages.error!, {
					...loadingToast.options,
					...this.onRejectConfig,
					type: "error",
				})
				if (this.onRejectCallback) {
					this.onRejectCallback(error)
				}
				return [error, null]
			})
	}
}
