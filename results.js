function createBrandscoreChart () {
  google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Company', 'score'],
          ['others',     90],
          ['company chose',10],
        ]);

        var options = {
          pieHole: 0.6,
          backgroundColor: 'transparent',
          colors: ['#ECD078', '#ccc'],
          pieSliceTextStyle: {
            color: 'black',
          },
          legend: {
            position: 'none'
          },
        };

        var chart = new google.visualization.PieChart(document.getElementById('donut_single'));
        chart.draw(data, options);
      }
};

function createBrandscoreBarChart () {
    google.setOnLoadCallback(drawChart);
    function drawChart() {

      var data = google.visualization.arrayToDataTable([
        ['Company', 'scores'],
        ['2004',  1000],
        ['2005',  1170],
        ['2006',  660],
        ['2007',  1030]
      ]);
      var options = {
        title: 'Company Performance',
        backgroundColor: 'transparent',
        hAxis: {title: 'Company', titleTextStyle: {color: 'red'}}
      };
      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
}

$(document).ready(function() {
    createBrandscoreChart();
    createBrandscoreBarChart();
});
