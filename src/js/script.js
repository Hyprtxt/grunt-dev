var HOST = 'http://yothrow.com';

var chartOptions = {
  showPoint: false,
  lineSmooth: false,
  showArea: true,
  height: 200
};

var responsiveChartOptions = {};

var block = {
  query: '',
  chart: true,
  chart_type: 'pie',
  table: true,
  insight: ''
};

// $.ajaxSetup({ data: { 'testing' : 'supersecret' } });

// $('#queryOptions').on( 'change', makeTable );

// Show Query List Dropdown, then renderTable
$.ajax({
  url: HOST + '/api/query',
  data: { 'testing' : 'supersecret' }
})
.done( function ( data ) {
  tmpl.renderTemplate( '#queryOptions', data, 'dropdown', [], function () {
    $('#queryOptions').change();
  });
})
.fail( alertError );

$('#chart').on( 'change', function ( e ) {
  block.chart = $('#chart').is(':checked');
  $('#queryOptions').change();
  return false;
});

$('#table').on( 'change', function ( e ) {
  block.table = $('#table').is(':checked');
  $('#queryOptions').change();
  return false;
});

// Static AJAX reqest for GAAPI data
$('body').on( 'change', '#queryOptions', function ( e ) {

  returnQueryJSON( $('#queryOptions').val(), function ( data ) {

    block.query = $('#queryOptions').val();
    block.insight = $('#insight').val();
    // console.log( block );

    if ( block.chart ) {
      $('#theChart, #chartButtons').show();
      if ( data.rows.length === 1 ) {
        tmpl.renderTemplate( '#chartButtons', { pie: true, bar: true, line: false }, 'chart_buttons' );
        renderChart( '#theChart', data, 'pie' );
      }
      else {
        tmpl.renderTemplate( '#chartButtons', { pie: false, bar: true, line: true }, 'chart_buttons' );
        renderChart( '#theChart', data, 'line' );
      }
    }
    else {
      $('#theChart, #chartButtons').hide();
    }

    if ( block.table ) {
      $('#tableHolder').show();
      tmpl.renderTemplate ( '#tableHolder', data, 'table', [ 'table_head', 'table_body' ], function () {
        $('.tablesaw').table().data( "table" ).refresh();
      });
    }
    else {
      $('#tableHolder').hide();
    }

  });
  return false;
});

$('body').on( 'click', '.makeChartButton', function ( e ) {
  block.chart_type = $( e.currentTarget ).val();
  $('#chart_type').val( block.chart_type );
  returnQueryJSON( $('#queryOptions').val(), function ( data ) {
    renderChart( '#theChart', data, block.chart_type );
  });
  return false;
});

$('#save').on('click', sendToAPI );

function sendToAPI ( ) {
  $.ajax({
    data: block,
    url: 'http://api.yothrow.com/block/create',
    success: function ( data ) {
      alert( JSON.stringify( data ) );
    },
    dataType: 'json'
  });
  return false;
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
    url: HOST + '/api/result/' + id,
    data: { 'testing' : 'supersecret' }
  })
  .done( callback )
  .fail( alertError );
}
