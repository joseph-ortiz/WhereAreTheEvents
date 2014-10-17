//TODO:add funcitonality to handle failed GoogleMAPS call!
//TOOD:add fail 404.
//(function() {

var getPosition = function(options) {
  var _d = $.Deferred();
  navigator.geolocation.getCurrentPosition(getCoords,
    null,
    options);
  return _d.promise();
};


var getCoords = function(position) {
  var _d = $.Deferred();

  console.log(position);
  var latlng = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude);

  var geoCoder = new google.maps.Geocoder();
  geoCoder.geocode({
    location: latlng
  }, logResults)

  return _d.promise();
}

var logResults = function(results, status) {
  // here you can look through results ...
  console.log(results[0].formatted_address);
}

var getLocation = function() {
  getPosition().then(getCoords).done(logResults);
}

function initialize() {
  var myOptions = {
    zoom: 10,
    center: new google.maps.LatLng(-33.9, 151.2),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById("map-canvas"),
    myOptions);

  setMarkers(map, beaches);
}

/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */
var beaches = [
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];

function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  var image = new google.maps.MarkerImage('images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    new google.maps.Size(20, 32),
    // The origin for this image is 0,0.
    new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 0,32.
    new google.maps.Point(0, 32));
  var shadow = new google.maps.MarkerImage('images/beachflag_shadow.png',
    // The shadow image is larger in the horizontal dimension
    // while the position and offset are the same as for the main image.
    new google.maps.Size(37, 32),
    new google.maps.Point(0, 0),
    new google.maps.Point(0, 32));
  // Shapes define the clickable region of the icon.
  // The type defines an HTML &lt;area&gt; element 'poly' which
  // traces out a polygon as a series of X,Y points. The final
  // coordinate closes the poly by connecting to the first
  // coordinate.
  var shape = {
    coord: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < locations.length; i++) {
    var beach = locations[i];
    var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      shadow: shadow
    });
  }
}


//**google map samples from http://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
