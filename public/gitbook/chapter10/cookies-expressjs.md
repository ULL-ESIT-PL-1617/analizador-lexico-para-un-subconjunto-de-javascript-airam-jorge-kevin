# Cookies y ExpressJS

Si continuamos con los apuntes anteriores sobre expressJS veremos a continuación que es bastante sencillo crear una aplicación que utilice las cookies. Para ello necesitaremos el módulo [_cookie-parser_](https://github.com/expressjs/cookie-parser) (`npm install cookie-parser`).

_Cookie-parser_ es un middleware que permite parsear el header de las Cookies y almacenar dentro de `req.cookies` un objeto con las cookies con sus nombres como key. Es posible activar el soporte para las `signed cookies` que asigna la variable `req.secret` para que pudiera ser utilizado por otro middleware.

Para comenzar a utilizar el módulo simplemente le decimos a _expressJS_ que queremos utilizar el módulo:

```javascript
var express = require('express');
var cookieParser = require(`cookie-parse`);

var app = express();
app.use(cookieParser());
```

En un primer ejemplo facilitado en `cookies-inicial.js` se puede ver el funcionamiento básico de las cookies. Si en cualquier momento queremos saber cuales son las cookies que son guardadas en el cliente que estamos usando podemos encribir "_document.cookies_" en la consola del inspeccionador de elementos.

En el ejemplo, podemos acceder a `/cookies` que devolverá una cookie que el navegador guardará y envará de nuevo al servidor cada vez que se acceda a la página. Cuando accedemos a `/show` se mostrará información sobre todas las cookies que se han recibido y en `/clearcookie` se borrará la cookie que fue creada anteriormente.

Como se muestra en este ejemplo las cookies que se enviarán al cliente para que este las mande de vuelta con cada conexión se pueden crear como se muestra a continuación:

```javascript
res.cookie(cookie_name, 'cookie_value')
res.send(/*...*/)
// O bien
res.cookie(cookie_bane, 'cookie_value').send(/*...*/);
```

es posible fijar la fecha de expiración de una cookie fácilmente de la siguiente forma.

```javascript
res.cookie(name, 'value', {expire: new Date + 7}); // Expira dentro de una semana
```
Para acceder a las cookies que el cliente nos ha mandado, podemos simplemente acceder al objeto que fue generado en `req.cookies`

```javascript
console.log("Cookies :  ", req.cookies);
```

En el caso de borrar una cookie simplemente la borramos por el nombre asignado.

```javascript
clearCookie('cookie_name');
```

## Signed cookies en ExpressJS

Para crear una signed cookie en express simplemente le añadimos como argumento a la función `cookieParser` una string que será usada como el secreto. Más adelante, al crear una cookie podremos asignar la opción de que sea signed. Es posible acceder a las signed cookies mediante el objeto `req.signedCookies`.

```javascript
app.use(cookieParser('A secret'));
/* ... */
res.cookie('name', 'value', {signed: true});
/* ... */
console.log('Signed Cookies: ', req.signedCookies);
```
 
## Formularios y cookies

Interactuar con información enviada por el usuario al servidor y crear cookies en base a ello es bastante sencillo. En este caso, se puede utilizar el módulo `body-parser` que permite analizar el cuerpo de la respuesta.

Simplemente, una vez el usuario haya enviado un formulario, por ejemplo con una checkbox con nombre "_remember_" podemos comprobar que con `reqa.body.remember` si la checkbox estaba activada, en ese caso, creamos la cookie.

Podemos ver el ejemplo explicado en `cookies-formulario.js`.
