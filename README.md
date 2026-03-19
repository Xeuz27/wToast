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

## 📦 Uso en distintos entornos

### 🛠 Javascript

```html
<html>
	<head>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yidev/wtoast@latest/dist/cdn/index.css" />
	</head>
	<body>
		<button class="some-class">Boton</button>
	</body>
</html>
<!-- script must be of type module -->
<script type="module">
	const { wToast } = await import("https://cdn.jsdelivr.net/npm/@yidev/wtoast@latest/dist/cdn/index.js")
	const { show } = wToast()

	document.querySelector(".some-class").addEventListener("click", () => {
		show("click")
	})
</script>
```

### 🌟 Astro

Funciona sin configuración adicional.

```astro
---
const { text, id } = Astro.props
import '@yidev/wtoast/index.css'
---


<button id='algun-id' class='btn'>alguna Accion</button>

<script>
	import { wToast } from '@yidev/wtoast'
	const { show, promise } = wToast()

	document.getElementById("algun-id").addEventListener("click", () => {
		show("toast para alguna accion", {
			type: "info",
			duration: 2500,
		})
	})
</script>
```

si usas navegacion en tu sitio web tienes que envolver tus eventos en astro:page-load de el componente <ClientRouter/>
como se especifica en [manejo de scripts con view transitions](https://docs.astro.build/es/guides/view-transitions/#script-behavior-with-view-transitions)

```astro
---
import {ClientRouter} from 'astro:transitions'
---
<!-- index.astro -->
<head>
	<meta charset="utf-8" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<meta name="viewport" content="width=device-width" />
	<meta name="generator" content={Astro.generator} />
	<title>Astro</title>
	<ClientRouter />
</head>
```

```astro
---
const { text, id } = Astro.props
import '@yidev/wtoast/index.css'
---

<button id='algun-id' class='btn'>alguna promesa</button>

<script>
	import { wToast } from '@yidev/wtoast'
	const { show, promise } = wToast()

	document.addEventListener("astro:page-load", () => {

		document.getElementById("algun-id")?.addEventListener("click", () => {
			promise(fetch("/api"), {
				loading: "Cargando promesa...",
				success: "Promesa resuelta 🎉",
				error: "Error en promesa 😞",
			})
			.onResolve((data) => console.log(data))
			.onReject((err) => console.error(err))
		})

	})
</script>
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

## 🤝 Contribuir

¡Gracias por querer ayudar! Puedes contribuir mediante:

- Issues: reportando bugs o sugerencias
- Pull Requests: si quieres proponer cambios
- Revisar el roadmap / todos para ver áreas que necesitan ayuda

Por favor, lee las notas de estilo de código y sigue la convención de commits `conventional commits`.

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
- [x] actualizar icono en promesa()
- [x] en onresolve/onreject?
- - [x] detener en hover
- - [x] resumir depsues del hover
- [x] Botón para cerrar manualmente
- [x] Gestos para eliminar (swipe)
- [x?] Documentación mejorada en web / Página de ejemplo/demo
- [x] changelog
- [ ] Tests unitarios
- [ ] Mejorar separación de responsabilidades internas
- [ ] C/I para publicar nuevas versiones
- [ ] Revisar tipados finales
- [ ] Asegurar que promise.run() no duplique ejecuciones

### 🔹Ejemplos avanzados

Cómo cambiar posición global
Cómo personalizar con CSS variables
Cómo extender estilos
Cómo hacer un theme (light/dark)

### 🔹 Notas técnicas

?Explicar que JSX se valida sin ejecutarse
Explicar que React se carga de manera dinámica
Explicar cómo funciona la detección de framework en futuro

- [x] - permitir la personalizacion de los toast
- - [x] - con clases?
- - [x] - con estilos en linea?
- - - [x] - tipar el mapeo de los estilos correctamente para ts

- [x] - permitir existencia de titulos o mensajes que no habian al crear el toast? en updateToast?
- - [x] - eliminar dicho titulo si no existe en los options de update toast

- [x] - mostrar iconos en los toast de error o exito
- - [x] - actualizar icono en succs o fail
- - [ ] soportar react on componentes de jsx
- - - [ ] soportar otros frameworks

- [x] - mostrar el tiempo que le queda vivo al toast (css )
- [x] - boton de eliminar toast
- - [x] - gesto de eliminar toast?

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

- [x?] - uso de cdn / y objeto window?
- [ ] - hacer los toast clickables con un onclick
- [ ] - permitir cambiar posicion global
- [ ] - animaciones personalizadas (?)
- [ ] - hacer mejores ejemplos
