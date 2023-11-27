

var pieObject = document.getElementById('UnfallAusgangDiagramm');

var chart = new Chart(pieObject, {
    type: 'pie',
    data: {
        datasets: [{
            data: [25, 40, 35],  // hier noch Beispielwerte mit echten Werten ersetzen...
            backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
            borderColor: '#fff',
            borderWidth: 2
        }],
        labels: ["tödlich", "schwer verletzt", "leicht verletzt"],
    }
});