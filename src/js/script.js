var tmpl = {
  // JS Views Stuff
  renderTemplate: function ( targetElement, data, template, deps, callback ) {
    // Renders Templates with includes, define an array of template
    // names to load them up before adding them to the page
    self = this;
    if ( deps === undefined ) deps = [];
    $.when(
      $.each( deps, function ( i, v ) {
        self.getTemplate( v );
      }),
      self.getTemplate( template )
    )
    .done( function () {
      $( targetElement ).html( $.templates[template].render( data ) );
      if ( callback !== undefined ) callback();
    });
  },
  getTemplate: function ( name ) {
    // Lazy Get Template
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
};

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

function makeTable ( ) { 
  returnQueryJSON ( $('#queryOptions').val(), function ( data ) {
    tmpl.renderTemplate ( '#tableHolder', data, 'table', [ 'table_head', 'table_body' ] );
  });
}

function returnQueryJSON ( id, callback ) {
  $.ajax({
    url: HOST + '/api/result/' + id
  })
  .done( callback )
  .fail( alertError );
}

function alertError ( err ) {
  alert( 'AJAX Error: ' + JSON.stringify( err ) );
}