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
  merge( array ) {
    const input = array || this.input.slice( 0 );
    const floor = 0;
    const ceil = input.length;
    const Pivot = Math.min( ceil / 2 );
    if ( ceil > 1 ) {
      const SliceA = input.slice( floor, Pivot );
      const SliceB = input.slice( Pivot, ceil );
      this.merge( SliceA );
      this.merge( SliceB );
      const result = this.mergeHalves( input, SliceA, SliceB );
      return input;
    }
    return false;
  }
  mergeHalves( array, left, right ) {
    let leftLen = left.length;
    let rightLen = right.length;
    let length = array.length;
    let [ i, j, k ] = [ 0, 0, 0 ];
    const fullOfHalves = [];
    while ( i < leftLen && j < rightLen ) {
      if ( left[ i ] < right[ j ] ) {
        fullOfHalves.push( left[ i ] );
        i++;
      } else {
        fullOfHalves.push( right[ j ] );
        j++;
      }
    }
    while ( i < leftLen ) {
      fullOfHalves.push( left[ i ] );
      i++;
    }
    while ( j < rightLen ) {
      fullOfHalves.push( right[ j ] );
      j++;
    }
    while ( k < length ) {
      array[ k ] = fullOfHalves[ k ] || array[ k ];
      k++;
    }
    return array;
  }
}
const myList = [ 986, 999, 1010, 23, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 21, 4, 1, 3, 9, 2334, 354, 1, 0, 0, 45, 123, 121, 111, 1111, 11111, 2324343434, 20, 25, 6, 21, 14 ];
const Sorter = new Sort( myList );
//Sorter.bubble();
console.log( Sorter.merge() );