# Expresiones regulares (JavaScript)

Las expresiones regulares nos permite ver si una cadena de texto cumple un determinado formato, por ejemplo, si todo son dígitos, si tiene formato de fecha y hora, etc. También nos permiten extraer partes de esa cadena de texto que cumplan ese formato, por ejemplo, si dentro de un texto más o menos largo hay una fecha, podemos extraerla fácilmente. Veamos aquí un pequeño tutorial empezando por la más básico y complicándolo poco a poco.

## Expresiones simples

Una expresión regular se construye con una cadena de texto que representa el formato que debe cumplir el texto. En javascript se puede hacer de dos formas, bien instanciando una clase RegExp pasándo como parámetro la cadena de formato, bien poniendo directamente la cedena de formato, en vez de entre comillas, entre /

```javascript
 // Son equivalentes
 var reg = new RegExp("aa")
 var reg = /aa/
 ```
 Ver si un texto tiene una determinada secuencia de letras o números fija es fácil. La expresión simplemente es esa cadena y podemos ver si un texto la tiene usando el método match() de ese texto
```javascript
 var reg = /javascript/;
 "hola javascript".match(reg);
 // devuelve un array de 1 elemento ["javascript"], indicando que sí existe esa cadena dentro del texto

 "adios tu".match(reg); 
 // devuelve null, indicando que no existe javascript dentro de "adios tu".
```
No es necesario definir la expresión regular antes, podemos hacerlo así
```javascript
 "hola javascript".match(/javascript/);
 // Devuelve ["javascript"]
 ```
Y para verificar si existe o no la cadena, podemos poner directamente un if
```javascript
 if ("hola javascript".match(/javascript/) {
    // Pasará por aquí, porque un array con un elemento se evalua como true en el if
 }

 if ("adios tu".match(/javascript/) {
    // No pasa por aquí, null se evalúa como false en el if.
 }
 ```
 
 ## Caracteres no alfabéticos ni numéricos
 
 Algunos de los caracteres no numéricos ni alfabéticos tienen un significado especial (lo vemos más adelante), como por ejemplo [ ] { } ( ) * . ^ $ etc. No podemos ponerlos tal cual si forman parte de nuestro formato, debemos "escaparlos" poniendo \\ delante
 
 ```javascript
 "esto es un *".match(/\*/);
 // Devuelve ["*"] indicando que existe un asterisco.
 ```
 
 ## Conjunto opcional de caracteres
 
 A veces nos da igual que una letra, por ejemplo, sea mayúscula o minúscula, o queremos que sea una vocal, o un dígito. Cuando queremos que una de las letras de nuestro texto pueda ser una cualquiera de un conjunto de letras determinado, las ponemos entre [] en nuestra expresión. Por ejemplo, si nos vale "Javascript" y "javascript", podemos poner la expresión como /[Jj]avascript/ para indicar que nos vale J mayúscula o j minúscula
 
 ```javascript
  "javascript con minuscula".match(/[Jj]avascript/);
 // Sí encuentra la cadena
 "Javascript con minuscula".match(/[Jj]avascript/);
 // También la encuentra.
 ```
 Si los caracteres válidos son varios y van ordenados según el juego de caracteres, podemos poner el primero y el último separados por un -. Por ejemplo, [a-z] vale para cualquier letra minúscula, [0-9] para cualquier dígito y [a-zA-Z] para cualquier letra mayúscula o minúscula
 ```javasript
  "aa2bb".match(/[0-9]/);  // Encuentra el 2, devolviendo ["2"].
  ```
  Podemos hacer lo contrario, es decir, que la letra no esté en ese conjunto de caracteres. Se hace poniendo el juego de caracteres que no queremos entre `[^ y ]`. Por ejemplo, para no dígitos pondríamos `[^0-9]`
  ```javascript
   "22 33".match(/[^0-9]/); // Encuentra el espacio en blanco, devolviendo [" "]
   ```
   
   ## Conjuntos habituales
   
   Hay varios conjuntos que se usan con frecuencia, como el de letras [a-zA-Z], el de dígitos [0-9] o el de espacios en blanco (espacio, tabulador, etc). Para estos conjuntos la expresión regular define formas abreviadas, como:
   
