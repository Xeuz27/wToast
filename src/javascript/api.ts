import type { ToastOptions } from "../types/toast"
import { createToast, deleteToast, updateToast } from "./render"

export function wToast() {
	return {
		show: (message: string, options: ToastOptions = {}) => {
			const toast = createToast(message, options)

			setTimeout(() => {
				deleteToast(toast.id)
			}, toast.options.duration)
		},
		//prettier-ignore
		promise: async <T>( promise: Promise<T>, messages: { loading: string; success: string; error: string }, options: ToastOptions = {} ) => { 
            const loadingToast = createToast(messages.loading, { ...options, type: "loading" })
            try {
                const result = await promise
                updateToast(loadingToast.id, messages.success, {...loadingToast.options, type: 'success'})
                return result
            } catch (err) {
                updateToast(loadingToast.id, messages.error, {...loadingToast.options, type: 'error'})
                // throw err
            }
            //  finally {
            //     console.log('asd')
            //     // deleteToast(loadingId)
            // }
        },
	}
}
