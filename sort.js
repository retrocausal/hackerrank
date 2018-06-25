class Sort {
  constructor( array ) {
    this.input = array;
  }
  bubble() {
    const input = this.input.slice( 0 );
    const swap = function ( i, j ) {
      const temp = input[ i ];
      input[ i ] = input[ j ];
      input[ j ] = temp;
    };
    let sorted = false;
    let swaps = 0;
    while ( !sorted ) {
      sorted = true;
      for ( let i = 0; i < input.length; i++ ) {
        if ( input[ i ] > input[ i + 1 ] ) {
          sorted = false;
          swaps++;
          swap( i, i + 1 );
        }
      }
    }
    console.log( `${swaps} swaps yielded`, input );
  }
}
const myList = [ 986, 999, 1010, 23, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 21, 4, 1, 3, 9, 2334, 354, 1, 0, 0, 45, 123, 121, 111, 1111, 11111, 2324343434, 20, 25, 6, 21, 14 ];
const Sorter = new Sort( myList );
Sorter.bubble();