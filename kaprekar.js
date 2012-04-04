var low = 1;
var high = 1000;

function kaprekar( origNum ) {
    var num = origNum;

    for( var iter = 0; num != 6174 && iter < 9999; iter++ )
    {
        // break the number down into digits
        var digits = splitDigits( num );

        var origDigits = digits.sort().slice(0);

        // sort the digits, first into ascending then reverse
        digits.reverse();

        // assemble the digits in decending order
        // and use that as the big number
        var bigNum = 0;
        for( var i = 0; i < 4; i++ )
        {
            bigNum += digits.pop() * (Math.pow(10, i));
        }

        // assemble the digits in ascending order
        // and use that as the small number
        var smallNum = 0;
        for( var i = 0; i < 4; i++ )
        {
            smallNum += origDigits.pop() * (Math.pow( 10, i ));
        }

        num = bigNum - smallNum;
    }
    return iter;
}

function splitDigits( x ) {

    var digits = [];
    while( x != 0 )
    {
        digits.push( x % 10 );
        x = Math.floor( x / 10 );
    }

    // assure the number length is 4
    // and fill with leading zeros
    // if necessary
    while( digits.length < 4 )
        digits.push( 0 );

    return digits;
}

function color( iter ) {
    switch( iter )
    {
        case 0:
            return "#000000";
        case 1:
            return "#00FF00";
        case 2:
            return "#00DD00";
        case 3:
            return "#00BB00";
        case 4:
            return "#009900";
        case 5:
            return "#007700";
        case 6:
            return "#005500";
        case 7:
            return "#003300";
        default:
            return "#FF0000";
    }
}

function valid( x ) {
    
    var digits = splitDigits( x );
    var first = digits[0];
    for( var i = 1; i < digits.length; i++ )
    {
        if( digits[i] != first )
            return true;
    }

    return false;
}

function fillCanvas() {
    var canvas = document.getElementById( "kaprekar" );
    var ctx = canvas.getContext( "2d" );

    for( var i = 0; i < canvas.width; i++ )
    {
        var value = Math.round( low + high * ( i / canvas.width ));
        // don't use all one digit numbers
        if( !valid( value ) ) {
            ctx.fillStyle = "#00FF00";
            ctx.fillRect( i, 0, 1, canvas.height );

            continue;
        } else {

            var iters = kaprekar( value );
            if( iters == 9999 ) console.log( "bad val: " + value );
            ctx.fillStyle = color( iters );
            ctx.fillRect( i, 0, 1, canvas.height );
        }
    }
}
function log( x ) {
    return;
    document.write( x + "<br/>" );
}

window.onload = function() {
    fillCanvas();
    var canvas = document.getElementById( "kaprekar" );
    var mouseHandler = function( event ) {
        var span = document.getElementById( "coords" );
        var newX = event.x - canvas.offsetLeft;
        var rangeX = low + Math.round(high * ( newX / canvas.width ));
        span.innerHTML = "number = " + rangeX + "<br/>";
        span.innerHTML += "iterations = " + kaprekar( rangeX );
    }
    canvas.addEventListener( "mousemove", mouseHandler, false );
}
