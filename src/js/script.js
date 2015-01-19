var HOST = 'http://yothrow.com';

$('#queryOptions').on( 'change', makeTable );

// Show Query List Dropdown, then renderTable
$.ajax({
    url: HOST + '/api/query',
    data: { 'testing' : 'supersecret' }
  })
  .done( function ( data ) {
    renderTemplate ( '#queryOptions', data, 'dropdown', [], makeTable );
  })
  .fail( alertError );

function makeTable ( ) { 
  returnQueryJSON ( $('#queryOptions').val(), function ( data ) {
    renderTemplate ( '#tableHolder', data, 'table', [ 'table_head', 'table_body' ] );
  });//renderTable );
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

// JS Views Stuff
function renderTemplate ( targetElement, data, template, deps, callback ) {
  // Renders Templates with includes, define an array of template
  // names to load them up before adding them to the page
  $.when(
    $.each( deps, function ( i, v ) {
      lazyGetTemplate( v );
    }),
    lazyGetTemplate( template )
  )
  .done( function () {
    $( targetElement ).html( $.templates[template].render( data ) );
    if ( callback !== undefined ) {
      callback();
    }
  });
}

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
