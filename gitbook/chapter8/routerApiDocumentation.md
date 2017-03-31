# Router

---

Un objeto _router_ es una instancia aislada de middleware y rutas. También se puede referir a ella como "mini-aplicación", capaz de realizar middelware y funciones de _router_. Cada aplicación _Express_ tiene un _router_ de aplicaciones incorporado.

Un _router_ se comporta como el propio middleware, por lo que puede utilizarlo como argumento para _app.use \(\)_ o como argumento para el método _use\(\)_ de otro _router_.

El objeto express de nivel superior tiene un método _Router\(\)_ que crea un nuevo objeto de _router_.

Una vez que haya creado un objeto _route_, puede agregar rutas intermedias y de método HTTP \(como obtener, publicar, publicar, etc.\) como una aplicación. Por ejemplo:

```js
// invoked for any requests passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function(req, res, next) {
  // ..
});
```

Se puede utilizar un _router_ para una URL raíz en particular, de esta manera separar sus rutas en archivos o incluso mini-aplicaciones.

```js
// only requests to /calendar/* will be sent to our "router"
app.use('/calendar', router);
```

# Métodos

---

### router.all\(path, \[callback, ...\] callback\) {#router.all}

Este método es igual que los métodos **router.METHOD\(\)**, excepto que coincide con todos los métodos HTTP \(verbos\).

Este método es extremadamente útil para mapear la lógica "global" para prefijos de ruta específicos o coincidencias arbitrarias. Por ejemplo, si coloco la ruta siguiente en la parte superior de todas las demás definiciones de ruta, se requeriría que todas las rutas a partir de ese punto requieran autentificación y cargarían automáticamente un usuario. Tenga en cuenta que estas devoluciones de llamada no tienen que actuar como puntos finales; **LoadUser** puede realizar una tarea y luego llamar a _next\(\)_ para seguir comparando las rutas subsiguientes.

```js
router.all('*', requireAuthentication, loadUser);
```

O el equivalente:

```js
router.all('*', requireAuthentication)
router.all('*', loadUser);
```

Otro ejemplo de esto es la funcionalidad "global" listada en blanco. Aquí el ejemplo es como antes, pero sólo restringe los caminos prefijados con _"/api"_:

```js
router.all('/api/*', requireAuthentication);
```

## router.METHOD\(ruta, \[callback, ...\] callback\)

Los métodos **router.METHOD\(\)** proporcionan la funcionalidad de enrutamiento en Express, donde METHOD es uno de los métodos HTTP, como GET, PUT, POST y así sucesivamente, en minúsculas. Por lo tanto, los métodos actuales son **router.get\(\)**, **router.post\(\)**, **router.put\(\)**, y así sucesivamente.

```
La función router.get() se llama automáticamente al método HEAD de HTTP además del método GET si
router.head() no fue llamado para la ruta antes de router.get().
```

Puede proporcionar múltiples _callback_, y todas se tratan de la misma forma, y se comportan como middleware, excepto que estas _callback \_pueden invocar a continuación _\('ruta'\)_ para omitir la\(s\) llamada\(s\) de \_route_ restantes. Puede utilizar este mecanismo para realizar las condiciones previas en una ruta y, a continuación, pasar el control a las rutas subsiguientes cuando no haya ninguna razón para proceder con la ruta coincidente.

El fragmento siguiente ilustra la definición de ruta más sencilla posible. Express traduce las cadenas de ruta a expresiones regulares, utilizadas internamente para coincidir con las solicitudes entrantes. Las cadenas de consulta no se consideran al realizar estas coincidencias, por ejemplo _"GET /"_ coincidiría con la ruta siguiente, al igual que _"GET/?Name=tobi"_.

```js
router.get('/', function(req, res){
  res.send('hello world');
});
```

También se puede usar expresiones regulares, útil si tiene restricciones muy específicas, por ejemplo, la siguiente coincidiría con _"GET /commits/71dbb9c"_ así como _"GET /commits/71dbb9c..4c084f9"_.

