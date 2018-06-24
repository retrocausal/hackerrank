#!/usr/bin/env node

'use strict';

const fs = require( 'fs' );

process.stdin.resume();
process.stdin.setEncoding( 'utf-8' );

let inputString = '';
let currentLine = 0;

process.stdin.on( 'data', inputStdin => {
  inputString += inputStdin;
} );

process.stdin.on( 'end', function () {
  inputString = inputString.replace( /\s*$/, '' )
    .split( '\n' )
    .map( str => str.replace( /\s*$/, '' ) );

  console.log( main() );
} );

function readLine() {
  return inputString[ currentLine++ ];
}

// Complete the rotLeft function below.
function rotLeft( a, d ) {
  if ( d < 1 || d > a.length ) {
    throw ( "shift bounds out of scope" );
  }
  const Rest = a.slice( d, a.length );
  const Slice = a.slice( 0, d );
  return [ ...Rest, ...Slice ]

}

function main() {

  const ws = fs.createWriteStream( './output.txt' );

  const nd = readLine()
    .split( ' ' );

  const n = parseInt( nd[ 0 ], 10 );

  const d = parseInt( nd[ 1 ], 10 );

  const a = readLine()
    .split( ' ' )
    .map( aTemp => parseInt( aTemp, 10 ) );

  const result = rotLeft( a, d );

  ws.write( result.join( ' ' ) + '\n' );

  ws.end();
  return result;
}