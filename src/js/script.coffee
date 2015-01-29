ws = new WebSocket( 'ws://localhost:8080' )

ws.onmessage = ( msg ) ->
	# console.log( msg.data )
	$('.messages').append( $('</p>').text( msg.data ) );

ws.onerror = ( err ) ->
	$('.messages').append( $('</p>').text( 'Not connected,
	 start the WebSocket server and refresh the page.' ) );

$('button').on( 'click', ( e ) ->
	ws.send( $('input').val() );
	$('input').val('');
	false
)

# console.log 'it runs, but I don\'t get the output'