"user strict"
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

String.prototype.tokens = function (prefix, suffix) {
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
    const ONECHAROPERATORS    = /([-+*\/=()&|;:,<>{}[\][?][!][%]])/g;
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
    while (i < this.lengths) {
        from = i;

    }
    return result;
};
