const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const tab = document.querySelector('table.ranking tbody');

highScores.forEach(pontuacao => {

    const newRow = document.createElement('tr');
    newRow.classList.add('linha-ranking');

    const newCellPlayer = document.createElement('td');
    newCellPlayer.innerText = pontuacao.name;
    newCellPlayer.classList.add('linha-ranking-nome');

    const newCellScore = document.createElement('td');
    newCellScore.innerText = pontuacao.score;
    newCellScore.classList.add('linha-ranking-score');

    newRow.appendChild(newCellPlayer);
    newRow.appendChild(newCellScore);

    tab.appendChild(newRow);
    
});