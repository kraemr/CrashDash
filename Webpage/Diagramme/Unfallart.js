var xmlhttp2 = new xmlhttp2Request();   // new HttpRequest instance 
var url2 = "../php/get-stats2.php";
xmlhttp2.open("POST", url2,true);
xmlhttp2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp2.send(JSON.stringify({
    "columns":["kind"],"group_by":"kind"
}));

xmlhttp2.onreadystatechange = function(){
    if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
        let stats2data = {
            datasets: [{
                data: [],  // hier noch Beispielwerte mit echten Werten ersetzen...
                backgroundColor: ['#82CAFA', '#001F3F', '#00FF00', '#0F1FFF', '#F11F00', '#82CAFB', '#001FFF', '#00FA00', '#001FAA', '#011F00', '#82FAFF'],
                borderColor: '#fff',
                borderWidth: 2
            }],
            labels: ["test"],
        }
    let res_data2 = JSON.parse (xmlhttp2.responseText);
    let stats2 = res_data2["data"];
    console.log(xmlhttp2.responseText);
    stats2.forEach(element => {
        data.datasets[0].data.push(element["count"]);
       // data.labels.push(element["kind_str"]);
    });
   
   
    
    let donutObject2 = document.getElementById('UnfallArtDiagramm');
    let chart2 = new chart2(donutObject2, {
        type: 'doughnut',
        data: stats2data
    });

}
};





