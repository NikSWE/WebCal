$( document ).ready( function () {

    // calculate sum of operands
    let add = function ( a, b ) {
        return a + b;
    }

    // calculate difference of operands
    let subtract = function ( a, b ) {
        return a - b;
    }

    // calculate product of operands
    let multiply = function ( a, b ) {
        return a * b;
    }

    // calculate quotient of operands
    let divide = function ( a, b ) {
        return a / b;
    }

    // calculate remainder of operands
    let modulo = function ( a, b ) {
        return a % b;
    }

    // array which contains user's expression
    let userExpression = [];
    console.log( userExpression );


    // array which contains all the valid operators
    // performed by the calculator
    let operatorList = [ '+', '-', '*', '/', '%', '+/-' ];

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
    }

    // button listener
    $( "button" ).click( function () {
        let value = $( this ).val();

        if ( userExpression === undefined || userExpression.length == 0 ) {
            // array empty or does not exist
            // push the value into the array
            userExpression.push( value );
        } else if ( isOperator( operatorList, value ) ) {
            // check if value of the btn
            // is an operator if 'yes'
            // push into the array
            userExpression.push( value );
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
    } );
} );