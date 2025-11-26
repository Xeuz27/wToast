import type { Toast, ToastState } from "../types/toast.d.ts"

export let state: ToastState = {
	toasts: [],
}

const setState = (stateHandler: Function) => {
	state = stateHandler(state)
}
export function getState() {
	return state.toasts
}

export function addToastToState(toast: Toast) {
	setState(() => ({
		...state,
		toasts: [...state.toasts, toast],
	}))
}
export function removeToastFromState(id: string) {
	setState(() => ({
		...state,
		toasts: [...state.toasts.filter((t) => t.id !== id)],
	}))
}
