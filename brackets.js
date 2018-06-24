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

const Stack = function () {
  this.struct = [];
};
Stack.prototype.add = function ( element ) {
  return this.struct.unshift( element );
};
Stack.prototype.top = function () {
  return this.struct[ 0 ];
};
Stack.prototype.deStack = function () {
  const top = this.struct.shift();
  return top;
};
Stack.prototype.empty = function () {
  return ( this.struct.length === 0 )
};

const Queue = function () {
  this.struct = [];
};

Queue.prototype.add = function ( element ) {
  return this.struct.push( element );
};
Queue.prototype.top = function () {
  return this.struct[ 0 ];
};
Queue.prototype.deQueue = function () {
  const top = this.struct.shift();
  return top;
};

function parse( e ) {
  const matches = new Map();
  const Beginnings = new Stack();
  const Endings = new Stack();
  const Openers = new Set( [ '{', '[', '(' ] );
  const Tailers = new Set( [ '}', ']', ')' ] );
  matches.set( '{', '}' );
  matches.set( '[', ']' );
  matches.set( '(', ')' );
  for ( let i = 0; i < e.length; i++ ) {
    const char = e[ i ];
    if ( Openers.has( char ) ) {
      Beginnings.add( char );
    } else {
      const match = matches.get( Beginnings.top() );
      if ( char !== match ) {
        console.log( 'NO' );
        return false;
      } else {
        Beginnings.deStack();
      }
    }
  }
  if ( !Beginnings.empty() ) {
    console.log( 'NO' );
    return false;
  }
  //console.log(Beginnings);
  console.log( 'YES' );
  return true;
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