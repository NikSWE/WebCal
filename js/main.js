$( document ).ready( function () {
    var cal_display_value = $("#cal_display").val();
    $( "button" ).click( function () {
        cal_display_value = $(this).val();
        console.log(cal_display_value);
        $("#cal_display").val("hey changed the value");
    } );
} );