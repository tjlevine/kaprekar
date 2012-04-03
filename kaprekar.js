
var origNum = 4343;                                      

function kaprekar( origNum ) {
    var num = origNum;
    log( "orig num = " + origNum );
    for( var iter = 0; num != 6174 && iter < 9999; iter++ )
    {
        log( "iter = " + iter );
        // break the number down into digits
        var digits = splitDigits( num );

        log( "digits = " + digits );

        var origDigits = digits.slice(0);

        // sort the digits, first into ascending then reverse
        digits.sort().reverse();

        log( "digits (sorted) = " + digits );

        // get the digits in decending order
        var bigNum = 0;
        var l = digits.length;
        for( var i = 0; i < l; i++ )
        {
            var addNum = digits.pop() * (Math.pow(10, i));
            bigNum += addNum;
        }

        // get the digits in ascending order
        var smallNum = 0;
        digits = origDigits.sort();
        for( var i = 0; i < l; i++ )
        {
            var addNum = digits.pop() * (Math.pow( 10, i ));
            smallNum += addNum;
        }

        var newNum = bigNum - smallNum;
        num = newNum;

    }
    return iter;
}
log( "ITERS = " + kaprekar( origNum ) );

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

function frac( cur, low, high ) {
    return (cur / (high - low));
}

function color( iter ) {
    switch( iter )
    {
        case 0:
            return "#000000";
        case 1:
            return "#99FF00";
        case 2:
            return "#AAAA00";
        case 3:
            return "#990000";
        case 4:
            return "#DD3355";
        case 5:
            return "#88CCCC";
        case 6:
            return "#CC00CC";
        case 7:
            return "#FF6600";
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
        var value = Math.round( 1000 + 8998 * ( i / canvas.width ));
        // don't use all one digit numbers
        if( !valid( value ) ) {
            ctx.fillStyle = "#00FF00";
            ctx.fillRect( i, 0, 1, canvas.height );

            continue;
        } else {

            var iters = kaprekar( value );
            if( iters == 0 ) console.log( "odd val: " + value );
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

window.onload = fillCanvas;
