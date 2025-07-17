var ctx2 = document.getElementById('doughnut').getContext('2d');
var myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['Casamento', 'Ensaio Fotográfico', 'Formatura', 'Newborn', 'Aniversário', 'Gestante', 'Filmaker', 'Outros'],
        datasets: [{
            label: 'Visualização por categorias',
            data: [42, 35, 8, 10, 20, 15, 16, 4],
            backgroundColor: [
                'rgba(186, 230, 209, 1)', /* Casamento */
                'rgba(133, 194, 235, 1)', /* Ensaio Fotografico */
                'rgba(248, 228, 177, 1)', /* Formatura */
                'rgba(242, 107, 134, 1)', /* Newborn */
                'rgba(239, 191, 109, 1)', /* Aniversário */
                'rgba(164, 142, 224, 1)', /* Gestante */
                'rgba(23, 102, 239, 0.8)', /* Filmaker */
                'rgba(197, 86, 205, 0.8)'  /* Outros */
            ],
            borderColor: [
                'rgba(41, 155, 99, 1)', /* Casamento */
                'rgba(54, 162, 235, 1)', /* Ensaio Fotografico */
                'rgba(255, 206, 86, 1)', /* Formatura */
                'rgba(242, 107, 134, 1)', /* Newborn */
                'rgba(249, 170, 35, 1)', /* Aniversário */
                'rgba(120, 79, 230, 1)', /* Gestante */
                'rgba(11, 51, 211, 1)', /* Filmaker */
                'rgba(236, 10, 252, 1)'  /* Outros */
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'left', // Posiciona a legenda no lado esquerdo
                labels: {
                    boxWidth: 20, // Largura do quadrado de cor do item
                    padding: 15, // Espaçamento entre os itens
                    font: {
                        size: 14 // Tamanho da fonte dos labels
                    }
                }
            }
        }
    }
});

// Função para tradução
function translatePage(language) {
    if (language) {
        alert('A funcionalidade de tradução para ' + language + ' será implementada.');
    }
}
