import { defineConfig } from "tsup"

// const injectFunc = `
// function injectStyle(css) {
//   if (!css || typeof document === 'undefined') return

//   const head = document.head || document.getElementsByTagName('head')[0]
//   const style = document.createElement('style')
//   style.type = 'text/css'

//   if(head.firstChild) {
//     head.insertBefore(style, head.firstChild)
//   } else {
//     head.appendChild(style)
//   }

//   if(style.styleSheet) {
//     style.styleSheet.cssText = css
//   } else {
//     style.appendChild(document.createTextNode(css))
//   }
// }
// `

export default defineConfig({
	entry: ["src/index.ts"], // o 'src/index.tsx' si usas JSX
	format: ["esm"], // outputs: dist/index.cjs / dist/index.mjs
	target: "esnext", // o "es2020" según necesites
	sourcemap: true, // opcional, útil para debug
	clean: true, // limpia la carpeta dist antes de compilar
	dts: true, // genera archivos .d.ts (de tipado)
	minify: true, // opcional, minimiza la salida
	treeshake: true, //opcional, para eliminar codigo no usado
	external: ["react", "react-dom"], // IMPORTANT: marcar peer deps como external
	loader: {
		".css": "copy",
	},
	bundle: true, // agrupa todo (útil si importas css)
	// injectStyle: (css) => {
	// 	return `${injectFunc}injectStyle(${css});`
	// },
})