```
\w para letras, equivalente a [a-zA-Z]
\W para no letras, equivalente a [^a-zA-Z]
\d para dígitos, equivalente a [0-9]
\D para no dígitos, equivalente a [^0-9]
\s para espacios en blanco (espacios, tabuladores, etc).
\S para no espacios en blanco.
```

Por ejemplo:
```javascript
 "aa2bb".match(/\d/); // Encuentra el 2, devolviendo ["2"]
 ```
 
## Repetición de caracteres

Podemos querer buscar por ejemplo un conjunto de tres digitos, podemos hacerlo repitiendo tres veces el \d
```javascript
 "aa123bb".match(/\d\d\d/);   // Encuentra el 123, devolviendo ["123"]
```
pero esta forma es un poco engorrosa si hay muchos caracteres y es poco versátil. Las expresiones regulares nos permiten poner entre {} un rango de veces que debe repetirse. por ejemplo
```javascript
/\d{3}/       Busca 3 dígitos en la cadena
/\d{1,5}/     Busca entre 1 y 5 dígitos en la cadena.
/\d{2,}/      Busca 2 dígitos o más en la cadena.
```
como ejemplos
```javascript
"1234".match(/\d{2}/);
["12"]

"1234".match(/\d{1,3}/);
["123"]

"1234".match(/\d{3,10}/)
["1234"]
```
También suele haber rangos habituales como 0 o más veces, 1 o más veces, 0 ó 1 vez. Estos rangos habituales tienen caracteres especiales que nos permiten ponerlos de forma más simple.
```
* equivale a 0 o más veces {0,}
+ equivale a 1 o más veces {1,}
? equivale a 0 ó 1 vez {0,1}
```
Por ejemplo
```javascript
 "a2a".match(/a\d+a/);   // Encuentra a2a
 "a234a".match(/a\d+a/);  // Encuentra a234a
```
Cosas como * o + encuentran el máximo posible de caracteres. Por ejemplo, si nuestro patrón es /a+/ y nuestra cadena es "aaaaa", el resultado será todo la cadena
```javascript
 "aaaaa".match(/a+/);  // Devuelve ["aaaaa"]
```


Para hacer que se encuentre lo menos posible, se pone un ? detrás. Así por ejemplo, si nuestra expresión regular es /a+?/ y nuestra cadena es "aaaaa", sólo se encontrará una "a"
```javascript
 "aaaaa".match(/a+?/);  // Devuelve ["aaaaa"]
 ```
El comportamiento inicial se conoce como "greedy" o codicioso, en el que el patrón intenta coger la mayor parte de la cadena de texto posible. En segundo comportamiento se conoce como "nongreedy" o no codicioso, en el que el patrón coge lo menos posible de la cadena.

# Extraer partes de la cadena
A veces nos intersa no sólo saber si una cadena cumple un determinado patrón, sino extraer determinadas partes de él. Por ejemplo, si una fecha está en el formato "27/11/2012" puede interesarnos extraer los números. Una expresión regular que vale para esta cadena puede ser
```javascript
/\d{1,2}\/\d{1,2}\/\d{4}/
```
Suponiendo que el día y el mes puedan tener una cifra y que el año sea obligatoriamente de 4 cifras. En este caso:
```javascript
 "27/11/2012".match(/\d{1,2}\/\d{1,2}\/\d{4}/);
 ```
 nos devuelve un array con un único elemento que es la cadena "27/11/2012". Para extraer los trozos, únicamente debemos poner entre paréntesis en la expresión regular aquellas partes que nos interesan. Es decir:
 ```
 /(\d{1,2})\/(\d{1,2})\/(\d{4})/
 ```
 Si ahora ejecutamos el método match() con la misma cadena anterior, obtendremos un array de 4 cadenas. La primera es la cadena completa que cumple la expresión regular. Los otros tres elementos son lo que cumple cada uno de los paréntesis:
 ```
 "27/11/2012".match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);  // Devuelve el array
 ["27/11/2012", "27", "11", "2012"]
 ```
  Los paréntesis también nos sirven para agrupan un trozo y poner detrás uno de los símbolos de cantidades. Por ejemplo:
  ```javascript
  "xyxyxyxy".match(/(xy)+/);   // Se cumple, hay xy una o más veces.
  ```
   ## Usar lo encontrado en la expresión
   Las partes de la cadena que cumplen la parte de expresión regular entre paréntesis, se pueden reutilizar en la misma expresión regular. Estas partes encontradas se van almacenando en \1, \2, \3... y podemos usarlas. Este posibilidad es realmente interesante si queremos por ejemplo, verificar que una cadena de texto va cerrada entre comillas del mismo tipo, es decir, queremos buscar algo como 'esto' o "esto", pero no nos vale 'esto".
