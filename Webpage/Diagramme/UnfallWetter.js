// Definitionen zuerst
var data = {
    labels: ['Regen', 'Schnee', 'Trocken', 'Glatteis'],
    datasets: [{
      label: 'Unfallkorrelation zu Witterungsverhältnissen/Straßenkonditionen',
      data: [25, 35, 8, 45], // Hier sollten die tatsächlichen Daten aus DB stehen
      backgroundColor: [
        'rgba(75, 192, 192, 1.0)',
        'rgba(255, 99, 132, 1.0)',
        'rgba(255, 206, 86, 1.0)',
        'rgba(54, 162, 235, 1.0)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }]
  };
  
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
  
  // Diagramm erstellen
  var ctx = document.getElementById('WetterChartDiagramm').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
  