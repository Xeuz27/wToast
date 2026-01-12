import { defineConfig } from "tsup"

// const baseConfig = {
// 	entry: ["src/index.ts"], // o 'src/index.tsx' si usas JSX
// 	format: ["esm"], // outputs: dist/index.cjs / dist/index.mjs
// 	target: "es2018", // o "es2020" según necesites
// 	sourcemap: true, // opcional, útil para debug
// 	clean: true, // limpia la carpeta dist antes de compilar
// }

export default defineConfig([
	// Build para bundlers (npm)
	{
		entry: ["src/index.ts"],
		format: ["esm", "cjs"],
		target: "es2018",
		sourcemap: true,
		clean: true,

		outDir: "dist",
		minify: true, // opcional, minimiza la salida
		dts: true, // genera archivos .d.ts (de tipado)
		treeshake: true, //opcional, para eliminar codigo no usado
		external: ["react", "react-dom"], // IMPORTANT: marcar peer deps como external
		bundle: true, // agrupa todo (útil si importas css)
	},
	// 	   // Build para CDN
	{
		entry: ["src/index.ts"],
		format: ["esm"],
		target: "es2018",
		sourcemap: true,
		clean: true,
		dts: true, // genera archivos .d.ts (de tipado)

		outDir: "dist/cdn",
		minify: false,
	},
])
