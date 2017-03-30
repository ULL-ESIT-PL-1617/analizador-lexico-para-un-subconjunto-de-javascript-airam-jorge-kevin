# Usando Middleware
Los **Middleware** son funciones que tienen acceso a:
- Objeto de **petición (req)**.
- Objeto de **respuesta (res)**.
- La función del siguiente middleware del ciclo petición-respuesta.

La función del siguiente **middleware** normalmente se denomina con la variable llamada **next**.

Los **middleware** pueden realizar las siguientes tareas: 
- **Ejecutar** cualquier código.
- **Realizar cambios** en los objetos petición y respuesta.
- **Finalizar el ciclo** de petición y respuesta.
- **Llamar al siguiente** función middleware de la pila.

Si la función middleware actual no es el final del ciclo petición-respuesta, esta debe **llamar a next()** para **pasar el control** a la siguiente función middleware. De otra forma, la petición se quedará colgada.

Una aplicación Express puede usar los siguientes tipos de middleware:
- Middleware a nivel de **aplicación**.
- Middleware a nivel de **router**.
- Middleware para el **manejo de errores**.
- Middleware **empotrado**.
- Middleware de terceros.

### Middleware a nivel de aplicación
Estos middleware se enlazan a una instancia del objeto de aplicación mediante las funciones `app.use()` y `app.metodo()` donde `metodo()` es un método HTTP (GET, POST, DELETE..), pero en minúscula.
En este ejemplo podemos observar una función middleware utilizando lo anteriormente mencionado:
```javascript
var app = express();

app.use(function (req, res, next) {
  console.log('Hora:', Date.now());
  next();
});
```
En este caso, la función se ejecuta cada vez que se reciba una solicitud, sin importar de qué tipo. Obsérvese el uso de la función "next()" la cual invoca a la siguiente middleware en el caso de que no se finalice el ciclo de petición-respuesta.
```javascript
app.use('/user/:id', function (req, res, next) {
  console.log('Tipo de solicitud:', req.method);
  next();
});
```
Esta función se ejecuta cada vez que accedemos con el navegador al directorio "/user/:id", donde ":id" es un comodín el cual toma el valor que tenga en la URL. Por ejemplo, si la URL es:

http://localhost:8080/user/ejemplo entonces se accederá al directorio /user/ejemplo. Una vez completada la solicitud, el ejemplo imprimirá en consola el tipo de solicitud usado.
```javascript
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```
Esta función se ejecuta cuando el método de solicitud es un GET.

A continuación veremos la forma de concatenar llamadas a funciones dentro de una misma middleware:
```javascript
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
     console.log('Request Type:', req.method);
     next();
});
```
En el siguiente ejemplo, aun teniendo dos middlewares para el mismo punto de montaje, solo se ejecutará la primera parte, ya que se termina el ciclo de solicitud-respuesta.
```javascript
app.get('/user/:id', function (req, res, next) {
  // si el ID es 0, pasamos a la siguiente middleware. 
  if (req.params.id == 0) next('route');
  // en otro caso, pasar el control a la siguiente middleware en la pila.
  else next(); //
}, function (req, res, next) {
     res.render('regular');
});

app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
```
Mediante "next('route')" se invoca a la siguiente middleware que tenga un punto de montaje, si nos queremos saltar alguna middleware de la pila de ejecución.
```javascript
app.get('/user/:id', function (req, res, next) {
  // si el ID es 0, pasamos a la siguiente middleware. 
  if (req.params.id == 0) next('route');
  // en otro caso, pasar el control a la siguiente middleware en la pila.
  else next(); //
}, function (req, res, next) {
     res.render('regular');
});

app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
```
### Middleware de nivel de direccionador
Este middleware funciona de la misma manera que el middleware de nivel de aplicación, excepto que está enlazado a una instancia de express.Router().
```javascript
var router = express.Router();
```
Para cargar el middleware, se usan las mismas funciones mencionadas anteriormente, router.use() y router.METHOD().

Mediante el siguiente ejemplo, podemos ver que la forma de uso de este middleware es prácticamente igual a las anteriores.
```javascript
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
     console.log('Request Type:', req.method);
     next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
   // render a regular page
     res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
```
### Middleware de manejo de errores
La única diferencia con este middleware, es que usa cuatro parámetros en vez de tres, y aunque no se use el objeto next, es importante mantenerlo en la cabecera de la función.
```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
Lo cual envía un mensaje de advertencia cuando se da el error 500.
### Middleware empotrado
Este middleware es reponsable del servicio de activos estáticos para una explicación Express, por tanto, puede ser el encargado de suministrar ficheros .css, .js, imágenes, etc. La sintaxis es como sigue:
```javascript
express.static(ruta, [opciones])
```
donde "ruta" es el directorio raíz desde el que se realiza el servicio de archivos estáticos, y "opciones" un objeto de opciones como su nombre indica, y que puede ser opcional.

De esta forma, el código:
```javascript
app.use(express.static('public'));
```
estará atento a cualquier tipo de solicitud HTTP, y buscará por los recursos que le pidan (.css, .js, imágenes, etc.) en la carpeta "public".

### Middleware de terceros
Existen middlewares de terceros, como por ejemplo el módulo "cookie-parser", el cual puede ser instalado usando el comando "npm":

```bash
$ npm install cookie-parser
```
Y para utilizarlo:
```javascript
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

```
Fuentes:
http://expressjs.com/en/guide/using-middleware.html