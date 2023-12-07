  

var pieObject = document.getElementById('UnfallTypDiagramm');

var chart = new Chart(pieObject, {
    type: 'pie',
    data: {
        datasets: [{
            data: [25, 40, 35],  // hier noch Beispielwerte mit echten Werten ersetzen...
            backgroundColor: ['#8B008B', '#40E0D0' , '#7FFF00'],
            borderColor: '#fff',
            borderWidth: 2
        }],
        labels: ["U_Typ1", "U_Typ2", "U_Typ3"],
    }
});

