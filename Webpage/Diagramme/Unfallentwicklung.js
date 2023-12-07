var ctx = document.getElementById('lineDiagramm').getContext('2d');

var data = {
    labels: [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    datasets: [
        {
            label: 'Fußgänger',
            borderColor: '#9b59b6',
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparente Hintergrundfarbe entfernt
            data: [50, 75, 60, 45, 80, 65, 70, 55, 40, 60, 75, 90],
            borderWidth: 4 // Dicke der Linie erhöht
        },
        {
            label: 'Pkw',
            borderColor: '#3498db',
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparente Hintergrundfarbe entfernt
            data: [30, 45, 40, 35, 60, 50, 55, 40, 30, 45, 60, 70],
            borderWidth: 4 // Dicke der Linie erhöht
        },
        {
            label: 'Lkw',
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparente Hintergrundfarbe entfernt
            data: [10, 20, 15, 10, 20, 15, 15, 10, 10, 15, 20, 25],
            borderWidth: 4 // Dicke der Linie erhöht
        },
        {
            label: 'Motorrad',
            borderColor: '#f39c12',
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparente Hintergrundfarbe entfernt
            data: [5, 10, 8, 5, 12, 10, 9, 7, 6, 8, 11, 13],
            borderWidth: 4 // Dicke der Linie erhöht
        }
    ]
};

var options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});
