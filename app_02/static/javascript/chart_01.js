var ctx = document.getElementById('lineChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Cas', 'EnsFot', 'Form', 'Newb', 'Aniv', 'Gest', 'Film', 'Bat', 'Gast', 'Mod', 'Esport', 'Even'],
        datasets: [{
            label: 'Levantamento mensal de curtidas',
            data: [2050, 1900, 2100, 2800, 1800, 2000, 2500, 2600, 2450, 1950, 2300, 2900],
            backgroundColor: [
                'rgba(85,85,85, 1)'

            ],
            borderColor: 'rgb(220, 20, 60, 1)',

            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});