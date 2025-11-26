import { toastUnmounts } from "../renderers/index.ts"
import { getState, removeToastFromState } from "../state.ts"

export function deleteToast(id: string) {
	const toasts = getState()
	if (toasts.length < 1) document.querySelector(".toast-container")?.remove()

	const div = document.getElementById(id)
	if (div) div.remove()
	removeToastFromState(id)

	// call the unmount function if any
	const unmount = toastUnmounts.get(id)
	if (unmount) unmount()
	toastUnmounts.delete(id)
}