```js
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
```

## router.param\(nombre, callback\)

Agrega los disparadores de callback a los parámetros de ruta, donde _nombre_ es el nombre del parámetro y la _callback_ es la función de callback. Aunque el nombre es técnicamente opcional, el uso de este método sin que sea obsoleto a partir de Express v4.11.0 \(consulte a continuación\).

Los parámetros de la función de callback son:

* req, el objeto request.

* res, el objeto de response.

* next, indicando la siguiente función de middleware.

* El valor del parámetro _name_.

* El nombre del parámetro.

```
A diferencia de app.param(), router.param() no acepta una matriz de parámetros de ruta.
```

Por ejemplo, cuando: el usuario está presente en una ruta, puede mapear la lógica de carga del usuario para proporcionar automáticamente `req.user` a la ruta o realizar validaciones en la entrada de parámetros.

```js
router.param('user', function(req, res, next, id) {

  // try to get the user details from the User model and attach it to the request object
  User.find(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});
```

Las funciones de callback de parámetros son locales al enrutador en el que se definen. No son heredadas por aplicaciones montadas o enrutadores. Por lo tanto, las callback de parámetros definidas en el enrutador se activarán sólo por los parámetros de ruta definidos en las rutas del enrutador.

Una callback de parámetro se llamará sólo una vez en un ciclo de _request-response_, incluso si el parámetro coincide en varias rutas, como se muestra en los ejemplos siguientes.

```js
router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
});

router.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

router.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
```

En _GET /user/42_, se imprime lo siguiente:

```bash
CALLED ONLY ONCE
although this matches
and this matches too
```

```
La siguiente sección describe router.param(callback), que está obsoleto a partir
de v4.11.0.
```

El comportamiento del método **router.param\(nombre, callback\)** se puede alterar enteramente pasando sólo una función a **router.param\(\)**. Esta función es una implementación personalizada de cómo se debe comportar **router.param\(name, callback\)** --&gt; acepta dos parámetros y debe devolver un middleware.

El primer parámetro de esta función es el nombre del parámetro URL que debe capturarse, el segundo parámetro puede ser cualquier objeto _JavaScript_ que pueda ser utilizado para devolver la implementación del middleware.

El middleware devuelto por la función decide el comportamiento de lo que ocurre cuando se captura un parámetro de URL.

En este ejemplo, la firma **router.param \(nombre, callback\)** se modifica en **router.param\(nombre, ID de acceso\)**. En lugar de aceptar un nombre y una callback, **router.param\(\)** aceptará ahora un nombre y un número.

```js
var express = require('express');
var app = express();
var router = express.Router();

// customizing the behavior of router.param()
router.param(function(param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

// using the customized router.param()
router.param('id', 1337);

// route to trigger the capture
router.get('/user/:id', function (req, res) {
  res.send('OK');
});

app.use(router);

app.listen(3000, function () {
  console.log('Ready');
});
```

En este ejemplo, la firma **router.param\(nombre, callback\)** permanece igual, pero en lugar de una callback de middleware, se ha definido una función de comprobación de tipo de dato personalizada para validar el tipo de dato del ID de usuario.

```js
router.param(function(param, validator) {
  return function (req, res, next, val) {
    if (validator(val)) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

router.param('id', function (candidate) {
  return !isNaN(parseFloat(candidate)) && isFinite(candidate);
});
```

## router.route\(path\)

Devuelve una instancia de una sola ruta que se puede utilizar para manejar verbos HTTP con middleware opcional. Utilice **router.route\(\)** para evitar la asignación de rutas duplicadas y, por lo tanto, errores de escritura.

Basándose en el ejemplo de **router.param\(\)** anterior, el siguiente código muestra cómo utilizar **router.route\(\)** para especificar varios manejadores de métodos HTTP.

