var HOST = 'http://yothrow.com';

$.ajaxSetup({ data: { 'testing' : 'supersecret' } });

$('#queryOptions').on( 'change', makeTable );

// Show Query List Dropdown, then renderTable
$.ajax({
  url: HOST + '/api/query'
})
.done( function ( data ) {
  tmpl.renderTemplate ( '#queryOptions', data, 'dropdown', [], makeTable );
})
.fail( alertError );

function makeTable () {
  $.ajax({
    url: HOST + '/api/result/' + $('#queryOptions').val()
  })
  .done( function ( data ) {
    tmpl.renderTemplate ( '#tableHolder', data, 'table', [ 'table_head', 'table_body' ] );
  })
  .fail( alertError );
}

function alertError ( err ) {
  if ( err !== undefined )
    alert( 'AJAX Error: ' + JSON.stringify( err ) );
}