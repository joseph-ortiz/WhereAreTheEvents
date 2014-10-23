var validate = function() {
  var isValid = false;
  if ($("#state").val() == "" || $("#hobby").val() === "") {
    $("#searchButton").prop("disabled", true);
    console.log("input validation failed");
  } else {
    isValid = true;
    $("#searchButton").prop("disabled", false);
    console.log("input validation success!");
  }
  return isValid;
}

var initGoogleMaps = function() {
  google.maps.event.addDomListener(window, 'load', initialize);
}

$(document).ready(function() {
  //TODO:Implement Require.js
  //TODO: get user location
  //TODO: center map to user location
  //TODO: create list
  //TODO: map location on google Maps
  //TODO: reduce the size of the google maps image. Unnecessarily large. googlemaps opttion?
  //TODO: minify for production
  validate();
  $("#state , #hobby").blur(function() {
    validate();
  });

  $.when(initGoogleMaps())
    .then(getLocation)
    .done(function(crapDone) {
      alert("crapDone" + crapDone);
      //alert(jqXHR.status); // Alerts 200
      $("#searchButton").click(function() {
        //TODO:Get inputs
        console.log("SearchButton Clicked! ");
        var place = $("#state").val();
        var hobby = $("#hobby").val();
        var meetupResults = getMeeting(place, hobby); //TODO:search Get meetings;//TODO: query meetupAPI
        meetupResults.then(function(data) {
          $("ul.results").empty();
          console.log("meetup result complete");
          _.each(data.results, function(item) {

            var meetupEvent = { //TODO: get coordinates
              name: item.name,
              url: item.event_url,
              status: item.status,
              //description: item.description
            };
            var start = "<li><div>";
            var end = "</div></li>";
            var body = "";
            _.forIn(meetupEvent, function(prop, key) {
              var propText = '<p>' + key + ": " + prop + '</p>';
              body += propText;
            });
            start += body;
            start += end;
            $("ul.results").append(start); //TODO: Add item to List
            //TODO: Add item on the Map
          });

        });

      });

    });

});
