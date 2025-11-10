import { defineConfig } from "tsup"

export default defineConfig({
	entry: ["src/index.js"], // tu punto de entrada
	format: ["cjs", "esm"], // formatos que quieres exportar
	loader: {
		".css": "file",
	},
	dts: true, // genera archivos .d.ts
	sourcemap: true, // opcional, útil para debug
	clean: true, // limpia la carpeta dist antes de compilar
	minify: true, // opcional, minimiza la salida
	bundle: true, // agrupa todo (útil si importas css)
	target: "esnext", // o "es2020" según necesites
})
