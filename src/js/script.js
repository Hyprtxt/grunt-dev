
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
  .done( function ( data ) {
    showQueryList( data );
  });

function showPeople ( people ) {
  $.when(
    lazyGetTemplate("people"),
    lazyGetTemplate("address")
  )
    .done( function () {
      // Render once all templates for template composition are loaded
      var html = $.templates.people.render(people);
      $("#peopleList").html(html);
    });
}

var people1 = [
    {
      "name": "Pete", "address": { "city": "Seattle" }
    },
    {
      "name": "Heidi", "address": { "city": "Sidney" }
    }
  ],

  people2 = [
    {
      "name": "Adriana", "address": { "city": "Dubai" }
    },
    {
      "name": "Robert", "address": { "city": "London" }
    }
  ];

$("#show1").on("click", function() {
  showPeople(people1);
});

$("#show2").on("click", function() {
  showPeople(people2);
});