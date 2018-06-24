'use strict';

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

  main();
} );

function readLine() {
  return inputString[ currentLine++ ];
}

// Complete the checkMagazine function below.
function checkMagazine( magazine, note, m, n ) {
  if ( m >= n ) {
    const ransomNote = new Map();
    const Words = new Set();
    note.map( word => {
      let count = ( ransomNote.has( word ) ) ? ransomNote.get( word ) : 0;
      count++;
      ransomNote.set( word, count );
      Words.add( word );
    } );
    const Repo = new Map();
    magazine.map( word => {
      if ( Words.has( word ) ) {
        let count = ( Repo.has( word ) ) ? Repo.get( word ) : 0;
        count++;
        Repo.set( word, count );
      }
    } );
    for ( const word of Words ) {
      const countInRepo = ( Repo.has( word ) ) ? Repo.get( word ) : false;
      const countInRansomNote = ransomNote.get( word );
      if ( !countInRepo || ( countInRepo < countInRansomNote ) ) {
        return 'No';
      }
    }
    return 'Yes';
  }
  return 'No';
}

function main() {
  const mn = readLine()
    .split( ' ' );

  const m = parseInt( mn[ 0 ], 10 );

  const n = parseInt( mn[ 1 ], 10 );

  const magazine = readLine()
    .split( ' ' );

  const note = readLine()
    .split( ' ' );

  const canCompile = checkMagazine( magazine, note, m, n );
  return canCompile;
}