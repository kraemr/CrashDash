
var ctx = document.getElementById('lineDiagramm').getContext('2d');

var data = {
    labels: [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    datasets: [
        {
            label: 'Gesamt',
            borderColor: '#2980b9',
            backgroundColor: 'rgba(41, 128, 185, 0.2)',
            data: [50, 75, 60, 45, 80, 65, 70, 55, 40, 60, 75, 90]
        },
        {
            label: 'Pkw',
            borderColor: '#27ae60',
            backgroundColor: 'rgba(39, 174, 96, 0.2)',
            data: [30, 45, 40, 35, 60, 50, 55, 40, 30, 45, 60, 70]
        },
        {
            label: 'Lkw',
            borderColor: '#c0392b',
            backgroundColor: 'rgba(192, 57, 43, 0.2)',
            data: [10, 20, 15, 10, 20, 15, 15, 10, 10, 15, 20, 25]
        },
        {
            label: 'Motorrad',
            borderColor: '#d35400',
            backgroundColor: 'rgba(211, 84, 0, 0.2)',
            data: [5, 10, 8, 5, 12, 10, 9, 7, 6, 8, 11, 13]
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
