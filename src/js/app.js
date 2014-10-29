var mapOptions = {
  zoom: 10,
  scrollwheel: false
};

var validate = function() {
  var isValid = false;
  if ($("#state").val() == "" || $("#hobby").val() === "" || $("#zip").val() === "") {
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

var centerUser = function(crapDone) {
  console.log("then has been hit")
  console.log("crapDone" + crapDone);
  initialize(['home', crapDone.lat(), crapDone.lng()]);
  mapOptions.center = new google.maps.LatLng(crapDone.lat(), crapDone.lng());
}


$(document).ready(function() {
  //TODO:Implement Require.js
  //TODO: optomize image
  //TODO: set up anchor tag link to work.
  //TODO: add description info.
  //TODO: get times for events
  //TODO: reduce the size of the google maps image. Unnecessarily large. googlemaps opttion?
  //TODO: minify for production
  validate();
  $("#zip , #hobby").keypress(function() {
    validate();
  });
  $.when(initGoogleMaps())
    .then(getLocation)
    .then(function(crapDone) {
      centerUser(crapDone);
    })
    .done(function(crapDone) {
      console.log("done has been hit!");
      $("#searchButton").click(function() {
        $("ul.results").empty();
        console.log("SearchButton Clicked! ");
        var place, hobby, zip, meetupResults;
        place = $("#state").val();
        hobby = $("#hobby").val();
        zip = $("#zip").val();
        meetupResults = getMeeting(zip, place, hobby); //TODO:search Get meetings;//TODO: query meetupAPI
        meetupResults.then(function(data) {
          var map, markerList;
          map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
          markerList = [];
          $("ul.results").empty();
          console.log("meetup result complete");

          _.each(data.results, function(item) {
            var meetupEvent,
              start,
              end,
              body;

            meetupEvent = { //TODO: get coordinates
              name: item.name,
              url: item.event_url,
              description: item.description,
              status: item.status,
              lat: item.group.group_lat,
              lon: item.group.group_lon
                //description: item.description
            };
            start = "<li><div class='item'>";
            end = "</div></li>";
            body = "";
            _.forIn(meetupEvent, function(prop, key) {
              var propText;
              switch (key) {
                case "url":
                  propText = '<span class="' + key + '"><a href=' + prop + '>' + prop + '</a></span>';
                  break;
                case "name":
                  propText = '<span class="' + key + '">' + prop + '</span>';
                  break;
                default:
                  propText = '<span class="' + key + '">' + key + ": " + prop + '</span>';
              }

              body += propText;
            });
            start += body;
            start += end;
            $("ul.results").append(start); //TODO: Add item to List
            var latilongi,
              contentString,
              infowindow,
              marker;

            latilongi = new google.maps.LatLng(meetupEvent.lat, meetupEvent.lon);
            contentString =
              '<h1>' + meetupEvent.name + '</h1>';
            infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            marker = new google.maps.Marker({
              position: latilongi,
              title: meetupEvent.name,
              map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map, marker);
            });

            markerList.push(marker);
          });
          var bounds = new google.maps.LatLngBounds();

          // To add the marker to the map, call setMap();
          _.each(markerList, function(m) {
            m.setMap(map);
            bounds.extend(m.position);
          });

          map.fitBounds(bounds);
          //map.getBounds().contains(markerList[markerList.length].getPosition())
          //  marker.setMap(map);

        }).then(function() {
          $('span').linkify();
          console.log("linkify here");
        });

      });




    });

});
