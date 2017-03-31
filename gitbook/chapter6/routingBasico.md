# Routing básico

El Routing define como una aplicación responde a una petición que pretende acceder a un punto concreto, esto es una URI (Identificador de Recursos Uniformes) y un método específico HTTP. Cada ruta puede tener varias funciones responsables (handler) que son ejecutadas cuando la ruta coincide. La definición de la ruta sigue la siguiente estructura.

```javascript
app.Method(PATH, HANDLER)
```

Siendo:

 - **app**: Una instancia de express.
 - **METHOD**: Un método *request* de HTTP, en minúscula.
 - **PATH**: La dirección del recurso en el servidor.
 - **HANDLER**: Función ejecutada cuando la ruta es encontrada.
 
Para crear una instancia de express, bastará con lo siguiente.

```javascript
var express = require('express');
var app = express();
```
Y en el momento de iniciar un servidor en un puerto determinado, podemos ejecutar el siguiente código.

```javascript
var port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});
```

En la carpeta de ejemplos se encuentra el ejemplo `inicial.js`. Este crea un servidor simple usando express y varias rutas con sus handlers. 


