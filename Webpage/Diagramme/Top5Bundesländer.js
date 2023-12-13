var xmlhttp1 = new XMLHttpRequest();   // new HttpRequest instance 
var url1 = "../php/get-stats.php";
xmlhttp1.open("POST", url1,true);
xmlhttp1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp1.send(JSON.stringify({
    "columns":["land"],"group_by":"land", "order_by": "count", "asc": false
}));

xmlhttp1.onreadystatechange = function(){
    if (xmlhttp1.readyState === 4 && xmlhttp1.status === 200) {
    let res_data1 = JSON.parse (xmlhttp1.responseText);
    let stats1 = res_data1["data1"];
    for(i=0; i< 5; i++){    
        data1.data1sets[0].data1.push(stats1[i]["count"]);
        data1.labels.push(element["land_str"]);
    }
    }



    var ctx1 = document.getElementById('BundeslandDiagramm').getContext('2d');
    var accidentdata1 = [];
    var colors = accidentdata11.map(function (value) {
        var redIntensity1 = 255 - Math.round((value / Math.max(...accidentdata1)) * 255);
        return 'rgba(255, ' + redIntensity1 + ', 0)';
    });
//HIERHER Bundesland aus DB ziehen  --> land_str vom einzelnen JSON -Element ziehen 
    var data1 = {
        labels: [],
        data1sets: [
            {
                backgroundColor: colors,
                data1: accidentdata11
            }
        ]
    };

    var options1 = {
        scales: {
            x: {
                beginAtZero: true
            }
        },
        legend: {
            display: false
        }
    };

    var myBarChart1 = new Chart(ctx1, {
        type: 'horizontalBar',
        data1: data1,
        options1: options1
    });



    //es fehlt noch:   Top5Bundesländer / Unfallentwicklung

};
