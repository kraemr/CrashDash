 loadChart5();

 function loadChart5(){
    var xmlhttp5 = new XMLHttpRequest();   // new HttpRequest instance 
    var url5 = "../php/get-stats.php";
    xmlhttp5.open("POST", url5,true);
    xmlhttp5.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp5.send(JSON.stringify({
        "columns":["type"],"group_by":"type","year":document.getElementById("year").value
    }));

    xmlhttp5.onreadystatechange = function(){
        if (xmlhttp5.readyState === 4 && xmlhttp5.status === 200) {

    var stats5data5 = {
        datasets: [{
            data: [],  // hier noch Beispielwerte mit echten Werten ersetzen...
            backgroundColor: ['#82CAFA', '#001F3F', '#00FF00', '#0F1FFF', '#F11F00', '#82CAFB', '#001FFF'],
            borderColor: '#fff',
            borderWidth: 2
        }],
        labels: [],
    }
        var res_data5 = JSON.parse (xmlhttp5.responseText);
        var stats5 = res_data5["data"];
        stats5.forEach(element => {
            stats5data5.datasets[0].data.push(element["count"]);
            stats5data5.labels.push(element["type_str"]);
        });


    var pieObject5 = document.getElementById('UnfallTypDiagramm');
    var chart = new Chart(pieObject5, {
        type: 'pie',
        data: stats5data5
    });
    }
    };  
}

document.getElementById("year").addEventListener("change", loadChart5);
