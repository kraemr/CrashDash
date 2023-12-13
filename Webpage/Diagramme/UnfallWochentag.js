function loadChart() {
  var xmlhttp6 = new XMLHttpRequest();   // new HttpRequest instance 
  var url6 = "../php/get-stats.php";
  xmlhttp6.open("POST", url6,true);
  xmlhttp6.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp6.send(JSON.stringify({
      "columns":["day"],"group_by":"day","year":document.getElementById("year").value
  }));

  xmlhttp6.onreadystatechange = function(){
    if (xmlhttp6.readyState === 4 && xmlhttp6.status === 200) {

  var stats6data6 = {
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
  var options6 = {
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

    var res_data6 = JSON.parse (xmlhttp6.responseText);
    var stats6 = res_data6["data"];
    stats6.forEach(element => {
      stats6data6.datasets[0].data.push(element["count"]);
        stats6data6.labels.push(element["day_str"]);
      });
    var ctx = document.getElementById('WochentagChartDiagramm').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    options: options6,
    data: stats6data6
  });

    }
  };
}

document.getElementById("year").addEventListener("change", loadChart);
