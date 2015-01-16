var HOST = 'http://yothrow.com';
// Get the context of the canvas element we want to select
var ctx = document.getElementById('daChart').getContext('2d');

// Static AJAX reqest for GAAPI data (THE EXAMPLE)
$('#pickAQuery').on( 'submit', function ( e ) {
  $('#theJSON').text('Loading...');
  returnQueryJSON(  $('#queryOptions').val(), function( data ) {
    // Dumps data into a pre tag (#theJSON)
    $('#theJSON').text( JSON.stringify( data, null, '\t' ) );

    var chartData = {};
    // console.log( data.rows );
    chartData.labels = [];
    chartData.datasets = [];
    chartData.datasets[0] = {
      label: "My First Dataset",
      data: []
    };
    $.each( data.rows, function ( i, v ) {
      // console.log( v, i, v[0], v[1] );
      chartData.labels.push( v[0] );
      chartData.datasets[0].data.push( v[1] );
    });
    console.log( chartData );
    var barChart = new Chart(ctx).Line(chartData);
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
  .fail( alertError );

function returnQueryJSON( id, callback ) {
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
