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
	private onRejectCallback?: (error: unknown) => void

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

	onResolve(config: ToastOptions, callback: (data: any) => void) {
		// if (typeof config === ToastOptions)
		this.onResolveConfig = { ...this.onResolveConfig, ...config }
		if (callback) {
			console.log(callback, " on resolve callback")
			this.onResolveCallback = callback
		}
		return this
	}

	onReject(config: ToastOptions = {}, callback?: (error: unknown) => void) {
		this.onRejectConfig = { ...this.onRejectConfig, ...config }
		if (callback) {
			this.onRejectCallback = callback
		}
		return this
	}

	async run(): Promise<[unknown | null, T | null]> {
		const loadingToast = createToast(this.messages.loading!, {
			...this.options,
			type: "loading",
		})
		return this.promise
			.then((result) => {
				updateToast(loadingToast.id, this.messages.success!, {
					...loadingToast.options,
					...this.onResolveConfig,
					type: "success",
				})
				if (this.onResolveCallback) {
					this.onResolveCallback(`result: ${result}`)
				}
				return result
			})
			.catch((error) => {
				updateToast(loadingToast.id, this.messages.error!, {
					...loadingToast.options,
					...this.onRejectConfig,
					type: "error",
				})
				if (this.onRejectCallback) {
					error = {
						message: "algo",
					}
					//@ts-ignore
					this.onRejectCallback("error:", error)
				}
				return error
			})
	}
}
