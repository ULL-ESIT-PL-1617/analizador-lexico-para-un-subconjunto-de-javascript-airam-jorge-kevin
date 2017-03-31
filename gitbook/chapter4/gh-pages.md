# GitHub Pages
### ¿Qué son?
Las gh-pages o Github pages son webs que nos facilita Github para nuestros repositorios, alojadas en el propio repositorios Github. Al actualizar nuestro repositorio, también estaremos actualizando la gh-page.
### ¿Cómo utilizar la rama gh-pages?
En primer lugar deberemos crear una rama huérfana:
`$ git checkout --orphan gh-pages`
Luego deberemos borrar todo aquello que no sea necesario para la visualización de la página, siendo necesario tener un index.html en la raíz del repositorio.
Una vez puesto todo como queremos, realizamos un commit:
`$ git commit -m 'creamos la rama gh-pages'`
Y empujamos todo al repositorio de GitHub:
` $git push --set-upstream origin gh-pages`
Para visitar la web del repositorio entramos en:
`http(s)://<username>.github.io/<repositorio>`
### ¿Cómo usar Gh-pages para automatizar despliegues?
Para automatizar el despliegue podemos utilizar el siguiente código node.js:
```js
import GhPages from 'gh-pages'
export default function deployGitbook () {
  return new Promise((resolve, reject) => {
    GhPages.publish('./gh-pages', {
      repo: require('../package.json').repository.url,
      logger: console.log
    }, resolve)
  })
}
```

### Páginas de usuario en GitHub

Los usuarios y las organizaciones pueden tener acceso a almacenamiento para páginas web personales. El funcionamiento es el mismo que el de las propias GitHub pages, sólo que será necesario crear un repositorio siguiendo el siguiente esquema de nombre.

`<username>.github.io`

**El contenido de la rama master será el usado para construir y publicar tu página de *GitHub*** (Al contrario de los repositorios normales que utilizan la rama *gh-pages*). Sólo es posible utilizar tu nombre para crear el repositorio. Un repositorio del tipo `joe/bob.github.iop no será construido en una página de usuario.
