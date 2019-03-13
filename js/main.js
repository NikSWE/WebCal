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
    var cal_display_value = [];

    // button listener
    $( "button" ).click( function () {
        let value = $( this ).val();
        
        // cal_display_value.push(value);
    } );
} );