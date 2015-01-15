
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

function showQueryList ( data ) {
  $.when(
    lazyGetTemplate('query')
  )
    .done( function () {
      var html = $.templates.query.render( data );
      $('#queryList').html( html );
    });
}

$.ajax({
    url: 'http://localhost:3000/api/query',
    data: { 'testing' : 'supersecret' }
  })
  .done( showQueryList );
