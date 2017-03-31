# HTTP Cookies

Una **HTTP cookie** es un pequeña pieza de información, la cual es generada y enviada desde **servidores**, a los usuarios que navegan en las distintas webs asociadas a dichos servidores. Esta pieza de información es almacenada en las máquinas **clientes** y enviada a los servidores en nuevas conexiones, dando persistensia a las **sesiones**. Esto se debe a que HTTP se trata de un protocolo, el cual no mantiene **estado**. Por lo tanto, sin el uso de las cookies, se tendría que establecer una nueva sesión en cada conexión. Hoy en día, para cada sitio web, las cookies son almacenadas de manera independiente gracias a lo que se denominan, **APIs de almacenamiento web**, utilizadas por los navegadores web.
Las cookies son usadas principalmente para los siguientes tres propositos:
* Como introducíamos, para la **administración de sesiones**.
* Para mantener las **preferencias de usuario**, dando la capacidad de personalizar a este.
* Análisis del **comportamiento del usuario**.

# Estructura de las HTTP Cookies

En general, las cookies suelen estas formadas por los siguientes **atributos**, además de campos identificativos como el nombre de la cookie, el dominio, etc:

* **Caducidad**: A cada cookie se deberá asociar un tiempo de expiración, el cual define el intervalo termporal en el que pueden ser usadas por el cliente. Trás sobrepasar este límite, el tiempo de expiración puede ser renovado. Por lo tanto, se han establecido las siguiente condiciones, las cuales definen cuando una cookie no podrá ser enviada a un servidor:
  * Al finalizar la sesión por parte del usuario (Cierre del navegador).
  * Al sobrepasar el tiempo de caducidad.
  * La fecha de expiración es modificada a una anterior. 
  * En este caso, por motivos de seguridad, el servidor puede llevar a cabo la acción de borrado.
  * Esta se borra por el usuario.
* **Autenticación**: Este campo es de gran uso, pues sirve para identificar de forma inequívoca a cada usuario cuando se ha establecido una conexión o se ha establecido una autenticación mediante usuario y contraseña en el respectivo servidor. Muchas plataformas utilizan este método de autenticación, como puede ser Yahoo!, Wikipedia o Facebook, pues las cookies no son la única forma de autenticación existente. El mecanismo es el siguiente:

  * El cliente visita la web por primera vez, por lo tanto no tiene almacenada ninguna cookie asociada a dicha página. En ese caso el servidor generará una cookie con información relativa a la petición y datos del cliente.
  
  * En las sucesivas visitas, el navegador enviará automáticamente automáticamente la cookie al servidor. La única diferencia es que la fecha y la hora del registro de la visita son modificadas.
  
* **Cesta**: Este atributo suele ser usado principalmente en plataformas webs de comercio electrónico, donde los usuario tienen la posibilidad de almacenar productos en una lista temporal para futuras compras. Aunque este método método puede ser muy inseguro, ya que existe la posibilidad de que otro usuario altere su contenido. Por ello, es más usual que se genere una cookie de "seguimiento" aleatoria que sea usada como referencia en el servidor.

# Creación de Cookies

Como hemos estudiado previamente, las cookies siguen una estructura predefinida. Pero, ¿Cómo es el proceso de creación de estas?. En primer lugar, en la primera petición, el servidor crea o genera lo que se denomina una Set-Cookie, mediante un programa CGI o Interfaz de entrada común. Esta contendrá la estrcutura de la cookie, pero con algunos campos vacíos, como por ejemplo, <cookie-value>. Por lo tanto, en la siguiente petición, esos campos vacíos serán completados por el cliente.

Por ejemplo:

Navegador->Servidor
```
GET /index.html HTTP/1.1
```

Navegador<-Servidor
```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value

(content of page)
```
Ahora, imaginemos que el mismo cliente hace otra petición a otra página del mismo servidor o dominio, en este caso no es necesario que el servidor genere una nueva cookie, pues el cliente ya posee una cookie de sesión para el mismo dominio. Por lo tanto, la petición tendría el siguiente aspecto:

Navegador->Servidor
```
GET /spec.html HTTP/1.1
Cookie: name=value
Accept: */*
```