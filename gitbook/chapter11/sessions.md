# Sesiones en ExpressJS
Una sesión es un intercambio de información semi-permanenete. En este caso, el servidor envía una cookie de sesión a un cliente que este reenvia con cada conexión y permite al servidor identificarlo y asociar información con él sin confundirlo con otros usuarios. Para crear sesiones nos podemos ayudar del módulo `express-session`.

### Cookies de sesión

Las cookies permiten guardar información en el cliente, en este caso podrían guardar información sobre quién es el cliente la primera vez que se inicia la conexión. Con express podemos utilizar un middleware para utilizar las cookies con este propósito.

Primero, debemos inicializar  `cookieParser()` con un secreto, después el middleware de _cookieSession_ y por último el enrutador. Es necesario pasar como parámetro el secreto ya que _cookieSession_ genera la cookie firmada.

```javascript 
app.use(express.cookieParser('S3CRE7'));
app.use(express.cookieSession());
app.use(app.router);
```
Es posible además añadir opciones al inicializar el objeto cookieSession().

| Opción | Descripción |
|--|--|
| key | Nombre de la cookie |
| secret | Utilizado para firmar la cookie |
| cookie | Configuración de la cookie |
| proxy | Fija si confiar en el _reverse proxy_ |

### Sesión basada en Session store

Las _Session store_ permiten almacenar datos de las sesiones en el backend. Así es posible almacenar una cantidad de datos mucho mayor que con las cookies de forma más segura y fiable. Igual que en el apartado anterior podemos debemos inicializar de la siguiente forma.

```javascript 
app.use(express.cookieParser('S3CRE7'));
app.use(express.session());
app.use(app.router);
```
También igual que el apartado anterior podemos configurar el modulo sessión pasandole un objeto de configuración. Los valores son los mismos que con la _cookieSession_ pero además añadimos la key "_store_" que indica la instancia de la session store. Por defecto esta será la _MemoryStore_, sin embargo, esta es poco recomendada por no ser segura.

Se puede ver un ejemplo del uso de session en ExpressJS utilizando además autenticación en ese mismo apartado (que se verá a continuación).