$( document ).ready( function () {
  // makes sure the whole site is loaded 
  $( window ).on( 'load', function () {
    // will fade the pacman
    $( '.pacman' ).delay( 600 ).fadeOut();
    // will fade the preloader background
    $( '.preloader-wrapper' ).delay( 1000 ).fadeOut( 'slow' );
    $( 'body' ).delay( 1000 ).css( {
      'overflow': 'visible'
    } );
  } )

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
  let isOperator = function ( value ) {
    let flag = false;
    operatorList.forEach( function ( operator ) {
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

  // update the value on calculator
  let updateCalDisplay = function () {
    if ( isOperator( userExpression[ userExpression.length - 1 ] ) ) {
      setCalDisplay( userExpression[ userExpression.length - 2 ] );
    } else {
      setCalDisplay( userExpression[ userExpression.length - 1 ] );
    }
  }

  // evaluate userExpression
  let evaluate = function ( array ) {
    let operand1, operand2, operator, result;
    while ( array.length != 1 ) {
      operand1 = array[ 0 ];
      operator = array[ 1 ];
      operand2 = array[ 2 ];

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
      array.splice( 0, 3, result );
    }
    return array[ 0 ];
  };

  // button listener
  $( "button" ).click( function () {
    // obtain the value of the btn
    let value = $( this ).val();

    // check if 'AC' is pressed
    // clear the userExpression array
    if ( value === "AC" ) {
      userExpression = [];
      setCalDisplay( $( '#cal-display' ).attr( 'placeholder' ) );
    }
    // check if 'DEL' is pressed
    else if ( value === "DEL" ) {
      // check if userExpression array is empty
      if ( userExpression === undefined || userExpression.length == 0 ) {
        // if yes print error on display
        setCalDisplay( 'Error :( Nothing to eat' );
      }
      // check if value at last index is an operator
      else if ( isOperator( userExpression[ userExpression.length - 1 ] ) ) {
        // if yes pop the value
        userExpression.pop();
      } else {
        // else delete the last input
        let temp = userExpression[ userExpression.length - 1 ];

        // check if length of temp is equal to 1 
        if ( temp.length == 1 ) {
          // if yes then pop from userExpression
          userExpression.pop();
          setCalDisplay( '0' );
        }
        // else slice the last value from temp
        // and push it back in userExpression
        else {
          temp = temp.slice( 0, -1 );
          userExpression.splice( userExpression.length - 1, 1, temp );
          updateCalDisplay();
        }
      }
    }
    // check if '=' is pressed
    else if ( value === "=" ) {
      // evaluate the userExpression array
      // if userExpression is empty
      if ( userExpression === undefined || userExpression.length == 0 ) {
        setCalDisplay( 'Error :( Feed me Numbers' );
      }
      // if userExpression contains 1 element
      else if ( userExpression.length == 1 ) {
        setCalDisplay( userExpression[ 0 ] );
        userExpression = [];
      } else {
        setCalDisplay( evaluate( userExpression ) );
        userExpression = [];
      }
    }
    // check if someother btn is pressed
    // userExpression is empty or does not exist
    else if ( userExpression === undefined || userExpression.length == 0 ) {
      // check if value is an operator
      if ( isOperator( value ) ) {
        // if yes print error on display
        setCalDisplay( 'Error :( Binary operator genius!' );
      }
      // else push the value into the array
      else {
        userExpression.push( value );
        updateCalDisplay();
      }
    }
    // check if operator btn is pressed
    else if ( isOperator( value ) ) {
      // check if the value is '+/-'
      if ( value === '+/-' ) {
        // if yes solve the value and then push the updated value
        // check if last value is an operator if 'yes'
        // pop that value and operate on next value
        if ( isOperator( userExpression[ userExpression.length - 1 ] ) ) {
          userExpression.pop();
          userExpression.push( multiply( userExpression.pop(), '-1' ) );
        }
        // else operate on last value 
        else {
          userExpression.push( multiply( userExpression.pop(), '-1' ) );
        }
        updateCalDisplay();
      }
      // check last value in array
      // if the value is operator
      // change the operator
      else if ( isOperator( userExpression[ userExpression.length - 1 ] ) ) {
        userExpression.pop();
        userExpression.push( value );
      }
      // else push into the array
      else {
        userExpression.push( value );
      }
    }
    // value pressed must be a number
    else {
      // check value at last index of userExpression array
      // if it is an operator then push the value
      if ( isOperator( userExpression[ userExpression.length - 1 ] ) ) {
        userExpression.push( value );
      }
      // else pop prev value and concat with new value push it back afterwards
      else {
        let temp = userExpression.pop();
        temp += value;
        userExpression.push( temp );
      }
      updateCalDisplay();
    }
  } );
} );