La expresión regular para buscar una cadena entre este tipo de comillas puede ser /(['"]).*\1/ es decir, buscamos una ' o una " con ['"]. Hacemos que lo que se encuentre se guarde metiéndolo entre paréntesis (['"]) y a partir de ahí nos vale cualquier conjunto de caracteres terminados en \1, que es lo que habíamos encontrado al principio.
```javascript
"'hola tu' tururú".match(/(["']).*\1/); // Devuelve ["'hola tu'", "'"]
"\"hola tu' tururú".match(/(["']).*\1/); // Devuelve null, la cadena comienza con " y termina en '
 ```
 ## Ignorar lo encontrado
 A veces nos interesa encontrar una secuencia que se repita varias veces seguidas y la forma de hacerlo es con los paréntesis, por ejemplo, si ponemos /(pa){2}/ estamos buscando "papa". Para evitar que esos paréntesis guarden lo encontrado en \1, podemos poner ?:, tal que así /(?:pa){2}/, de esta forma encontraremos "papa", pero se nos devolverá el trozo "pa" encontrado ni lo tendremos disponible en \1. Compara las dos siguientes:
 ```javascript
 "papa".match(/(pa){2}/);    // Devuelve ["papa", "pa"]
 "papa".match(/(?:pa){2}/);  // Devuelve ["papa"]
 ```
## Posición de la expresión

A veces nos interesa que la cadena busque en determinadas posiciones. Las expresiones regulares nos ofrecen algunos caracteres espaciales para esto.
^ indica el principo de cadena, por ejemplo, /^hola/ vale si la cadena "hola" está al principio
```javascript
 "hola tu".match(/^hola/);       // Devuelve ["hola"]
 "pues hola tu".match(/^hola/);  // Devuelve null
 ```
$ es el final de la cadena, por ejemplo /tu$/ vale si la cadena termina en "tu"
```javascript
 "hola tu".match(/tu$/);         // Devuelve ["tu"]
 "hola tu tururú".match(/tu$/);  // Devuelve null
 ```
\b indica una frontera de palabra, es decir, entre un caracter "letra" y cualquier otra cosa como espacios, fin o principio de linea, etc. De esta forma, por ejemplo, /\bjava\b/ buscará la palabra java, pero ignorará javascript
```javascript
 "java es güay".match(/\bjava\b/);          // Devuelve ["java"]
 "javascript es güay".match(/\bjava\b/);    // Devuelve null
```
\B es lo contrario de \b, así por ejemplo, /\bjava\B/ buscará una palabra que empiece por "java", pero no sea sólo java sino que tenga algo más
```javascript
 "java es güay".match(/\bjava\B/);       // Devuelve null
 "javascript es güay".match(/\bjava\B/); // Devuelve ["java"]
 ```
(?=expresion) sirve para posicionar el resto de la expresión regular y buscar antes o depués. Por ejemplo si queremos buscar un número que vaya delante de km, podemos hacer esto /\d+(?= km)/ , es decir, uno o más dígitos seguidos de un espacio y las letras km. La diferencia con esta expresión (/\d+ km/) es que en el primer caso sólo casan con la expresión los números, mientras que en el segundo caso se incluye también el " km"
```javascript
 "11 millas 10 km".match(/\d+(?= km)/);   // Devuelve ["10"]
 "11 millas 10 km".match(/\d+ km/);       // Devuelve ["10 km"]
```
Hay que tener cuidado si buscamos detrás, porque como el trozo (?=expresion) no se tiene en cuenta, sigue contando para el resto de la expresión. Por ejemplo, si queremos extraer la parte decimal de "11.22" podríamos pensar en hacer esto /(?=\.)\d+/ , pero no funciona porque el . decimal no se "consume" con (?=\.), así que debemos tenerlo en cuenta y ponerlo detrás, así /(?=\.)\.\d+/
```javascript
 "11.22".match(/(?=\.)\d+/); // Devuelve null
 "11.22".match(/(?=\.)\.\d+/); // Devuelve [".22"]
 ```
(?!expresion) hace lo contrario que (?=expresion), es decir, busca una posición donde no se cumpla expresión. Por ejemplo, para sacar lo que no sean km de "11 km, 12 km, 14 m" podemos poner /\d{2}(?! km)/
```javascript
 "11 km 12 km 14 m".match(/\d{2}(?! km)/); // Devuelve ["14"]
```
## Flags de opciones
Hemos visto que una expresión regular es /expresion/. Podemos poner algunos flags detrás, básicamente unas letras que cambian algo el comportamiento i es para ignorar mayúsculas y minúsculas.
```javascript
"hola".match(/HOLA/);  // Devuelve null
"hola".match(/HOLA/i);  // Devuelve ["hola"]
 ```
 g es para buscar todas las veces posibles la expresión, no sólo una vez
 ```javascript
 "11 223 44 66 77".match(/\d+/);   // Devuelve ["11"]
 "11 223 44 66 77".match(/\d+/g);  // Devuelve ["11", "223", "44", "66", "77"]
 ```
 m busca en cadenas con retornos de carro \n considerando estos como inicios de linea ^ o fin $
 ```javascript
 "hola\ntu".match(/^tu/);   // Devuelve null
 "hola\ntu".match(/^tu/m);  // Devuelve ["tu"]
 "hola\ntu".match(/hola$/);  // Devuelve null
 "hola\ntu".match(/hola$/m);  // Devuelve ["hola"]
 ```
 ## Otros métodos de cadena y de expresión regular
 Para todos estos ejemplos hemos usado el método match() de la clase String, ya que nos devuelve un array con las cosas que se encuentran y viendo los resultados es la forma más clara de ver cómo funcionan las distintas partes de la expresión regular. Sin embargo, tanto String como RegExp tienen otros métodos útiles
 
 **String.search(/expresion/)**
 Devuelve la posición donde se encuentra esa expresión dentro de la cadena, o -1 si no se encuentra.
 
**String.replace(/expresion/,cadena)**
Busca el trozo de cadena que casa con la expresión y la reemplaza con lo que le pasemos en el parámetro cadena. Este método tiene además un detalle intresante. Cuando en la expresión regular tenemos paréntesis para extraer algunas partes de la cadena, la misma expresión regular recuerda qué ha encontrado. En el método replace, si en la cadena de segundo parámetro aparecen cosas como $1, $2, utilizará lo encontrado.
```javascript
"ho3la".replace(/\d/,"X"); // Devuelve "hoXla"
"ho3la".replace(/(\d)/,"-$1-"); // Devuelve "ho-3-la"
 ```
**String.match(/expresion/)**
Ya lo hemos visto.

**String.split(/expresion/)**
Usa lo que sea que case con la expresión como separador y devuelve un array con la cadena partida en trozos por ese separador

```javascript
"hola, dos tres; cuatro".split(/\W+/); // Devuelve ["hola", "dos", "tres", "cuatro"]
```
## RegExp constructor
Además de crear las expresiones regulares con /expresion/flags, podemos hacerlo con un new de la clase RegExp, por ejemplo new RegExp("expresion","flags").
```javascript
 var reg = new RegExp("\\d+","g");
 "11 22 33".match(reg);  // Devuelve ["11","22","33"]
 ```
 Hay que fijarse en este caso que las \\ debemos escaparlas, con \\\\
## RegExp.exec()
Es similar a match() de String, pero sólo devuelve un resultado y hace que RegExp guarde la posición en la que lo ha encontrado. Sucesivas llamadas a exec(), nos iran devolviendo los siguientes resultados
```javascript
 var reg = new RegExp("\\d+");
 reg.exec("11 22 33");    // Devuelve ["11"]
 reg.exec("11 22 33");    // Vuelve a devolver ["11"], puesto que no hay flag g

 var reg = new RegExp("\\d+","g");
 reg.exec("11 22 33");    // Devuelve ["11"]
RegExp.exec()
Es similar a match() de String, pero sólo devuelve un resultado y hace que RegExp guarde la posición en la que lo ha encontrado. Sucesivas llamadas a exec(), nos iran devolviendo los siguientes resultados
 var reg = new RegExp("\\d+");
 reg.exec("11 22 33");    // Devuelve ["11"]
 reg.exec("11 22 33");    // Vuelve a devolver ["11"], puesto que no hay flag g

 var reg = new RegExp("\\d+","g");
 reg.exec("11 22 33");    // Devuelve ["11"]
 reg.exec("11 22 33");    // Vuelve a devolver ["22"], puesto que si hay flag g
 reg.exec("11 22 33");    // Vuelve a devolver ["33"], puesto que si hay flag g
 reg.exec("11 22 33");    // Devuelve null, ya no hay más resutlados. 
 reg.exec("11 22 33");    // Vuelve a devolver ["11"], despues de devolver null la RegExp se "reinicializa"
RegExp.test()
Similar a exec(), pero en vez de devolver lo encontrado, devuelve true si ha encontrado algo o false si no. Como la expresión regular recuerda las búsquedas anteriores, sucesivas llamadas a test() pueden devolver resultados distintos
 var reg = new RegExp("\\d+","g");
 reg.test("11 22 33");    // Devuelve true, porque encuentra el ["11"]
 reg.test("11 22 33");    // Vuelve a devolver true, porque encuentra el ["22"], puesto que si hay flag g
 reg.test("11 22 33");    // Vuelve a devolver true, porque encuentra el ["33"], puesto que si hay flag g
 reg.test("11 22 33");    // Devuelve false, ya no hay más resutlados. 
 reg.test("11 22 33");    // Vuelve a devolver true, porque vuelve a encontrar el ["11"], despues de devolver null la RegExp se "reinicializa" reg.exec("11 22 33");    // Vuelve a devolver ["22"], puesto que si hay flag g
 reg.exec("11 22 33");    // Vuelve a devolver ["33"], puesto que si hay flag g
 reg.exec("11 22 33");    // Devuelve null, ya no hay más resutlados. 
 reg.exec("11 22 33");    // Vuelve a devolver ["11"], despues de devolver null la RegExp se "reinicializa"
 ```
## RegExp.test()
Similar a exec(), pero en vez de devolver lo encontrado, devuelve true si ha encontrado algo o false si no. Como la expresión regular recuerda las búsquedas anteriores, sucesivas llamadas a test() pueden devolver resultados distintos
```javascript
 var reg = new RegExp("\\d+","g");
 reg.test("11 22 33");    // Devuelve true, porque encuentra el ["11"]
 reg.test("11 22 33");    // Vuelve a devolver true, porque encuentra el ["22"], puesto que si hay flag g
 reg.test("11 22 33");    // Vuelve a devolver true, porque encuentra el ["33"], puesto que si hay flag g
 reg.test("11 22 33");    // Devuelve false, ya no hay más resutlados. 
 reg.test("11 22 33");    // Vuelve a devolver true, porque vuelve a encontrar el ["11"], despues de devolver null la RegExp se "reinicializa"
 ```