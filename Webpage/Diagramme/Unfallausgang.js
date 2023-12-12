var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
var url = "../php/get-stats.php";
xmlhttp.open("POST", url,true);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(JSON.stringify({
    "columns":["category"],"group_by":"category"
}));

xmlhttp.onreadystatechange = function(){
    var res_data = JSON.parse (xmlhttp.responseText);
    var stats = res_data["data"];
    stats.forEach(element => {
        data.datasets[0].data.push(element["count"]);
        data.labels.push(element["category_str"]);
    });
};



var statsdata = {
    datasets: [{
        data: [],  // hier noch Beispielwerte mit echten Werten ersetzen...
        backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
        borderColor: '#fff',
        borderWidth: 2
    }],
    labels: [],
}

var pieObject = document.getElementById('UnfallAusgangDiagramm');
var chart = new Chart(pieObject, {
    type: 'pie',
    data: statsdata
});
