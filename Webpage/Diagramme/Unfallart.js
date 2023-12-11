var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
var url = "../php/get-stats.php";
xmlhttp.open("POST", url,true);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(JSON.stringify({
    "columns":["kind"],"group_by":"kind"
}));

xmlhttp.onreadystatechange = function(){
    var res_data = JSON.parse (xmlhttp.responseText);
    var stats = res_data["data"];
    stats.forEach(element => {
        data.datasets[0].data.push(element["count"]);
        data.labels.push(element["kind_str"]);
    });
};

var statsdata = {
    datasets: [{
        data: [],  // hier noch Beispielwerte mit echten Werten ersetzen...
        backgroundColor: ['#82CAFA', '#001F3F', '#00FF00', '#0F1FFF', '#F11F00', '#82CAFB', '#001FFF', '#00FA00', '#001FAA', '#011F00', '#82FAFF'],
        borderColor: '#fff',
        borderWidth: 2
    }],
    labels: [],
}

var donutObject = document.getElementById('UnfallArtDiagramm');
var chart = new Chart(donutObject, {
    type: 'doughnut',
    data: statsdata
});

