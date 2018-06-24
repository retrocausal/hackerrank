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

const anagram = function ( str1, str2 ) {
  const aStr1 = str1.split( '' );
  const aStr2 = str2.split( '' );
  const len1 = str1.length;
  const len2 = str2.length;
  const charsInAnagram = aStr2.reduce( ( chars, char ) => {
    if ( aStr1.indexOf( char ) !== -1 ) {
      chars.add( char );
    }
    return chars;
  }, new Set() );
  const charCount = new Map();
  let totalCount = 0;
  for ( const character of charsInAnagram ) {
    const countInStr1 = aStr1.reduce( ( count, char ) => {
      count += ( char === character ) ? 1 : 0;
      return count;
    }, 0 );
    const countInStr2 = aStr2.reduce( ( count, char ) => {
      count += ( char === character ) ? 1 : 0;
      return count;
    }, 0 );
    charCount.set( character, Math.min( countInStr1, countInStr2 ) );
    totalCount += charCount.get( character );
  }
  const Reduction1 = len1 - totalCount;
  const Reduction2 = len2 - totalCount;
  return Reduction1 + Reduction2;
};

function main() {
  const a = readLine();

  const b = readLine();

  const Reductions = anagram( a, b );
  console.log( Reductions );
}