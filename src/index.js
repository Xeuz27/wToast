export * from "./javascript/api.ts"
export * from "./javascript/defaults.ts"
export * from "./javascript/helpers.ts"
export * from "./javascript/render.ts"
export * from "./javascript/state.ts"

export * from "./types/toast.d.ts"

// // import stylesUrl from "./index.css"
// import { wToast } from "./javascript/api.ts"
// import { $, $$ } from "./javascript/helpers.ts"

// const { show, promise } = wToast()

// const btn = $("toast-btn")
// const btnShow = $$("#toast-show")

// const a = async () => {
// 	// const promesa = sleep(2500)
// 	const promesa = fetch("https://dummyjson.com/users")
// 	try {
// 		//@ts-ignore
// 		let result = await promise(promesa, {
// 			loading: "Guardando producto...",
// 			success: "Producto guardado con éxito 🎉",
// 			error: "Error al guardar el producto 😞",
// 		})
// 		console.log(result)
// 	} catch (error) {
// 		console.error("Fallo al guardar", error)
// 	}
// }

// btnShow.forEach(function (btn) {
// 	btn.addEventListener("click", (e) => {
// 		show(e.target.innerText)
// 	})
// })

// btn.addEventListener("click", () => a())
//ORIGINAL
// const renderToast = (toasts = []) => {
// 	let container =
// 		document.querySelector(".toast-container") || document.createElement("div")

// 	container.classList = ["toast-container"]

// 	toasts.length >= 1 &&
// 		toasts.forEach(({ id, message, rendered, options = {} }) => {
// 			if (!rendered === false) return
// 			console.log(id, "=> rendered?", rendered)
// 			let toastDiv = document.createElement("div")
// 			toastDiv.classList.add("toast", `toast-${options.type || "default"}`)
// 			toastDiv.innerText = message
// 			toastDiv.id = id
// 			container.appendChild(toastDiv)

// 			setState((state) => ({
// 				...state,
// 				toasts: [
// 					...state.toasts.filter((toast) => toast.id !== id),
// 					{ id, message, rendered: true, options },
// 				],
// 			}))
// 		})
// 	toastsRoot.appendChild(container)
// }
// function deleteToast(id) {
// 	let toast = $(id)
// 	console.log(id, toast, "id, toast en deletToasts")
// 	toast.remove()

// 	if (state.toasts.length === 0) {
// 		$$(".toast-container")[0].remove()
// 	}
// }
// let state = {
// 	toasts: [],
// }
// let setState = (stateHandler) => {
// 	state = stateHandler(state)
// }
// let addToast = (message, options = {}) => {
// 	console.log(message, "message")
// 	delay += 100 // separa los timers un poco
// 	const id = crypto.randomUUID().slice(0, 6)
// 	//
// 	setState((state) => ({
// 		...state,
// 		toasts: [...state.toasts, { id, message, options, rendered: false }],
// 	}))
// 	//
// 	renderToast(state.toasts)

// 	requestAnimationFrame(() => {
// 		setTimeout(
// 			() => {
// 				setState((state) => ({
// 					...state,
// 					toasts: state.toasts.filter((toast) => toast.id !== id),
// 				}))
// 				console.count("delete", " delete count en add toast")
// 				deleteToast(id)
// 			},
// 			(options.duration || 3000) + delay
// 		)
// 	})
// 	setTimeout(() => {
// 		delay = 0
// 	}, 500)
// }
// setTimeout(
// 	() => console.log(state.toasts, "state.toasts en setTimeout en addtoasts"),
// 	5000
// )

//
//

//
//
//

//

//
//
//
//

//

//

// btn.addEventListener("click", () => {
// 	// const { show, promise } = initToastSystem()

// 	a()
// 	// show("asdasd54654")
// 	// addToast(crypto.randomUUID().slice(0, 6));
// 	// a()
// 	//   window.Toast.show("toast", { type: "info", duration: 2500 });
// })
// const ToastManager = () => {
//   //   const [toasts, setToasts] = useState([]);
//   addToast = (message, options = {}) => {
//     setToasts((prev) => [...prev, { id, message, ...options }]);
//     // setTimeout(
//     //   () => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
//     //   options.duration || 10000
//     // );
//   };
//   return createPortal(
//     <div className="toast-container">
//       {toasts.map((toast) => (
//         <div
//           className={`toast toast-${toast.type || "default"} `}
//           key={toast.id}
//         >
//           <div className="flex gap-2">
//             <span>{toast.message}</span>
//             <div className="animate-[spin_2.5s_linear_infinite]">
//               <Loader />
//             </div>
//           </div>
//           {toast.options?.description && (
//             <span>{toast.options.description}</span>
//           )}
//         </div>
//       ))}
//     </div>,
//     document.getElementById("toast-root")
//   );
// };

// function createToastApi() {
//   if (!window.Toast) {
//     window.Toast = {
//       show: (message, options) => addToast?.(message, options),

//       promise: async (promise, messages) => {
//         // 1️⃣ mostrar el estado de carga
//         window.Toast.show(
//           `${crypto.randomUUID().slice(0, 6)} || ${messages.loading}`,
//           { type: "loading" }
//         )

//         try {
//           // 2️⃣ esperar la promesa
//           const result = await promise

//           // 3️⃣ reemplazar el toast con el éxito
//           window.Toast.show(messages.success, { type: "success" })

//           return result
//         } catch (error) {
//           console.log(error, "error en promesa")
//           // 4️⃣ reemplazar con el error
//           window.Toast.show(messages.error, { type: "error" })
//           throw error
//         }
//       },
//     }
//   }
// }
// createToastApi()

// const initToast = () => {
//   const rootElement = $("toasts-root");
// };

// import { useEffect } from 'react'
// import { createRoot } from 'react-dom/client'
// import ToastManager, { createToastApi } from './toastManager'

// export function initToastSystem() {
// 	const rootElement = document.getElementById('toast-root')
// 	useEffect(() => {
// 		if (!rootElement.__reactRoot) {
// 			const root = createRoot(rootElement)
// 			root.render(<ToastManager />)
// 			rootElement.__reactRoot = root
// 		}
// 	}, [])
// 	createToastApi()
// }

// import { Loader } from 'lucide-react'
// import { useState } from 'react'
// import { createPortal } from 'react-dom'

// export { createToastApi }
// export default ToastManager
