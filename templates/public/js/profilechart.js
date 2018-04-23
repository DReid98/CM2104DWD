
// var numBagged = <%= numMunros %>;
// numBagged = parseInt(numBagged);
// var remaining = 282 - numBagged;

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Category','Number of Munros'],
        ['Bagged',82],
        ['Uncomplete',200]
    ]);

    var options = {
        pieHole: 0.4,
        slices: {
            0: {color: 'blue'},
            1: {color: 'transparent'}
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('progress-donut'));
    chart.draw(data, options);

}