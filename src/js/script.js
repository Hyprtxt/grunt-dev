var HOST = 'http://yothrow.com';
var chartOptions = {
  showPoint: false,
  lineSmooth: false,
  showArea: true,
  height: 200
};

$('.makeChartButton').on( 'click', function ( e ) {
  // console.log( $( e.currentTarget ).attr('id').toString() );
  makeAChart( e, false, $( e.currentTarget ).attr('id').toString() );
});

// Static AJAX reqest for GAAPI data (THE EXAMPLE)
$('#queryOptions').on( 'change', function ( e ) { 
  makeAChart( e, true );
});

function multiLineChart ( selector, data ) {
  new Chartist.Line( selector, {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    series: [
      [12, 9, 7, 8, 5],
      [2, 1, 3.5, 7, 3],
      [1, 3, 4, 5, 6]
    ]
  });
}


function makeAChart( e, buttonChangeFlag, chartType ) {
  $('#theJSON').text('Loading...');
  returnQueryJSON( $('#queryOptions').val(), function( data ) {
    // Dumps data into a pre tag (#theJSON)
    $('#theJSON').text( JSON.stringify( data, null, '\t' ) );

    var chartData = {};
    // console.log( data.rows.length );
    chartData.series = [];
    chartData.labels = [];
    
    if ( data.rows.length === 1 ) {
      if ( buttonChangeFlag ) {
        $('#pie').show();
        $('#bar').show();
        $('#line').hide();
      }
      // console.log( data.rows[0].map(Number) );
      console.log( chartType );
      if ( chartType === undefined || chartType === 'pie' ) {
        renderChart( 'pie', '#chartOne', {
          series: data.rows[0].map(Number),
          labels: data.query.metrics
        }, chartOptions );
      }
      else {
        // Chart Type Bar
        barLineSetup( chartType, chartData, data, false );  
      }
      
    }
    else {
      barLineSetup( chartType, chartData, data, true );
    }
    //console.log( chartData );
  });
  return false;
}

function barLineSetup ( chartType, chartData, data, buttonChangeFlag ) {
  chartData.series[0] = {
    data: []
  };
  if ( buttonChangeFlag ) {
    $('#pie').hide();
    $('#bar').show();
    $('#line').show();
  }
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
  if ( chartType === undefined ) {
    chartType = 'line';
  }
  renderChart( chartType, '#chartOne', chartData, chartOptions );
}

function renderChart( type, selector, chartData, chartOptions ) {
  switch ( type ) {
    case 'line':
      new Chartist.Line(selector, chartData, chartOptions, {});
      break;
    case 'bar':
      new Chartist.Bar(selector, chartData, chartOptions, {});
      break;
    default:
      new Chartist.Pie(selector, chartData, chartOptions, {});
  }
}

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
