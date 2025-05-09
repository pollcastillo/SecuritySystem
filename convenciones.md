# Convenciones

```ts
let _DivElementVariable = document.createElement("div");
```
_Se utiliza esta convención para elementos HTML que solo se utilizará una vez_

```ts
let __ObtainedData__ = await getData();
```
_Se utiliza esta convención para el **raw** principal de los `fetch de datos`_

```ts
private _onClick(id: string): void { }
```
_Se utiliza esta convensión para los métodos privados, excepto para las propiedades o bloques (elementos HTML)_