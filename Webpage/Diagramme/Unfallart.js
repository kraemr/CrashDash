  

var donutObject = document.getElementById('UnfallArtDiagramm');

var chart = new Chart(donutObject, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [25, 40, 35, 32, 44, 25, 40, 35, 32, 40, 14],  // hier noch Beispielwerte mit echten Werten ersetzen...
            backgroundColor: ['#82CAFA', '#001F3F', '#00FF00', '#0F1FFF', '#F11F00', '#82CAFB', '#001FFF', '#00FA00', '#001FAA', '#011F00', '#82FAFF'],
            borderColor: '#fff',
            borderWidth: 2
        }],
        labels: ["anfahrend/ anhaltend/ ruhend", "vorausfahrend/ wartend", "seitlich in gleiche Richtung", "entgegenkommed", "einbiegend/ kreuzend", "mit Fußgänger", "mit Fahrbahnhindernis", "abkommen von Fahrbahn nach L", "abkommen von Fahrbahn nach R", "andere Unfallart"],
    }
});

