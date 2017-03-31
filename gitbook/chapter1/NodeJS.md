# NodeJS
## ¿Qué es?
Node.js es una **librería y entorno de ejecución** de E/S dirigida por eventos y por lo tanto **asíncrona** que se ejecuta sobre el intérprete de JavaScript creado por Google [V8](http://code.google.com/p/v8/).
Aprovechando el motor V8 permite a Node proporciona un entorno de ejecución del lado del servidor que compila y ejecuta javascript a velocidades increíbles.
Node es de código abierto, y se ejecuta en Mac OS X, Windows y Linux.
## ¿Qué problema resuelve Node?
Por todas estas razones, el cuello de botella en toda la arquitectura de aplicación Web era el número máximo de conexiones concurrentes que podía manejar un servidor.
Node resuelve este problema cambiando la forma en que se realiza una conexión con el servidor. En lugar de generar un nuevo hilo de OS para cada conexión (y de asignarle la memoria acompañante), cada conexión dispara una ejecución de evento dentro del proceso del motor de Node.
Node afirma que un servidor que lo ejecute puede soportar decenas de miles de conexiones concurrentes.
Node es un programa de servidor. Sin embargo, el producto base de Node definitivamente No es como Apache o Tomcat.
## Ventajas
Es rápido, muy rápido. Esto es importante por varias razones:
* El desarrollo es más rápido.
* La ejecución de tests de unidad se puede hacer más rápido.
* Las aplicaciones son más rápidas y por tanto la experiencia de usuario es mejor.
* Menor coste de infraestrucutra (Linkedin pasó de tener 15 servidores a 4).

## Desventajas
* **API Inestable:**  La API de Node tiene la mala costumbre de cambiar en formas que rompen la compatibilidad hacia atrás de versión en versión.
* **Falta de una Librería Estándar y Generales:** JavaScript es un lenguajes con un buen núcleo pero con una flaca librería estándar.
* **Muchas Formas de Programar:** La falta inherente de organización de código se puede considerar una gran desventaja.
* **No está Probado lo Suficiente.** Mientras no tengamos grandes proyectos en producción por varios años, no podremos saber donde está el problema.

# NPM
*Node Package Manager* es el gestor que permite reutilizar código creado por otros usuarios para *NodeJS*. Otros desarrolladores crean módulos a los que podemos tener acceso instalándolos en el directorio del proyecto o de forma global en todo nuestro sistema. La instalación de `npm`se lleva a cabo junto a la instalación de *NodeJS*, explicada más adelante.
## Instalación de paquetes con npm
Para instalar paquetes para un proyecto que utilice *NodeJS* podemos ejecutar el siguiente comando.
`npm install --save-dev package`
Donde `package`es el paquete en cuestión que queremos instalar y `--save` indica que será una dependencia o, en nuestro caso, `--save-dev`una dependencia de desarrollo exclusivamente. También existe la opción `--save-optional`para que se muestre en la dependencias opcionales. 
`npm install --global package`
En este caso se nos permitirá instalar un paquete de forma global a todo la máqouina.
# Instalar NODEJS usando el instalador o los binarios oficiales
## Instalación de NodeJS en Windows
1. Nos descargamos el instalador desde la página de [node]("https://nodejs.org/es/").
2. Una vez descargado, ejecutas el instalador y ¡ya lo tienes!
Solo tendrás que acceder a la terminal de Windows (cmd) e introducimos el comando "node", entonces entrarás en la línea de comandos del propio NodeJS donde puedes ya escribir tus comandos Node, que luego veremos.

## Instalación de NodeJS en Linux
### Linux actualizados
Ejecutamos los siguientes comandos:
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Con el primer comando obtienes el instalador y con el segundo comando haces la instalación propiamente dicha.
### Linux desactualizados
Ejecutamos los siguientes comandos:
```
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs npm
```
### Instalación de NodeJS en Mac
Accedemos a la página de Node y descargar el instalador. Se instala como cualquier otra aplicación, tanto el propio NodeJS como npm.
# Instalar NodeJS por medio de un gestor de paquetes
Este método es mas limitado y solamente funciona para usuarios de sistemas operativos tipo UNIX (Linux, Mac).
### Archlinux
```
$ sudo pacman -S nodejs npm
```
### Fedora
```
$ sudo dnf groupinstall 'Development Tools'
$ sudo dnf install nodejs
```
### Debian, Ubuntu
```
$ sudo apt-get install build-essential
$ sudo apt-get install nodejs
```
### Mac (con Homebrew)
```
$ brew install nodejs
```
Al finalizar cualquiera de los procedimientos descritos arriba, habremos instalado node js y npm en nuestra máquina y estaremos listos para desarrollar nuestras aplicaciones usando el lenguaje de programación llamado JavaScript.
## Algunos comandos de NodeJS
Tras ejecutar el comando node accedemos a la línea de comandos del propio NodeJS, donde podremos escribir los comandos tales como:
```javascript
$ node
>console.log("Hola Mundo");
Hola Mundo
undefined
>console.log(30+52);
82
undefined
>var x = 300;
undefined
>var y = 250;
undefined
>console.log(x+y);
550
undefined
```
Observarás que te salen unos mensajes "undefined" en la consola y es porque las instrucciones que estamos ejecutando como "console.log()" no devuelven ningún valor.