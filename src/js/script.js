var HOST = 'http://yothrow.com';

$('#queryOptions').on( 'change', renderTable );

// Show Query List Dropdown, then renderTable
$.ajax({
    url: HOST + '/api/query',
    data: { 'testing' : 'supersecret' }
  })
  .done( function ( data ) {
    renderSingleTemplate( data, 'dropdown', '#queryOptions', renderTable );
  })
  .fail( alertError );

function renderTable ( ) { 
  returnQueryJSON( $('#queryOptions').val(), function( data ) {
    $.when(
      lazyGetTemplate('table_head'),
      lazyGetTemplate('table_body')
    )
    .done( function () {
      $( '#table_head' ).html( $.templates.table_head.render( data ) );
      $( '#table_body' ).html( $.templates.table_body.render( data ) );
    });
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
