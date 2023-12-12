var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
var url = "../php/get-stats.php";
xmlhttp.open("POST", url,true);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(JSON.stringify({
    "columns":["month", "passenger_involved"],"group_by":"month", "order_by": "month", "asc": true
}));

xmlhttp.onreadystatechange = function(){
    var res_data = JSON.parse (xmlhttp.responseText);
    var stats = res_data["data"];
    stats.forEach(element => {
        data.datasets[0].data.push(element["count"]);
    });
};








var ctx = document.getElementById('lineDiagramm').getContext('2d');

var data = {
    labels: [   //month 
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    datasets: [   //passenger_involved
        {
            label: 'Fußgänger',
            borderColor: '#9b59b6',
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparente Hintergrundfarbe entfernt
            data: [],
            borderWidth: 4 // Dicke der Linie erhöht
        }
    ]
};

var options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});