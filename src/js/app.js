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
  var mapOptions = {
    zoom: 10
  };
  $.when(initGoogleMaps())
    .then(getLocation)
    .then(function(crapDone) {
      console.log("then has been hit")
      console.log("crapDone" + crapDone);
      initialize(['home', crapDone.lat(), crapDone.lng()]);

      mapOptions.center = new google.maps.LatLng(crapDone.lat(), crapDone.lng());

    })
    .done(function(crapDone) {
      console.log("done has been hit!");

      //console.log(jqXHR.status); // Alerts 200
      $("#searchButton").click(function() {
        //TODO:Get inputs
        console.log("SearchButton Clicked! ");
        var place = $("#state").val();
        var hobby = $("#hobby").val();
        var meetupResults = getMeeting(place, hobby); //TODO:search Get meetings;//TODO: query meetupAPI
        meetupResults.then(function(data) {
          $("ul.results").empty();
          console.log("meetup result complete");
          var markerList = [];
          _.each(data.results, function(item) {

            var meetupEvent = { //TODO: get coordinates
              name: item.name,
              url: item.event_url,
              status: item.status,
              lat: item.group.group_lat,
              lon: item.group.group_lon
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



            var latilongi = new google.maps.LatLng(meetupEvent.lat, meetupEvent.lon);
            //var myLatlng = new google.maps.LatLng(-25.363882, 131.044922);

            var marker = new google.maps.Marker({
              position: latilongi,
              title: meetupEvent.name,
              map: map
            });

            markerList.push(marker);
          });



          var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

          // To add the marker to the map, call setMap();
          _.each(markerList, function(m) {
            m.setMap(map);
          });
          //  marker.setMap(map);

        });

      });

    });

});
