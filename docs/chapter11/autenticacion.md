# Ejemplo de una sesión "auth"
La autenticación es el proceso de verificar si un usuario es quien está declarando que es. La autorización es el proceso de determinar si el usuario tiene los privilegios para acceder a los recursos que solicitó.

### Ejemplo
A continuación explicaremos los pasos a seguir para crear en código ejemplo para una sesión "auth".

**1º** Importamos los módulos de exprees y express-session y creamos una aplicación express y añadimos una sesión para la aplicación express como un middleware.

```javascript
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
```
**2º** Creamos la función de middleware de autenticación y autorización. Accediendo al siguiente paso si el usuario es "amy" y tiene acceso de administrador.

```javascript
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
```
**3º localhost:3000/login?username=amy&password=amyspassword**, la url de inicio de sesión para registrar al usuairo y el nivel de acceso de usuario en la sesion. La sesion será diferente para cada usuario, y también será única para el mismo usuario utilizando diferentes navegadores.
```javascript
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});
```
**4º localhost:3000/logout**, cierra sesión destruyendo la sesión creada.
```javascript
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
```
**5º localhost:3000/content**, obtiene el contenido protegido. La función de autenticación anterior se pasa como segundo parámetro del middleware antes de proceder a servir el contenido al usuario. SI la funcion de autenticación determinó que el usuario no era válido, no pasará a la función para servir el contenido
```javascript
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});
```
**6º** Se inicia la aplicación escuchando en el puerto 3000.
```javascript
app.listen(3000);
console.log("app running at http://localhost:3000");
```


### Ejemplo
Código ejemplo completo:
```javascript
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

app.listen(3000);
console.log("app running at http://localhost:3000");
```

#### Testeando el ejemplo
1. Creamos un fichero llamado `auth.js`(por ejemplo), y copiamos el código anterior en el mismo.
2. Ejecutamos el comando: `$ npm install express`.
3. Ejecutamos el comando: `$ npm install express-session`.
4. Ejecutamos el comando: `$ node session_auth.js`.

Tras ejecutar el comando del punto 4, el servidor comenzará a correr en nuestro puerto 3000. Si accedemos a un navegador e introducimos la url localhost:3000 accederemos a la página.

**Para comprobar el correcto funcionamiento de "auth":**

Si accedemos a la ruta `localhost:3000/content`, podremos comprobar que nos aparece **Unauthorized**, pues aún no nos hemos logueado. Para ello accederemos con el usuario "amy" y con la constraseña "amypassword" con la siguiente ruta `localhost:3000/loginusername=amy&password=amyspassword`, y nos aparecerá: **login success!**.
Tras loguearnos correctamente, ahora podremos acceder al contenido de la página con `localhost:3000/content`, pudiendo observar que ahora podemos ver: **You can only see this after you've logged in**.
Por último nos cerraremos nuestra sesión, accediendo a la ruta `localhost:3000/logout` apareciéndonos "**logout success!**", habiendo así cerrado sesión correctamente. Lo podremos comprobar accediendo al contenido nuevamente con la ruta `localhost:3000/content` y observando que nuevamente nos aparece: **Unauthorized**.

