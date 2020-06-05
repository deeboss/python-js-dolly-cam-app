function emitEvent(name, object) {
    socket.emit(name, object);
}

var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on( 'connect', function() {
    socket.emit( 'my event', {
        data: 'User Connected'
    })
    $('button').on("mousedown", function(e){
        var id = $(this).attr('id');
        console.log(id);
        emitEvent('which_fruit', {type: id, event: 'hold'});
    })

    $('button').on('touchstart', function(){
        var id = $(this).attr('id');
        emitEvent('which_fruit', {type: id, event: 'hold'});
        $('body').addClass("yoyo");
      }).bind('touchend', function(){
        emitEvent('which_fruit', {type: id, event: 'letgo'});
    });

    $('button').on("mouseup", function(e){
        var id = $(this).attr('id');
        console.log(id);
        emitEvent('which_fruit', {type: id, event: 'letgo'});
    })

    $(document).on('keydown', function(e) {
        switch(e.keyCode) {
            case 81:
                emitEvent('which_fruit', {type: 'peach', event: 'hold'});
                break;

            case 80:
                emitEvent('which_fruit', {type: 'eggplant', event: 'hold'});
                break;

            case 32:
                emitEvent('which_fruit', {type: 'banana', event: 'hold'});
                break;
            case 84:
                emitEvent('light', {type: 'led', event: 'hold'});
                break;
            case 89:
                emitEvent('servo', {type: 'servo', event: 'hold'});
                break;
        }
    });

    $(document).on('keyup', function(e) {
        switch(e.keyCode) {
            case 81:
                emitEvent('which_fruit', {type: 'peach', event: 'letgo'});
                break;

            case 80:
                emitEvent('which_fruit', {type: 'eggplant', event: 'letgo'});
                break;

            case 32:
                emitEvent('which_fruit', {type: 'banana', event: 'letgo'});
                break;
            
            case 84:
                emitEvent('light', {type: 'led', event: 'letgo'});
                break;

            case 89:
                emitEvent('servo', {type: 'servo', event: 'letgo'});
                break;
        }
    });

    var form = $( 'form' ).on( 'submit', function( e ) {
    e.preventDefault()
    let user_name = $( 'input.username' ).val()
    let user_input = $( 'input.message' ).val()
    socket.emit( 'my event', {
        user_name : user_name,
        message : user_input
    } )
    $( 'input.message' ).val( '' ).focus()
    } )


} )

function incrementBananas(num) {
    setInterval(function(){
        num+= 1;
    }, 100);
}

socket.on( 'my response', function( data ) {
    console.log(data);
    var target = data.type;

    if (data.shouldHold === true && data.type === 'banana') {
        $("span[data-type='" + target + "'").addClass("visible");
        // var value = parseInt($('#incrementer').text());
        // value += 1;
        $("#incrementer").text(data.bananaLevel);
    } else if (data.shouldHold === true || (data.type === 'led' && data.event === 'hold') || (data.type === 'servo' && data.event === 'hold')) {
        $("span[data-type='" + target + "'").addClass("visible");
    } else {
        $("span[data-type='" + target + "'").removeClass("visible");
    }
})

// socket.on( 'my response', function( msg ) {
// console.log( msg )
// if( typeof msg.user_name !== 'undefined' ) {
//     $( 'h3' ).remove()
//     $( 'div.message_type: '', holder' ).append( '<div><b style="color: #000">'+msg.user_name+'</b> '+msg.m()essage+'</div>' )
// }
// })








