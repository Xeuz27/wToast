# 📣 wToast — Toasts rápidos y minimalistas

## Qué es?

wToast es una librería ligera para mostrar toasts personalizables en el navegador.
No depende de ningún framework y funciona en cualquier entorno moderno: Astro, React, Vanilla JS, y otros próximamente.

## 🚀 Cómo instalarlo?

```bash
npm install @yidev/wtoast
```

## 🛠 Uso básico

```ts
import { wToast } from "wtoast"
import "@yidev/wtoast/index.css"

const { show, promise } = wtoast()

show("Soy un toast!")

show("Algo salió mal", {
	type: "error",
	duration: 5000,
})

promise(fetch("/api"), {
	loading: "Cargando promesa...",
	success: "Promesa resuelta 🎉",
	error: "Error en promesa 😞",
})
	.onResolve((data) => console.log(data))
	.onReject((err) => console.error(err))

// toast con icono jsx
import { FiAlertCircle } from "react-icons/fi"

show("Error en...", {
	type: "error",
	icon: <FiAlertCircle />,
})
```

## ⚙️ API y opciones disponibles

### show(message, options?)

```js
show: (message: string, options: ToastOptions = {}): void => { }

type ToastOptions = {
	title?: string //header de el toast
	type?: ToastType // "success" | "error" | "loading" | "default"
	duration?: number // duracion del toast en ms: 3000 -> 3s
	className?: string // clases que se anidaran al contenedor del toast
	icon?: HTMLElement | string | any | JSX.Element
	styles?: ToastStyles // estilos en linea
}
```

### promise(promise, messages, options?)

Muestra un toast que cambia automáticamente según el estado de la promesa.

```js
promise: <T>( promise: Promise<T>, messages: ToastPromiseMessages, options: ToastOptions = {} ): toastPromise<T> => {
	return new toastPromise(promise, messages, options)
}
```

Metodos encadenables:

```js
// onResolve(config: ToastOptions): this
// onResolve(callback: (data: unknown) => void): this
// onResolve(config: ToastOptions, callback: (data: unknown) => void): this

// onReject(config: ToastOptions): this
// onReject(callback: (error: Error) => void): this
// onReject(config: ToastOptions, callback: (error: Error) => void): this
```

## 📦 Uso en frameworks

### 🕶 Javascript

```js
import { wToast } from "@yidev/wtoast"
const { show } = wToast()
//styles/index.css
import "@yidev/wtoast/index.css"

show("show", {
	duration: 3000,
})
```

### 🌟 Astro

Funciona sin configuración adicional.

```ts
---
import { wToast } from '@yidev/wtoast'
import '@yidev/wtoast/index.css'
const { show } = wToast()
---

<button onclick="show('Hola desde Astro!')">Toast</button>
```

### ⚛️ React

```js
import { wToast } from "@yidev/wtoast"
import "@yidev/wtoast/index.css"
const { show } = wToast()

export default function Button() {
	return <button onClick={() => show("Hola React!")}>Toast</button>
}
```

## roadmap / to do

### ✅ completado

- [x] Personalización con clases y estilos
- [x] Tipado TS para los estilos
- [x] Títulos opcionales
- [x] Actualizar iconos en estados de promesa
- [x] Renderizado seguro de íconos JSX
- [x] Compatibilidad con React 18/19
- [x] Validación de elementos JSX para evitar ejecutar funciones

### ⏳ En progreso

- [ ] Soporte para más frameworks (Svelte, Vue, Solid)
- [x] Mostrar barra de progreso del tiempo restante
- [ ] actualizar icono en promesa()
- - [x] detener en hover
- - [x] resumir depsues del hover
- [ ] Botón para cerrar manualmente
- [ ] Gestos para eliminar (swipe)
- [x?] Documentación mejorada en web / Página de ejemplo/demo
- [ ] Tests unitarios
- [ ] Mejorar separación de responsabilidades internas
- [ ] C/I para publicar nuevas versiones
- [ ] Revisar tipados finales
- [ ] Asegurar que promise.run() no duplique ejecuciones

## ✨ Qué podría agregarse a la documentación

Te recomiendo añadir:

### 🔹 Sección de “Características”

Sin dependencias
Ligero
Soporta JSX sin React en bundle
Lazy rendering
Permite múltiples toasts
.promise() API tipo “toast.promise” de otras libs

### 🔹 Sección de “Limitaciones actuales”

JSX solo en React por ahora
No hay yet soporte para SSR
No hay animaciones personalizadas todavía

### 🔹 Sección de “Ejemplos avanzados”

Cómo cambiar posición global
Cómo personalizar con CSS variables
Cómo extender estilos
Cómo hacer un theme (light/dark)

### 🔹 Notas técnicas

Explicar que JSX se valida sin ejecutarse
Explicar que React se carga de manera dinámica
Explicar cómo funciona la detección de framework en futuro

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
