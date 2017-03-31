# Sintaxis de las cookies

Las set cookies se utilizan para enviar el encabezado desde el servidor al agente de usuario Algunos ejemplos de sintaxis que tendran estas cabeceras son:

```
Set-Cookie: <cookie-name>=<cookie-value> 
Set-Cookie: <cookie-name>=<cookie-value>; Expira = <fecha>
Set-Cookie: <cookie-name>=<cookie-value>; Max-age = <distinto de 0>
Set-Cookie: <cookie-name>=<cookie-value>; Domain = <dominio-valor>
Set-Cookie: <cookie-name>=<cookie-value>; Path = <ruta-valor>
Set-Cookie: <cookie-name>=<cookie-value>; Seguro
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
Set-Cookie: <cookie-name>=<cookie-value>; SameSite = Estricto
Set-Cookie: <cookie-name>=<cookie-value>; SameSite = Lax
// Son posibles varias directivas también, por ejemplo:
Set-Cookie: <cookie-name>=<cookie-value>; Domain = <dominio-valor>; Seguro; HttpOnly
```

# Directivas

La estructura de una cookie es: = ,algunos ejemplos son :

```
. Una <cookie-name> : Puede ser cualquier valor pero no puede contener caracteres especiales como () <> @,; : \ "/ [] = {}?.
. Un <cookie-value> : Una cookie valor puede contener caracteres ascci
. __Secure-prefijo : Es una cookie que comienza por _secure y tiene que ser https
. __Host-prefijo : con prefijo _host y tiene que ser segura
```

Otra de las directivas es Expira = : Este tipo de directiva fija la caducidad de la cookie en si Max-age = : Se fija el numero de segundos hasta que la cookie expire Domain = : Indica el dominia al que se le envia la cookie Path = : Se indica la ruta del recurso solicitado Asegure : La cookie segura se envia por ssl y https HttpOnly : La cookie no es accesible desde javascript para prevenir ataques contra cross-site scripting (XSS). SameSite = estricta o SameSite = Lax : Permite a los servidores afirman que una cookie no debería ser enviado junto con peticiones de dominio cruzado, que proporciona cierta protección contra ataques entre sitios de falsificación de petición (CSRF).

# Ejemplos

Cookie de sesión : Este tipo de cookie se elimina cuando el equipo se apaga

```
Set-Cookie: sessionid=38afes7a8; httponly; Path=/
```

Cookie permanente : Al contrario de las cookie anterior esta cookie expira segun una fecha que se haya fijado

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

Cookie de terceros : Las cookie de tercero no pertenecen al dominio que visitas sino forma parte de otros dominios y son generalemente publicidad

```
Set-Cookie: qwerty=219ffwef9w0f; Domain=somecompany.co.uk; Path=/; Expires=Wed, 30 Aug 2019 00:00:00 GMT
```

Prefijos de cookie: Los prefijos Secure y Host solo podrán ser utilizada con la directiva secure
```
// Both accepted when from a secure origin (HTTPS)
Set-Cookie: __Secure-ID=123; Secure; Domain=example.com
Set-Cookie: __Host-ID=123; Secure; Path=/
// Rejected due to missing Secure directive
Set-Cookie: __Secure-id=1
// Rejected due to the missing Path=/ directive (unless at root of the site)
Set-Cookie: __Host-id=1; Secure
// Rejected due to setting a domain
Set-Cookie: __Host-id=1; Secure; Path=/; domain=example.com
```

# Estandar RFC

Los RFC mas conocidos sobre cookie son:
```
RFC 6265, sección 4.1: Set-Cookie : Mecanismo de HTTP Estado de Gestión
RFC-proyecto IETF httpbis-galleta-prefijos-00: Los prefijos de galletas
RFC-proyecto IETF-httpbis-galleta-misma-site-00: Las cookies del mismo sitio
RFC-proyecto IETF-httpbis-galleta-sola-01: Las cookies garantizarán el estricto
```

# Compatibilidad Navegador
```
Soporte básico Chrome: si Firefox: si
Max-Edad : Chrome: si Firefox: si
HttpOnly : Chrome: 1.0 Firefox: 3.0
Prefijos de cookies: Chrome: 49 Firefox: 50
SameSite : Chrome: 51 Firefox: No hay soporte
```
A partir de chrome y Firefox version 52 se considiran sitios inseguros los http