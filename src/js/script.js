var HOST = 'http://yothrow.com';
var chartOptions = {
  showPoint: false,
  lineSmooth: false,
  showArea: true,
  height: 500
};
// Static AJAX reqest for GAAPI data (THE EXAMPLE)
$('#queryOptions').on( 'change', function ( e ) {
  $('#theJSON').text('Loading...');
  returnQueryJSON( $('#queryOptions').val(), function( data ) {
    // Dumps data into a pre tag (#theJSON)
    $('#theJSON').text( JSON.stringify( data, null, '\t' ) );

    var chartData = {};
    // console.log( data.rows );
    chartData.labels = [];
    chartData.series = [];
    
    chartData.series[0] = {
      data: []
    };

    $.each( data.rows, function ( index, row ) {
      $.each( row, function ( idx, cell ) {
        // console.log( index, row, idx, cell );
        if ( index === 0 ) {
          if ( idx !== 0 ) {
            chartData.series[ idx-1 ] = { data: [] };
          }
        }
        if ( idx !== 0 ) {
          chartData.series[ idx-1 ].data.push( cell );
        }
        else {
          chartData.labels.push( cell );
        }
      });
    });
    switch ( $('#chartOptions').val() ) {
      case 'line':
        new Chartist.Line('#chartOne', chartData, chartOptions, {});
        break;
      case 'bar':
        new Chartist.Bar('#chartOne', chartData, chartOptions, {});
        break;
      default:
        new Chartist.Pie('#chartOne', chartData, chartOptions, {});
    }
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
      $( targetElement ).html( $.templates[template].render( data ) );
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
