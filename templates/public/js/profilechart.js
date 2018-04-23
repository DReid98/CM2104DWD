
var numBagged = document.getElementById('progress-text').dataset.testValue;
numBagged = parseInt(numBagged);
var remaining = 282 - numBagged;

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Category','Number of Munros'],
        ['Bagged',numBagged],
        ['Remaining',remaining]
    ]);

    var options = {
        pieHole: 0.4,
        slices: {
            0: {color: '#3B8686',offset: 0.2},
            1: {color: '#79BD9A'}
        },
        pieSliceText: 'none',
        legend: 'none'
    };

    var chart = new google.visualization.PieChart(document.getElementById('progress-donut'));
    chart.draw(data, options);

}