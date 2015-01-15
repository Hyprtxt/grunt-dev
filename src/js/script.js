var HOST = 'http://yothrow.com';

// Static AJAX reqest for GAAPI data (THE EXAMPLE)
$('#pickAQuery').on( 'submit', function ( e ) {
  $('#theJSON').text('Loading...');
  returnQueryJSON(  $('#queryOptions').val(), function( data ) {
    $('#theJSON').text( JSON.stringify( data, null, '\t' ) );
  });
  return false;
});

// Show Query List & Dropdown Stuff
$.ajax({
    url: HOST + '/api/query',
    data: { 'testing' : 'supersecret' }
  })
  .done( function ( data ) {
    renderSingleTemplate( data, 'dropdown', '#queryOptions' );
  })
  .fail( function ( err ) {
    alert( 'AJAX Error: ' + err );
  });


function returnQueryJSON( id, callback ) {
  $.ajax({
      url: HOST + '/api/result/' + id,
      data: { 'testing' : 'supersecret' }
    })
    .done( function ( data ) {
      callback( data );
    });
}

function renderSingleTemplate ( data, template, targetElement ) {
  $.when(
    lazyGetTemplate( template )
  )
    .done( function () {
      var html = $.templates[template].render( data );
      console.log ( html );
      $( targetElement ).html( html );
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
