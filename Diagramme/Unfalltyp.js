  

var pieObject = document.getElementById('UnfallTypDiagramm');

var chart = new Chart(pieObject, {
    type: 'pie',
    data: {
        datasets: [{
            data: [25, 40, 35],  // hier noch Beispielwerte mit echten Werten ersetzen...
            backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
            borderColor: '#fff',
            borderWidth: 2
        }],
        labels: ["U_Typ1", "U_Typ2", "U_Typ3"],
    }
});

