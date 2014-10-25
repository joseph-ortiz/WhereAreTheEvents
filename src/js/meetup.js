var getMeeting = function(zip, state, hobby) {
  var def = $.Deferred();
  alert(zip);
  var _url = 'http://api.meetup.com/2/open_events?' +
    'status=upcoming' +
    '&radius=25.0' +
    '&order=distance' +
    '&state=' + state.toLowerCase() + //TODO: state must be lowercase, add to lowercase
    '&limited_events=False' +
    '&and_text=False' +
    '&text=' + hobby + //TODO:URL encode text field
    '&desc=False' +
    '&offset=0' +
    '&photo-host=public' +
    '&format=json' +
    '&zip=' + zip + //"30097" +
    '&page=20' +
    '&key=6e10506a7034b58723d3d18151415e';
  //'&sig_id=64460512' +
  //'&sig=cf7bb1c1f292e85fda8f2fd76eca0e4d16bec621';

  console.log(_url);
  $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: _url
    })
    .done(function(data) {
      def.resolve(data);
      console.log("successeful getMeetings() ajax call");

      //logData(data);
      //return data;
    })
    .fail(function() {
      console.log("error on getMeetings() ajax call");
      dev.reject();
    })
    .always(function() {
      console.log("completed getMeetings() ajax call");
    });

  return def.promise();
}

var logData = function(data) {

  var meetups = data.results; //array of meetups
  //build out card
  if (meetups.length > 0) {
    var _m = meetups[0];
    console.log("EventName: " + _m.name);
    console.log("link: " +
      _m.event_url)
    console.log("status" +
      _m.status);
    console.log("time" +
      _m.time); //convert this from UTC with UTC offset;

    var group = _m.group;
    console.log("Group Lat: " +
      group.group_lat);
    console.log("Group Lon: " +
      group.group_lon);
    console.log("Group Name: " +
      group.name);
  }
}
