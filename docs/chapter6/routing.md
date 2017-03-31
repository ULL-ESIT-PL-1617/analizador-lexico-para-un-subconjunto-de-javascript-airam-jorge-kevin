# Routing

Como ya hemos visto en el ejemplo `inicial.js`, Routing es la definición de las URIs y cómo debe responder la aplicación a las peticiones de los clientes.

### Métodos de routing

Aunque existen numerosos métodos *request* de HTTP, no el conjunto completo es soportado por express.

**Métodos HTTP soportados**: *get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, connect*.

Sin embargo, existe además un método de express para el cual no existe equivalente en HTTP, que será aplicado para **todos los métodos** del módulo HTTP. Se puede ver un ejemplo en `metodoAll.js` que imprimirá por consola cada vez que accedamos a "`/`". La implementación del método es la siguiente.

```javascript
app.all('/', function (req, res, next) {
    console.log('Method all used ...');
    next(); /* Transfiere el control al siguiente handler */
});
```

### Routes paths

El path dentro del método *request* define el punto en el que la *request* es realizada, estos pueden ser cadenas, patrones o expresiones regulares. Dentro de los patrones de cadenas podemos distinguir los siguientes elementos.

| Elemento  |  Descripción |  
|---|---|
| ?  | Hace un match con el elemento previo cero o una veces.  |
|  + | Hace un match con el elemento previo una o más veces. |
 | *  | Hace un match con cualquier cadena.  | 
|  ( ) | Permite agrupar contenido.  |  
| [( )] | Construcción que permite escapar un elemento. |
_ __Nota:__ Es importante escapar el carácter '$' de la forma [($)]._

Algunos ejemplos de rutas utilizando cadenas de patrones:

| Cadena | Match con|
|---|---|
| */test.txt* | /test.txt |
| */ab?cd* | /abcd, /acd |
| */ab(cd)?* | /abcd, /ab |
| */ab+cd* | /abcd, /abbcd, /abbbcd, ... |
| _/ab*ab_ | /abcd, /abRANDOMcd, /ab123412312cd, ... |

Con respecto a las expresiones regulares, se sigue el mismo patrón estándar.

| Expresión | Match con|
|---|---|
| */e/* | /test.txt, /e, /eee/, /name, /user, ... |
| _/.*fly$/_ | /butterfly, /dragonfly, /fly, /testfly, ... (_**Not** /dragonflytest_) |

Se puede ver un ejemplo de *paths* en `paths.js`.

### Parámetros de la ruta

Los parámetros de la ruta son segmentos de la URL que son capturados. Los valores capturados son después almacenados en el objeto `req.params`, con el nombre del parámetro especificado en el *path* como su clave. Se puede ver ilustrado de la siguiente forma.

| Elemento | Contenido |
|---|---|
|Route path|/users/:userId/books/:bookId|
|Request URL| http://localhost:3000/users/34/books/8989|
| req.params | { "userId": "34", "bookId": "8989" } |

Los elementos '.' y '-' pueden ser utilizados con propósitos específicos.

| Elemento | Contenido |
|---|---|
|Route path|/flights/:from-:to|
|Request URL| http://localhost:3000/flights/LAX-SFO|
| req.params | { "from": "LAX", "to": "SFO" } |

Se puede ver un ejemplo del uso de los parámetros en `param.js`.

###  Handlers de la ruta

Es posible proveer múltiples *callbacks* que se comportan como *middleware* para manejar una *request*. Estos *callbacks* deberán invocar a la función `next()` para sobrepasar los callbacks de la ruta restantes.

Los *handlers* pueden ir en forma de función, array de funciones o una combinación de ambos. Es posible ver un ejemplo en `handlers.js`.

### Métodos de respuesta

Para no dejar la *request* del cliente sin respuesta, es necesario llamar a uno de los siguientes métodos que terminará el ciclo de  *request*-*response* enviando una respuesta al cliente.

| Método | Descripción |
|---|---|
|[res.download()](http://expressjs.com/en/4x/api.html#res.download)| Señala un archivo para ser descargado. |
|[res.end()](http://expressjs.com/en/4x/api.html#res.end)  | Termina el proceso de respuesta. |
|[res.json()](http://expressjs.com/en/4x/api.html#res.json)  | Envía una respuesta JSON. |
|[res.jsonp()](http://expressjs.com/en/4x/api.html#res.jsonp)  | Envía una respuesta JSON con soporte para JSONP |
|[res.redirect()](http://expressjs.com/en/4x/api.html#res.redirect)  | Redirige la *request* |
|[res.render()](http://expressjs.com/en/4x/api.html#res.render)  | Renderiza una vista. |
|[res.send()](http://expressjs.com/en/4x/api.html#res.send)  | Envia una respuesta de varios tipos. |
|[res.sendFile()](http://expressjs.com/en/4x/api.html#res.sendFile)  | En un archivo como un stream de datos. |
|[res.sendStatus()](http://expressjs.com/en/4x/api.html#res.sendStatus)  | Envía un código de respuesta y la representación en una cadena en el cuerpo. |

Se puede ver un ejemplo de algunos métodos de respuesta en `responses.js`.

### Método route

Es posible crear rutas encadenadas usando el método `route()`. De la siguiente forma.

```javascript
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book');
  });
  .post(function (req, res) {
    res.send('Add a book');
  });
  .put(function (req, res) {
    res.send('Update the book');
  });
```

### Modularización

Es posible utilizar la clase `express.Router`para crear handlers de forma modular. Una instancia `Router` es un middleware y sistema de enrutado completo. Se puede ver un ejemplo de modularización en `module.js` y `birds.js`. 
