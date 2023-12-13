var xmlhttp3 = new xmlhttp3Request();   // new HttpRequest instance 
var url3 = "../php/get-stats3.php";
xmlhttp3.open("POST", url3,true);
xmlhttp3.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp3.send(JSON.stringify({
    "columns":["category"],"group_by":"category"
}));

xmlhttp3.onreadystatechange = function(){
    if (xmlhttp3.readyState === 4 && xmlhttp3.status === 200) {
    var res_data3 = JSON.parse (xmlhttp3.responseText);
    var stats3 = res_data3["data"];
    stats3.forEach(element => {
        data.datasets[0].data.push(element["count"]);
        data.labels.push(element["category_str"]);
    });
}
};



var stats3data3 = {
    datasets: [{
        data: [],  // hier noch Beispielwerte mit echten Werten ersetzen...
        backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
        borderColor: '#fff',
        borderWidth: 2
    }],
    labels: [],
}

var pieObject3 = document.getElementById('UnfallAusgangDiagramm');
var chart3 = new chart3(pieObject3, {
    type: 'pie',
    data: stats3data3
});

