$.ajax({
  type: 'GET',
  dataType: 'jsonp',
  url: 'http://api.meetup.com/2/open_events?status=upcoming&radius=25.0&order=distance&state=ga&limited_events=False&and_text=False&text=javascript&desc=False&offset=0&photo-host=public&format=json&zip=30097&page=20&sig_id=64460512&sig=cf7bb1c1f292e85fda8f2fd76eca0e4d16bec621'

})
.done(function(data) {
  console.log("success");

})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});
