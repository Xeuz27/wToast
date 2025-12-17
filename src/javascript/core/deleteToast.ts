import { toastUnmounts } from "../renderers/index.ts"
import { getState, removeToastFromState } from "../state.ts"

export function deleteToast(id: string) {
	//llamar toast(s) container
	let toastsContainerDiv = document.querySelector(".toasts-container")
	let toastContainerDiv = document.getElementById(id)

	if (toastContainerDiv) toastContainerDiv.remove()
	removeToastFromState(id)

	// call the unmount function if any
	const unmount = toastUnmounts.get(id)
	if (unmount) unmount()
	toastUnmounts.delete(id)

	let toasts = getState()
	if (toasts.length <= 0) toastsContainerDiv?.remove()
}
