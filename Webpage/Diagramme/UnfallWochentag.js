var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
var url = "../php/get-stats.php";
xmlhttp.open("POST", url,true);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(JSON.stringify({
    "columns":["day"],"group_by":"day"
}));

xmlhttp.onreadystatechange = function(){
    var res_data = JSON.parse (xmlhttp.responseText);
    var stats = res_data["data"];
    stats.forEach(element => {
        data.datasets[0].data.push(element["count"]);
        data.labels.push(element["day_str"]);
    });
};



var statsdata = {
  datasets: [{
    label: 'Unfallkorrelation nach Wochentag',
      data: [],  // hier noch Beispielwerte mit echten Werten ersetzen...
      backgroundColor: [
        'rgba(75, 192, 192, 1.0)',
        'rgba(255, 99, 132, 1.0)',
        'rgba(255, 206, 86, 1.0)',
        'rgba(54, 162, 235, 1.0)',
        'rgba(255, 99, 132, 1.0)',
        'rgba(255, 206, 86, 1.0)',
        'rgba(54, 162, 235, 1.0)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }],
  labels: [],
}
var options = {
  scales: {
    y: {
      beginAtZero: false,
      min: 0
    }
  },
  legend: {
    display: false
  },
  onClick: function() {}, // Leere Funktion, um das Anklicken zu deaktivieren
  tooltip: {
    enabled: false
  }
};

var ctx = document.getElementById('WochentagChartDiagramm').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  options: options,
  data: statsdata
});