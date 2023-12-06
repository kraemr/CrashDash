  

var donutObject = document.getElementById('UnfallArtDiagramm');

var chart = new Chart(donutObject, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [25, 40, 35],  // hier noch Beispielwerte mit echten Werten ersetzen...
            backgroundColor: ['#82CAFA', '#001F3F', '#00FF00'],
            borderColor: '#fff',
            borderWidth: 2
        }],
        labels: ["U_Art1", "U_Art2", "U_Art3"],
    }
});

