
        var ctx = document.getElementById('StädteDiagramm').getContext('2d');

        // Hier rein die Unfalldaten aus der Datenbank...
        var accidentData = [120, 95, 80, 75, 70, 65, 60, 55, 50, 45];

        // Farbskala wird generiert die von Hellrot bis Dunkelrot basierend auf den Unfalldaten verändert
        var colors = accidentData.map(function (value) {
            // Beispiel: Je höher die Unfallzahl, desto dunkler das Rot
            var redIntensity = 255 - Math.round((value / Math.max(...accidentData)) * 255);
       
            return 'rgba(255, ' + redIntensity + ', 0)';
        });
//HIERHER Stadtnamen aus DB ziehen
        var data = {
            labels: ['Stadt A', 'Stadt B', 'Stadt C', 'Stadt D', 'Stadt E', 'Stadt F', 'Stadt G', 'Stadt H', 'Stadt I', 'Stadt J'],
            datasets: [
                {
                    backgroundColor: colors,
                    data: accidentData
                }
            ]
        };

        var options = {
            scales: {
                x: {
                    beginAtZero: true
                }
            },
            legend: {
                display: false
            }
        };

        var myBarChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: data,
            options: options
        });
 