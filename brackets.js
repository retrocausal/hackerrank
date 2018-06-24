'use strict';

process.stdin.resume();
process.stdin.setEncoding( 'utf-8' );

let inputString = '';
let currentLine = 0;

process.stdin.on( 'data', inputStdin => {
  inputString += inputStdin;
} );

process.stdin.on( 'end', _ => {
  inputString = inputString.replace( /\s*$/, '' )
    .split( '\n' )
    .map( str => str.replace( /\s*$/, '' ) );

  main();
} );

function readLine() {
  return inputString[ currentLine++ ];
}
class Dictionary {
  constructor() {
    const Grammar = new Map();
    Grammar.set( '{', '}' );
    Grammar.set( '(', ')' );
    Grammar.set( '[', ']' );
    this.map = Grammar;
  }
  defineOpeners() {
    const Collection = new Set();
    for ( const [ key, value ] of this.map ) {
      Collection.add( key );
    }
    this.openers = Collection;
  }
}
class Stack {
  constructor() {
    this.struct = [];
  }
  top() {
    return ( this.struct[ 0 ] ) ? this.struct[ 0 ] : -1;
  }
  add( Char ) {
    return this.struct.unshift( Char );
  }
  destack() {
    return this.struct.shift();
  }
  empty() {
    return ( this.struct.length ) ? false : true;
  }
}

function parse( expression ) {
  const Grammar = new Dictionary();
  Grammar.defineOpeners();
  const Stream = new Stack();
  const Parser = expression[ Symbol.iterator ]();
  let next = Parser.next();
  while ( !next.done ) {
    const Char = next.value;
    if ( Grammar.openers.has( Char ) ) {
      Stream.add( Char );
    } else {
      const lastOpened = Stream.top();
      const Definition = ( Grammar.map.has( lastOpened ) ) ? Grammar.map.get( lastOpened ) : -1;
      if ( Char === Definition ) {
        Stream.destack();
      } else {
        console.log( 'NO' );
        return false;
      }
    }
    next = Parser.next();
  }
  if ( !Stream.empty() ) {
    console.log( 'NO' );
    return false;
  }
  console.log( 'YES' );
}

function main() {
  const t = parseInt( readLine(), 10 );
  for ( let tItr = 0; tItr < t; tItr++ ) {
    const expression = readLine();
    const length = expression.length;
    if ( length % 2 === 0 ) {
      parse( expression.split( '' ) );
    } else {
      console.log( `NO` );
      continue;
    }
  }
}