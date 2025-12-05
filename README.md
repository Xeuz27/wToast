# wToast

## Qué es?

WToast es una librería ligera y minimalista para mostrar toasts simples y personalizables en el navegador.  
Sin dependencias externas, fácil de usar, y compatible con cualquier framework moderno (Astro, React, u otros proximamente) o vanilla JS.

## 🚀 Cómo instalarlo?

haciendo

```bash
   npm install @yidev/wtoast

```

## 🛠 Uso básico

```js
import { wToast } from 'wtoast'
import 'wtoast/src/assets/style/toast.css'

const {show, promise} = wtoast()

show('Soy un toast!')
show('Algo salió mal', {
  type: 'error',
  duration: 5000,
})
promise(promesa, {
			loading: 'Cargando promesa...',
			success: 'Promesa resuelta 🎉',
			error: 'Error en promesa 😞'
		})
			// .onResolve({...opcionesDeConfiguracion})
			.onResolve((d: any) => d.json().then(console.log))
			.onReject({...opcionesDeConfiguracion},(error: unknown) => console.log(error))


// toast con icono jsx (lazy loaded)
import { FiAlertCircle } from 'react-icons/fi'

show('Error en...', {
  type: 'error',
  icon: <FiAlertCircle />
})






```

## ⚙ opciones disponibles

```js
type ToastOptions = {
	title?: string //header de el toast
	type?: ToastType // "success" | "error" | "loading" | "default"
	duration?: number // duracion del toast en ms: 3000 -> 3s
	className?: string // clases que se anidaran al contenedor del toast
	icon?: HTMLElement | string | any | JSX.Element
	styles?: ToastStyles // estilos en linea
}

show: (message: string, options: ToastOptions = {}): void => { }
promise: <T>(
			promise: Promise<T>,
			messages: ToastPromiseMessages,
			options: ToastOptions = {}
		): toastPromise<T> => {
			return new toastPromise(promise, messages, options)
		}

   // onResolve(config: ToastOptions): this
	// onResolve(callback: (data: unknown) => void): this
	// onResolve(config: ToastOptions, callback: (data: unknown) => void): this

   // onReject(config: ToastOptions): this
	// onReject(callback: (error: Error) => void): this
	// onReject(config: ToastOptions, callback: (error: Error) => void): this

```

## 📦 Uso en frameworks

🌟 Astro

Funciona sin configuración adicional.

```ts
---
// componente Astro
import { wToast } from 'wtoast'
import 'wtoast/src/assets/style/toast.css'
const {show}= wToast()
---

<button onclick="show('Hola desde Astro!')">Toast</button>
```

⚛️ React

```js
import { wToast } from "wtoast"
import "wtoast/src/assets/style/toast.css"

const { show } = wToast()
export default function App() {
	return <button onClick={() => show("Hola React!")}>Toast</button>
}
```

toast library

- [x] - permitir la personalizacion de los toast
- - [x] - con clases?
- - [x] - con estilos en linea?
- - - [x] - tipar el mapeo de los estilos correctamente para ts

- [x] - permitir existencia de titulos o mensajes que no habian al crear el toast? en updateToast?
- - [x] - eliminar dicho titulo si no existe en los options de update toast

- [x] - mostrar iconos en los toast de error o exito
- - [ ] - actualizar icono en succs o fail
- - [ ] soportar react on componentes de jsx
- - - [ ] soportar otros frameworks

- [ ] - mostrar el tiempo que le queda vivo al toast (css )
- [ ] - boton de eliminar toast
- - [ ] - gesto de eliminar toast?

- [?] - crear una documentacion sencilla
- [ ] - crear una web sencilla
- [ ] - subir a npm y probar como paquete

- [ ] - verificar el tipado
- - [ ] - return type de promesa.run()
- - [ ] - evitar llamar dos veces si se hace promesa.run() para retornar los valores de la promesa
- [ ] - separate concerns for updating creating rendering deleting etc

- [ ] - usar formatter
- [ ] - hacer test
- [ ] - crear un c/i
