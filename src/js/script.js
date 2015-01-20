var HOST = 'http://yothrow.com';

var chartOptions = {
  showPoint: false,
  lineSmooth: false,
  showArea: true,
  height: 200
};

var responsiveChartOptions = {};

$.ajaxSetup({ data: { 'testing' : 'supersecret' } });

// $('#queryOptions').on( 'change', makeTable );

// Show Query List Dropdown, then renderTable
$.ajax({
  url: HOST + '/api/query'
})
.done( function ( data ) {
  tmpl.renderTemplate( '#queryOptions', data, 'dropdown', [], function () {
    $('#queryOptions').change();
    makeTable();
  });
})
.fail( alertError );

// Static AJAX reqest for GAAPI data
$('body').on( 'change', '#queryOptions', function ( e ) {
  makeTable();
  returnQueryJSON( $('#queryOptions').val(), function ( data ) {
    if ( data.rows.length === 1 ) {
      tmpl.renderTemplate( '#chartButtons', { pie: true, bar: true, line: false }, 'chart_buttons' );
      renderChart( '#theChart', data, 'pie' );
    }
    else {
      tmpl.renderTemplate( '#chartButtons', { pie: false, bar: true, line: true }, 'chart_buttons' );
      renderChart( '#theChart', data, 'line' );
    }
  });
  return false;
});

$('body').on( 'click', '.makeChartButton', function ( e ) {
  returnQueryJSON( $('#queryOptions').val(), function ( data ) {
    renderChart( '#theChart', data, $( e.currentTarget ).val() );
  });
  return false;
});

function makeTable () {
  $.ajax({
    url: HOST + '/api/result/' + $('#queryOptions').val()
  })
  .done( function ( data ) {
    tmpl.renderTemplate ( '#tableHolder', data, 'table', [ 'table_head', 'table_body' ], function () {
      $('.tablesaw').table().data( "table" ).refresh();
    });
  })
  .fail( alertError );
}

function alertError ( err ) {
  if ( err !== undefined )
    alert( 'AJAX Error: ' + JSON.stringify( err ) );
}

function renderChart ( selector, data, chartType ) {
  // $( selector ).html('');
  tmpl.renderTemplate( selector, { id: 'Chart42' }, 'chart', [], function () {
    chart[ chartType ]( '#Chart42', data );
  });
}

function returnQueryJSON ( id, callback ) {
  $.ajax({
    url: HOST + '/api/result/' + id
  })
  .done( callback )
  .fail( alertError );
}
