var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
var url = "../php/get-stats.php";
xmlhttp.open("POST", url,true);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(JSON.stringify({
    "columns":["land"],"group_by":"land", "order_by": "count", "asc": false
}));

xmlhttp.onreadystatechange = function(){
    var res_data = JSON.parse (xmlhttp.responseText);
    var stats = res_data["data"];
   
for(i=0; i< 5; i++){    
        data.datasets[0].data.push(stats[i]["count"]);
        data.labels.push(element["land_str"]);
}
};



        var ctx = document.getElementById('BundeslandDiagramm').getContext('2d');

        // Hier rein die Unfalldaten aus der Datenbank...
        var accidentData = [];

        // Farbskala wird generiert die von Hellrot bis Dunkelrot basierend auf den Unfalldaten verändert
        var colors = accidentData.map(function (value) {
            // Beispiel: Je höher die Unfallzahl, desto dunkler das Rot
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
 