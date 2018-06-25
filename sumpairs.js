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
const pair = function ( array, sum ) {
  const orderedPairKeys = new Set();
  const takenIndices = new Set();
  const orderedPairs = new Set();
  for ( let i = 0; i < array.length; i++ ) {
    const int = array[ i ];
    const position = i;
    const difference = sum - int;
    const pairIndex = array.indexOf( difference );
    if ( pairIndex >= 0 && pairIndex !== i ) {
      let Key;
      let orderedPair = [];
      if ( int < array[ pairIndex ] ) {
        Key = `${i}${pairIndex}`;
        orderedPair.push( int );
        orderedPair.push( array[ pairIndex ] );
      } else {
        Key = `${pairIndex}${i}`;
        orderedPair.push( array[ pairIndex ] );
        orderedPair.push( int );
      }
      if ( !orderedPairKeys.has( Key ) && !takenIndices.has( i ) && !takenIndices.has( pairIndex ) ) {
        orderedPairKeys.add( Key );
        orderedPairs.add( orderedPair );
        takenIndices.add( i );
        takenIndices.add( pairIndex );
      }
    }
  }
  console.log( orderedPairs );
};

function readLine() {
  return inputString[ currentLine++ ];
}
const main = function () {
  const nd = readLine()
    .split( ' ' );

  const n = parseInt( nd[ 0 ], 10 );
  const a = readLine()
    .split( ' ' )
    .map( aTemp => parseInt( aTemp, 10 ) );
  pair( a, n );

};