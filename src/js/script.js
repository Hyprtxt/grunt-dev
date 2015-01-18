var HOST = 'http://yothrow.com';

$('#queryOptions').on( 'change', makeTable );

// Show Query List Dropdown, then renderTable
$.ajax({
    url: HOST + '/api/query',
    data: { 'testing' : 'supersecret' }
  })
  .done( function ( data ) {
    renderSingleTemplate( data, 'dropdown', '#queryOptions', makeTable );
  })
  .fail( alertError );

function makeTable ( ) { 
  returnQueryJSON( $('#queryOptions').val(), renderTable );
}

function renderTable ( data ) {
  $.when(
    lazyGetTemplate('table_head'),
    lazyGetTemplate('table_body'),
    lazyGetTemplate('table')
  )
  .done( function () {
    $( '#tableHolder' ).html( $.templates.table.render( data ) );
  });
}

function returnQueryJSON ( id, callback ) {
  $.ajax({
      url: HOST + '/api/result/' + id,
      data: { 'testing' : 'supersecret' }
    })
    .done( function ( data ) {
      callback( data );
    })
    .fail( alertError );
}

function alertError ( err ) {
  alert( 'AJAX Error: ' + JSON.stringify( err ) );
}

function renderSingleTemplate ( data, template, targetElement, callback ) {
  $.when(
    lazyGetTemplate( template )
  )
    .done( function () {
      $( targetElement ).html( $.templates[template].render( data ) );
      callback();
    });
}

// JS Views Stuff
function lazyGetTemplate ( name ) {
  // If the named remote template is not yet loaded and compiled
  // as a named template, fetch it. In either case, return a promise
  // (already resolved, if the template has already been loaded)
  var deferred = $.Deferred();
  if ($.templates[name]) {
    deferred.resolve();
  } else {
    $.when(
      $.get( 'tmpl/' + name + '.tmpl.html' )
    )
      .done(function(tmplData) {
        var daTemplate = {};
        daTemplate[name] = tmplData;
        $.templates(daTemplate);
        if ($.templates[name]) {
          deferred.resolve();
        } else {
          alert("Script: \"" + name + ".js\" failed to load");
          deferred.reject();
        }
      });
  }
  return deferred.promise();
}
