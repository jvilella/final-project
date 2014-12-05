var map;
var city;
var business;
var geocoder;
var dataExport=[];
var Scores=[];
var BrandScore=0;
var SumScores=0;

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
    query: searchQuery,
  };
  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
  
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      //dataExport.push({'name' :results[i].name, 'score' :results[i].rating, 'address' :results[i].formatted_address});
      Scores.push({'score' :results[i].rating});
    }
    avgScore(Scores);
    var otherNumber = (100-BrandScore);
    var data = google.visualization.arrayToDataTable([
      ['Company', 'score'],
      ['others', otherNumber],
      [$("input.hotel1:checked").val(), BrandScore],
    ]);
    var options = {
      animateScale: true,
      pieHole: 0.6,
      backgroundColor: 'transparent',
      colors: ['#ECD078', '#01FF70'],
      pieSliceTextStyle: {
        color: 'black',
      },
      legend: {
        position: 'none',
      },
    }; 
    var chart = new google.visualization.PieChart(document.getElementById('donut_single'));
    chart.draw(data, options);
  }
}

function avgScore (Scores) {
  for(var x = 0; x < Scores.length; x ++)
  {
    if (isNaN(Scores[x].score)===false) {
      SumScores = SumScores + Scores[x].score;
    };
  }
  BrandScore = (SumScores / Scores.length)*10;
  console.log(BrandScore);
}

  
function drawChart() {
  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawChart);  
}

$(document).ready(function() {
  $("form.search").submit(function() {
    city = $(".city").val();
    business = "Lodging "+$("input.hotel1:checked").val();
    initialize(business,city);
    $('.titleResults').text($("input.hotel1:checked").val()+' BrandScore');
    SumScores=0;
    BrandScore=0;
    Scores=[];
    return false;
  }); 

});
