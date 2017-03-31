### ¿Qué es Gulp?.
Gulp es una herramienta de automatización de tareas escrito en Javascript para Node.js. Al contrario que otros sistemas de automatización como Grunt, Gulp hace uso del módulo Stream de Node.js para poder concatenar tareas usando tuberías. Normalmente los automatizadores de tareas escriben los cambios al disco después de cada tarea, lo que provoca retardo cuando manejamos muchos ficheros. La ventaja de usar tuberías, es que estos ficheros no pasan por el disco, sino que se pasan de tubería en tubería, lo que aumenta la velocidad a la que se ejecutan las tareas.
### ¿Cómo automatizar tareas con Gulp?
En esta sección veremos cómo usar gulpfile, tomando de ejemplo un desarrollo simple de frontend.
Fichero gulpfile.js

Al igual que otros automatizadores de tareas, necesitaremos un fichero de configuración donde almacenaremos nuestras tareas y otras cosas que necesitemos. Gulp sigue la convención de llamar a su fichero por el nombre del programa y la palabra file, como makefile, rakefile o gruntfile.
### Ejemplo de tarea
Para poder crear una tarea, necesitamos llamar a la función task de gulp, y pasarle como parámetros el nombre de la tarea y la función que se ejecutará al ser llamada. Por ejemplo, para minificar ficheros y almacenarlos en el directorio dist:
```javascript
var gulp = require('gulp');
var minify = require('gulp-minifier');

gulp.task('minify', function() {
  return gulp.src(['index.html', 'styles.css', 'main.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist'));
})
```
De este modo, minificaríamos los ficheros index.html, styles.css y main.js y los almacenaríamos en dist.
### Tareas
- **contributors**: Generar el fichero MAINTAINERS con los datos de quienes hayan hecho commits.
- **generateGitbook**: Convertir los MD a HTML usando gitbook y colocarlo en el directorio gh-pages.
- **generateWiki**: Desplegar el contenido del directorio gh-pages en las Gh-pages.
- **deployWiki**: Desplegar el contenido del directorio wiki en la wiki del repo (aunque aquí no funcionan los plugins de gitbook).
- **serve**: Lanza un servidor que se recarga automáticamente cuando hay algún cambio.
- **install**: Instala los plugins de gitbook.
- **build**: Instala los plugins y genera la wiki y las gh-pages.
- **deploy**: Despliga los contenido de la wiki y las gh-pages en los lugares correspondientes.
- **default**: La tarea por defecto apunta a build.