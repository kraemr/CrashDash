 function loadChart4() {
    var xmlhttp4 = new XMLHttpRequest();   // new HttpRequest instance 
    var url4 = "../php/get-stats.php";
    xmlhttp4.open("POST", url4,true);
    xmlhttp4.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xmlhttp4.send(JSON.stringify({
        "columns":["month", "passenger_involved"],"group_by":"month", "order_by": "month", "asc": true,"year":document.getElementById("year").value
    }));

    xmlhttp4.onreadystatechange = function(){
        if (xmlhttp4.readyState === 4 && xmlhttp4.status === 200) {
        let res_data4 = JSON.parse (xmlhttp4.responseText);
        let stats4 = res_data4["data"];
        var ctx4 = document.getElementById('lineDiagramm').getContext('2d');
    
        var data4 = {
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
        for(i=0;i<stats4.length;i++){
            data4.datasets[0].data.push(stats4[i]["count"]);
        }
        var options4 = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        var myLineChart4 = new Chart(ctx4, {
            type: 'line',
            data: data4,
            options: options4
        });
    }
    };
}

document.getElementById("year").addEventListener("change", loadChart4);