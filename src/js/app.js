$(document).ready(function() {

  //TODO: get user location
  //TODO: center map to user location
  //TODO: get search criteria
  //TODO: query meetupAPI
  //TODO: get coordinates
  //TODO: create list
  //TODO: map location on google Maps

  $.when(google.maps.event.addDomListener(window, 'load', initialize))
    .then(function(data, textStatus, jqXHR) {
      //alert(jqXHR.status); // Alerts 200




      $("#searchButton").click(function() {
        //TODO:Get inputs
        console.log("SearchButton Clicked! ");
        var place = $("#place").text();
        var hobby = $("hobby").text();

        //TODO:search Get meetings;
        var meetupResults = getMeeting('ga', 'javascript');
        //TODO: Add item to List
        var _m = meetups[0];

        $("ul.results").append()
          //TODO: Add item on the Map
      });

    });

});
