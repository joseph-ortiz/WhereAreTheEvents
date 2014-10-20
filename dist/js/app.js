$(document).ready(function() {
  //TODO:Implement Require.js
  //TODO: get user location
  //TODO: center map to user location
  //TODO: get search criteria
  //TODO: query meetupAPI
  //TODO: get coordinates
  //TODO: create list
  //TODO: map location on google Maps
  //TODO: reduce the size of the google maps image. Unnecessarily large. googlemaps opttion?
  //TODO: minify for production

  $.when(google.maps.event.addDomListener(window, 'load', initialize))
    .then(function(data, textStatus, jqXHR) {
      //alert(jqXHR.status); // Alerts 200




      $("#searchButton").click(function() {
        //TODO:Get inputs
        console.log("SearchButton Clicked! ");
        var place = $("#place").val();
        var hobby = $("#hobby").val();

        //TODO:search Get meetings;
        var meetupResults = getMeeting(place, hobby);
        //TODO: Add item to List

        meetupResults.then(function(data) {
          console.log("meetup result complete");
          //var _m = meetups[0];

          $("ul.results").append("<h1>WhatIsthisATest</h1>")
            //TODO: Add item on the Map
        });

      });

    });

});
