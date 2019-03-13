$( document ).ready( function () {
  // array which contains user's expression
  let userExpression = [];

  // array which contains all the valid operators
  // performed by the calculator
  let operatorList = [ "+", "-", "*", "/", "%", "+/-" ];

  // calculate sum of operands
  let add = function ( a, b ) {
    a = Number( a );
    b = Number( b );
    return `${a + b}`;
  };

  // calculate difference of operands
  let subtract = function ( a, b ) {
    a = Number( a );
    b = Number( b );
    return `${a - b}`;
  };

  // calculate product of operands
  let multiply = function ( a, b ) {
    a = Number( a );
    b = Number( b );
    return `${a * b}`;
  };

  // calculate quotient of operands
  let divide = function ( a, b ) {
    a = Number( a );
    b = Number( b );
    return `${a / b}`;
  };

  // calculate remainder of operands
  let modulo = function ( a, b ) {
    a = Number( a );
    b = Number( b );
    return `${a % b}`;
  };

  // check if value is an operator
  // if an operator return true
  // else return false
  let isOperator = function ( array, value ) {
    let flag = false;
    array.forEach( function ( operator ) {
      if ( value === operator ) {
        flag = true;
      }
    } );
    return flag;
  };

  // set the calculator display
  let setCalDisplay = function ( value ) {
    $( '#cal-display' ).val( value );
  };

  // get the calculator display
  let getCalDisplay = function () {
    return $( '#cal-display' ).val();
  };

  // update the value on calculator
  let updateCalDisplay = function () {
    if ( isOperator( operatorList, userExpression[ userExpression.length - 1 ] ) ) {
      setCalDisplay( userExpression[ userExpression.length - 2 ] );
    } else {
      setCalDisplay( userExpression[ userExpression.length - 1 ] );
    }
  }

  // evaluate userExpression
  let evaluate = function ( array ) {
    let operand1, operand2, operator, result, i = 0;
    while ( array.length != 1 ) {
      operand1 = array[ i ];
      operator = array[ i + 1 ];
      operand2 = array[ i + 2 ];

      // check operator
      // call the corresponding function
      switch ( operator ) {
        case "+":
          result = add( operand1, operand2 );
          break;
        case "-":
          result = subtract( operand1, operand2 );
          break;
        case "*":
          result = multiply( operand1, operand2 );
          break;
        case "/":
          result = divide( operand1, operand2 );
          break;
        case "%":
          result = modulo( operand1, operand2 );
          break;
        default:
          break;
      }
      array.splice( i, 3, result );
      console.log( i );
    }
    return array[ 0 ];
  };

  // button listener
  $( "button" ).click( function () {
    // obtain the value of the btn
    let value = $( this ).val();

    if ( value === "AC" ) {
      // clear the userExpression array
      userExpression = [];
      setCalDisplay( $( '#cal-display' ).attr( 'placeholder' ) );
    } else if ( value === "DEL" ) {
      // check if userExpression array is empty
      // if yes print error on display
      if ( userExpression === undefined || userExpression.length == 0 ) {
        setCalDisplay( 'Error :( Nothing to eat' );
      }
      // else if check if value at
      // last index is an operator
      // if yes pop the value
      else if ( isOperator( operatorList, userExpression[ userExpression.length - 1 ] ) ) {
        userExpression.pop();
      }
      // else delete the last input
      else {
        let temp = userExpression[ userExpression.length - 1 ];
        // check if the length of temp
        // is equal to 1 if yes then
        // pop the last value from userExpression
        if ( temp.length == 1 ) {
          userExpression.pop();
        }
        // else slice the last value from temp
        // and push it back in userExpression
        else {
          temp = temp.slice( 0, -1 );
          userExpression.splice( userExpression.length - 1, 1, temp );
        }
      }
    } else if ( value === "=" ) {
      // evaluate the userExpression array
      // if userExpression is empty
      if ( userExpression === undefined || userExpression.length == 0 ) {
        setCalDisplay( 'Error :( Feed me Numbers' );
      } else if ( userExpression.length == 1 ) {
        setCalDisplay( userExpression[ 0 ] );
        userExpression = [];
      } else {
        setCalDisplay( evaluate( userExpression ) );
        userExpression = [];
      }
    } else if ( userExpression === undefined || userExpression.length == 0 ) {
      // array empty or does not exist
      // check if value is an operator
      // if yes print error on display
      if ( isOperator( operatorList, value ) ) {
        setCalDisplay( 'Error :( Binary operator genius!' );
        console.log( 'in this section' );

      }
      // else push the value into the array
      else {
        userExpression.push( value );
      }
    } else if ( isOperator( operatorList, value ) ) {
      // check if value of the btn
      // check if the value is '+/-'
      // if yes solve the value
      if ( value === '+/-' ) {
        // check if last value is an operator if 'yes'
        // pop that value and operate on next value
        if ( isOperator( operatorList, userExpression[ userExpression.length - 1 ] ) ) {
          userExpression.pop();
          userExpression.push( multiply( userExpression.pop(), '-1' ) );
        }
        // else operate on second last value 
        else {
          userExpression.push( multiply( userExpression.pop(), '-1' ) );
        }
      }
      // check last value in array
      // if the value is operator
      // change the operator
      else if ( isOperator( operatorList, userExpression[ userExpression.length - 1 ] ) ) {
        userExpression.pop();
        userExpression.push( value );
      }
      // else push into the array
      else {
        userExpression.push( value );
      }
    } else {
      // check value at last index of userExpression array
      // if it is an operator then push the value
      if ( isOperator( operatorList, userExpression[ userExpression.length - 1 ] ) ) {
        userExpression.push( value );
      }
      // else pop prev value and concat
      // with new value push it back afterwards
      else {
        let temp = userExpression.pop();
        temp += value;
        userExpression.push( temp );
      }
    }
    console.log( userExpression );

    updateCalDisplay();

  } );
} );