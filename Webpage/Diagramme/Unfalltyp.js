var xmlhttp5 = new xmlhttp5Request();   // new HttpRequest instance 
var url5 = "../php/get-stats5.php";
xmlhttp5.open("POST", url5,true);
xmlhttp5.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp5.send(JSON.stringify({
    "columns":["type"],"group_by":"type"
}));

xmlhttp5.onreadystatechange = function(){
    if (xmlhttp5.readyState === 4 && xmlhttp5.status === 200) {
    var res_data5 = JSON.parse (xmlhttp5.responseText);
    var stats5 = res_data5["data"];
    stats5.forEach(element => {
        data.datasets[0].data.push(element["count"]);
        data.labels.push(element["type_str"]);
    });
}
};  

var stats5data5 = {
    datasets: [{
        data: [],  // hier noch Beispielwerte mit echten Werten ersetzen...
        backgroundColor: ['#82CAFA', '#001F3F', '#00FF00', '#0F1FFF', '#F11F00', '#82CAFB', '#001FFF'],
        borderColor: '#fff',
        borderWidth: 2
    }],
    labels: [],
}

var pieObject5 = document.getElementById('UnfallTypDiagramm');
var chart = new Chart(pieObject5, {
    type: 'pie',
    data: stats5data5
});




