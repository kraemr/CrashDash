var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
var url = "../php/get-stats.php";
xmlhttp.open("POST", url,true);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(JSON.stringify({
    "columns":["land"],"group_by":"land", "order_by": "count", "asc": false
}));

xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    var res_data = JSON.parse (xmlhttp.responseText);
    var stats = res_data["data"];
    for(i=0; i< 5; i++){    
        data.datasets[0].data.push(stats[i]["count"]);
        data.labels.push(element["land_str"]);
    }
    }
};



        var ctx = document.getElementById('BundeslandDiagramm').getContext('2d');
        var accidentData = [];
        var colors = accidentData.map(function (value) {
            var redIntensity = 255 - Math.round((value / Math.max(...accidentData)) * 255);
            return 'rgba(255, ' + redIntensity + ', 0)';
        });
//HIERHER Bundesland aus DB ziehen  --> land_str vom einzelnen JSON -Element ziehen 
        var data = {
            labels: [],
            datasets: [
                {
                    backgroundColor: colors,
                    data: accidentData
                }
            ]
        };

        var options = {
            scales: {
                x: {
                    beginAtZero: true
                }
            },
            legend: {
                display: false
            }
        };

        var myBarChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: data,
            options: options
        });



        //es fehlt noch:   Top5Bundesländer / Unfallentwicklung
 