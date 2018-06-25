const Stack = function () {
  this.struct = [];
};
Stack.prototype.add = function ( element ) {
  return this.struct.unshift( element );
};
Stack.prototype.read = function () {
  return this.struct[ 0 ];
};
Stack.prototype.deStack = function () {
  const top = this.struct.shift();
  return top;
};
Stack.prototype.isEmpty = function () {
  return ( this.struct.length === 0 )
};
Stack.prototype.log = function () {
  console.log( this.read() );
};
process.stdin.resume();
process.stdin.setEncoding( "ascii" );
let _input = "";
let currentLine = 0;
process.stdin.on( "data", function ( input ) {
  _input += input;
} );

process.stdin.on( "end", function () {
  _input = _input.replace( /\s*$/, '' )
    .split( '\n' )
    .map( str => str.replace( /\s*$/, '' ) );
  main();
} );

function readLine() {
  return _input[ currentLine++ ];
}

function processData( input, ActionMap, In, Actions ) {
  //Enter your code here
  const Line = input.split( ' ' );
  const Action = ActionMap.get( Line.shift() );
  if ( Action === 'add' ) {
    const Element = Line.shift();
    In.add( Number( Element ) );
    Actions.push( 'read' );
  } else {
    Actions.push( Action );
  }
}

function main() {

  const StackIn = new Stack();
  const StackOut = new Stack();
  const Actions = [];
  const ActionMap = new Map();
  ActionMap.set( '1', 'add' );
  ActionMap.set( '2', 'deStack' );
  ActionMap.set( '3', 'log' );
  const t = parseInt( readLine(), 10 );
  for ( let tItr = 0; tItr < t; tItr++ ) {
    const expression = readLine();
    processData( expression, ActionMap, StackIn, Actions );
  }
  while ( !StackIn.isEmpty() ) {
    StackOut.add( StackIn.deStack() );
  }
  //console.log(StackOut);
  for ( let i = 0; i < Actions.length; i++ ) {
    const Action = Actions[ i ];
    StackOut[ Action ]();
  }
}
/*
Stack { struct: [ 42, 14, 28, 60, 78 ] }
read 42
deStack 42
read 14
log 14
read 14
log 14
read 14
read 14
deStack 14
deStack 28
*/