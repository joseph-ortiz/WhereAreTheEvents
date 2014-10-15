$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'http://api.meetup.com/2/open_events?status=upcoming&radius=25.0&order=distance&state=ga&limited_events=False&and_text=False&text=javascript&desc=False&offset=0&photo-host=public&format=json&zip=30097&page=20&sig_id=64460512&sig=cf7bb1c1f292e85fda8f2fd76eca0e4d16bec621'

  })
  .done(function(data) {
    console.log("success");
    var meetups = data.results; //array of meetups
    //build out card
    var _m = meetups[0];
    console.log("EventName: " + _m.name);
    console.log("link: " +
      _m.event_url)
    console.log("status" +
      _m.status);
    console.log("time" +
      _m.time); //convert this properly;

    var group = _m.group;
    console.log("Group Lat: " +
      group.group_lat);
    console.log("Group Lon: "
      group.group_lon);
    console.log("Group Name: " +
      group.name);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
