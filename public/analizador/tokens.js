"user strict";
// tokens.js
// 2016-01-13

// (c) 2006 Douglas Crockford

// Produce an array of simple token objects from a string.
// A simple token object contains these members:
//      type: 'name', 'string', 'number', 'operator'
//      value: string or number value of the token
//      from: index of first character of the token
//      to: index of the last character + 1

// Comments of the // type are ignored.

// Operators are by default single characters. Multicharacter
// operators can be made by supplying a string of prefix and
// suffix characters.
// characters. For example,
//      '<>+-&', '=>&:'
// will match any of these:
//      <=  >>  >>>  <>  >=  +: -: &: &&: &&

/*jslint this */

// Equivalente a regex.exec, sin embargo, solo va a devolver el match
// swwwi ocurrió justo al principio.
RegExp.prototype.bexec = function(str) {
    var i = this.lastIndex;
    var m = this.exec(str);
    return (m && m.index == i) ? m : null;
}

String.prototype.tokens = function () {
    let from;                   // The index of the start of the token.
    let i = 0;                  // The index of the current character.
    let n;                      // The number value.
    let m;                      // Contiene el match encontrado.
    let result = [];            // An array to hold the results.

    const WHITES              = /\s+/g;
    const ID                  = /[a-zA-Z_]\w*/g;
    const NUM                 = /\b[+-]?\s*(\d+\.?\d*|\d*\.\d+)([Ee][+-]?\d+)?\b/g;
    const STRING              = /"[^"\\]*(\\.[^"\\]*)*"|'[^'\\]*(\\.[^'\\]*)*'/g;
    const ONELINECOMMENT      = /\/\/.*/g;
    const MULTIPLELINECOMMENT = /\/[*](.|\n)*?[*]\//g;
    const TWOCHAROPERATORS    = /(===|!==|[+][+=]|-[-=]|=[=<>]|[<>][=<>]|&&|[|][|])/g;
    const ONECHAROPERATORS    = /([-+*\/=()&|;:,<>.{}[\]?!%])/g;
    const tokens = [WHITES, ID, NUM, STRING, ONELINECOMMENT,
                  MULTIPLELINECOMMENT, TWOCHAROPERATORS, ONECHAROPERATORS ];

    // Make a token object.
    let make = function (type, value) {
        return {
            type: type,
            value: value,
            from: from,
            to: i
        };
    };

    // Devuelve el token y avanza la cadena actual
    // la distancia que mida el token.
    let getTok = function() {
      let str = m[0];
      i += str.length; // Warning! side effect on i
      return str;
    };

    // Begin tokenization. If the source string is empty, return nothing.
    if (!this)
        return;

    // Loop through this text, one character at a time.
    while (i < this.length) {
        tokens.forEach(function(t) { t.lastIndex = i;}); // Cada vez que avanza i, fija todos los lastIndex de los regex a la posición de i
        from = i;

        // Ignora los comentarios y los espacios en blanco, si alguno hace match
        // justo al principio no se se recoje el token y se avanza la cadena.
        if (m = WHITES.bexec(this) ||
           (m = ONELINECOMMENT.bexec(this))  ||
           (m = MULTIPLELINECOMMENT.bexec(this))) {
               getTok();
        }
        // Si hay match con un ID, crea el objeto token de tipo name
        else if (m = ID.bexec(this)) {
            result.push(make('name', getTok()));
        }
        // Si hay match con un número, crea el objeto token de tipo número
        else if (m = NUM.bexec(this)) {
            n = +getTok(); // Conviertelo en un número

            if (isFinite(n)) {
                result.push(make('number', n));
            } else {
                make('number', m[0]).error("Bad number"); // Error si el númnero es infinito
            }
        }
        // Si hay match con un string, crea el objeto token de tipo string quitando
        // las comillas de los lados.
        else if (m = STRING.bexec(this)) {
            result.push(make('string', getTok().replace(/^["']|["']$/g,'')));
        }
        // Si hay match con un número, crea el objeto token de tipo operador (Dos caracteres)
        else if (m = TWOCHAROPERATORS.bexec(this)) {
            result.push(make('operator', getTok()));
            // Si hay match con un número, crea el objeto token de tipo operador (Un caracter)
        } else if (m = ONECHAROPERATORS.bexec(this)) {
            result.push(make('operator', getTok()));
        } else {
          throw "Syntax error near '"+this.substr(i)+"'";
        }
    }
    return result;
};
