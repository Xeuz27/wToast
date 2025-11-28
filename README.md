# wToast

## Qué es?

wToast es una utilidad para mostrar un toast, una notificacion con un mensaje normalmente de exito o de fallo de alguna operacion

## Cómo instalarlo?

haciendo

```bash
   npm install

```

y luego en tu proyecto importas

```js
import { wToast } from "wtoast"
```

## Cómo usarlo?

para usarlo solo tienes que

```js
const { show, promise } = wToast()
```

y usar cualquiera de los dos metodos para mostrar un toast

```js

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

- [ ] - crear una documentacion sencilla
- [ ] - crear una web sencilla
- [ ] - subir a npm y probar como paquete

- [ ] - verificar el tipado
- - [ ] - return type de promesa.run()
- - [ ] - evitar llamar dos veces si se hace promesa.run() para retornar los valores de la promesa
- [ ] - separate concerns for updating creating rendering deleting etc

- [ ] - usar formatter
- [ ] - hacer test
