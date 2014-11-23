var map;
var city;
var business;
var geocoder;
var j=0;
var dataExport=[];

function initialize(business,city) {
  var pyrmont = new google.maps.LatLng();
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: pyrmont,
    zoom: 3
  });
  var searchQuery = business + ' in ' + city
  console.log(searchQuery);
  var request = {
    location: pyrmont,
    query: searchQuery
  };
  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
  
}

function callback(results, status, pagination) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      dataExport.push({'export' :i, 'name' :results[i].name, 'score' :results[i].rating});
    }
    pagination.nextPage();
    console.log(dataExport[1]);  
  }
}



$(document).ready(function() {
  $("form.search").submit(function() {
    city = $(".city").val();
    business = $(".types :selected").val();
    initialize(business,city);
    $('.results p').text();
    return false;
  }); 

});
