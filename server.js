var exec = require('child_process').exec
	, ws = require('ws')
	, WebSocketServer = ws.Server
	, wss = new WebSocketServer({ port: 8080 });

wss.broadcast = function ( data ) {
	wss.clients.forEach( function each( client ) {
		client.send( data );
	});
};

wss.on('connection', function ( ws ) {
	console.log( 'Connection!' );
	ws.send( 'Welcome, You are now connected' );
	ws.on( 'message', function ( message ) {
		console.log( 'doing: ', message );
		exec( message, function ( error, stdout, stderr ) {
			if ( error ) console.log( 'error', error );
			wss.broadcast( stderr );
			wss.broadcast( stdout );
		});
	});
});
