loadChart1();

function loadChart1() {
    var xmlhttp1 = new XMLHttpRequest();   // new HttpRequest instance 
    var url1 = "../php/get-stats.php";
    xmlhttp1.open("POST", url1,true);
    xmlhttp1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp1.send(JSON.stringify({
        "columns":["land"],"group_by":"land", "order_by": "count", "asc": 0,"year":document.getElementById("year").value
    }));

    xmlhttp1.onreadystatechange = function(){
        if (xmlhttp1.readyState === 4 && xmlhttp1.status === 200) {
        let res_data1 = JSON.parse (xmlhttp1.responseText);
        let stats1 = res_data1["data"];
        var data1 = {
            datasets: [
                {
                    backgroundColor: colors,
                    data: []
                }
            ],
            labels: []
        };
        for(i=0; i< 5; i++){    
            data1.datasets[0].data.push(stats1[i]["count"]);
            data1.labels.push(stats1[i]["land_str"]);
        }
        



        var ctx1 = document.getElementById('BundeslandDiagramm').getContext('2d');
        var colors = data1.datasets[0].data.map(function (value) {
            var redIntensity1 = 255 - Math.round((value / Math.max(...data1.datasets[0].data)) * 255);
            return 'rgba(255, ' + redIntensity1 + ', 0)';
        });
        data1.datasets[0].backgroundColor = colors;

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
            data: data1,
            options: options1

        });
        }
    };
}

document.getElementById("year").addEventListener("change", loadChart1);