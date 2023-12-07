  

var pieObject = document.getElementById('UnfallTypDiagramm');

var chart = new Chart(pieObject, {
    type: 'pie',
    data: {
        datasets: [{
            data: [25, 40, 35, 21, 42, 32, 54],  // hier noch Beispielwerte mit echten Werten ersetzen...
            backgroundColor: ['#82CAFA', '#001F3F', '#00FF00', '#0F1FFF', '#F11F00', '#82CAFB', '#001FFF'],
            borderColor: '#fff',
            borderWidth: 2
        }],
        labels: ["fahren", "abbiegen", "einbiegen/kreuzen", "überschreiten", "durch ruhenden Verkehr", "im Längsverkehr", "sonstiges"],

    }
});