```js
var router = express.Router();

router.param('user_id', function(req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  };
  next();
});

router.route('/users/:user_id')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  next();
})
.get(function(req, res, next) {
  res.json(req.user);
})
.put(function(req, res, next) {
  // just an example of maybe updating the user
  req.user.name = req.params.name;
  // save user ... etc
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
});
```

Este enfoque reutiliza la ruta single _/users/:user_\__id_ y agrega controladores para varios métodos HTTP.

```
NOTA: Cuando se utiliza router.route(), el ordenamiento del middleware se basa en la fecha de creación
de la ruta, no cuando se agregan manejadores de métodos a la ruta. Para ello, puede considerar que
los manejadores de métodos pertenezcan a la ruta a la que fueron agregados.
```

## router.use\(\[ruta\], \[función, ...\] función\)

Utiliza la función o funciones de middleware especificadas, con la ruta de acceso de montaje opcional, cuyo valor predeterminado es _"/"_.

Este método es similar a **app.use\(\)**. A continuación se describe un ejemplo simple y un caso de uso.

El middleware es como un tubo de fontanería: las solicitudes comienzan en la primera función de middleware definida y funcionan de manera "descendente" en el procesamiento de la pila de middleware para cada ruta que coincidan.

```js
var express = require('express');
var app = express();
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function(req, res, next) {
  // ... maybe some additional /bar logging ...
  next();
});

// always invoked
router.use(function(req, res, next) {
  res.send('Hello World');
});

app.use('/foo', router);

app.listen(3000);
```

La ruta de "montaje" se quita y no es visible para la función de middleware. El efecto principal de esta característica es que una función de middleware montada puede operar sin cambios de código independientemente de su ruta de acceso "prefix".

El orden en el que se define middleware con **router.use\(\)** es muy importante. Se invocan secuencialmente, por lo que el orden define la precedencia de middleware. Por ejemplo, por lo general, un registrador es el primer middleware que utilizaría, de modo que cada solicitud se registra.

```js
var logger = require('morgan');

router.use(logger());
router.use(express.static(__dirname + '/public'));
router.use(function(req, res){
  res.send('Hello');
});
```

Ahora supongamos que desea ignorar las solicitudes de registro de archivos estáticos, pero para continuar registrando rutas y middleware definidos después de **logger\(\)**. Simplemente mover la llamada a **express.static\(\)** a la parte superior, antes de agregar el logger middleware:

```js
router.use(express.static(__dirname + '/public'));
router.use(logger());
router.use(function(req, res){
  res.send('Hello');
});
```

Otro ejemplo es servir archivos de varios directorios, dando prioridad a _"./public"_ sobre los demás:

```js
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
```

El método router.use\(\) también admite parámetros con nombre para que los puntos de montaje de otros enrutadores se puedan beneficiar de la precarga mediante parámetros con nombre.

NOTA: Aunque estas funciones de middleware se agregan a través de un enrutador en particular, cuando se ejecutan se define por la ruta a la que están conectados \(no el enrutador\). Por lo tanto, middleware agregado a través de un enrutador puede correr para otros enrutadores si sus rutas coinciden. Por ejemplo, este código muestra dos routers diferentes montados en la misma ruta:

```js
var authRouter = express.Router();
var openRouter = express.Router();

authRouter.use(require('./authenticate').basic(usersdb));

authRouter.get('/:user_id/edit', function(req, res, next) { 
  // ... Edit user UI ...  
});
openRouter.get('/', function(req, res, next) { 
  // ... List users ... 
})
openRouter.get('/:user_id', function(req, res, next) { 
  // ... View user ... 
})

app.use('/users', authRouter);
app.use('/users', openRouter);
```

A pesar de que el middleware de autentificación se ha añadido a través de _authRouter_ se ejecutará en las rutas definidas por el _openRouter_, así como ambos routers fueron montados en _/users_. Para evitar este comportamiento, utilice rutas diferentes para cada enrutador.

