var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
var url = "../php/get-stats.php";
xmlhttp.open("POST", url,true);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(JSON.stringify({
    "columns":["month", "passenger_involved"],"group_by":"month", "order_by": "month", "asc": true
}));

xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    let res_data = JSON.parse (xmlhttp.responseText);
    let stats = res_data["data"];
    var ctx1 = document.getElementById('lineDiagramm').getContext('2d');
    var data1 = {
        labels: [   //month 
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni','Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ],
        datasets: [   //passenger_involved
            {
                label: 'Fußgänger',
                borderColor: '#9b59b6',
                backgroundColor: 'rgba(0, 0, 0, 0)', // Transparente Hintergrundfarbe entfernt
                data: [],
                borderWidth: 4 // Dicke der Linie erhöht
            }]

    };
    //stats.forEach(element => {
    for(i=0;i<stats.length;i++){
        data1.datasets[0].data.push(stats[i]["count"]);
    }
    //});
    var options1 = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    
    var myLineChart1 = new Chart(ctx1, {
        type: 'line',
        data: data1,
        options: options1
    });
}
};









