
        var ctx = document.getElementById('BundeslandDiagramm').getContext('2d');

        // Hier rein die Unfalldaten aus der Datenbank...
        var accidentData = [120, 95, 80, 75, 69];

        // Farbskala wird generiert die von Hellrot bis Dunkelrot basierend auf den Unfalldaten verändert
        var colors = accidentData.map(function (value) {
            // Beispiel: Je höher die Unfallzahl, desto dunkler das Rot
            var redIntensity = 255 - Math.round((value / Math.max(...accidentData)) * 255);
       
            return 'rgba(255, ' + redIntensity + ', 0)';
        });
//HIERHER Bundesland aus DB ziehen
        var data = {
            labels: ['Bundesland A', 'Bundesland B', 'Bundesland C', 'Bundeslamd D', 'Bundesland E'],
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
 