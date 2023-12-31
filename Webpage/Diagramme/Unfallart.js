loadChart2();

function loadChart2() {
    var xmlhttp2 = new XMLHttpRequest();   // new HttpRequest instance 
    var url2 = "../php/get-stats.php";
    xmlhttp2.open("POST", url2,true);
    xmlhttp2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp2.send(JSON.stringify({
        "columns":["kind"],"group_by":"kind","year":document.getElementById("year").value
    }));

    xmlhttp2.onreadystatechange = function(){
        if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
            let stats2data = {
                datasets: [{
                    data: [], 
                    backgroundColor: ['#3cb44b', '#f58231', '#e6194B', '#9A6324', '#ffe119', '#911eb4', '#469990', '#ffd8b1', '#aaffc3', '#000075', '#dcbeff', '#fffac8', '#42d4f4', '#a9a9a9', '#f032e6', '#4363d8'],
                    borderColor: '#fff',
                    borderWidth: 2
                }],
                labels: [],
            }
        let res_data2 = JSON.parse (xmlhttp2.responseText);
        let stats2 = res_data2["data"];
        console.log(xmlhttp2.responseText);
        stats2.forEach(element => {
            stats2data.datasets[0].data.push(element["count"]);
            stats2data.labels.push(element["kind_str"]);
        });
    
    
        
        let donutObject2 = document.getElementById('UnfallArtDiagramm');
        let chart2 = new Chart(donutObject2, {
            type: 'doughnut',
            data: stats2data
        });

    }
    };
}

document.getElementById("year").addEventListener("change", loadChart2);