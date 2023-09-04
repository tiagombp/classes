document.addEventListener("DOMContentLoaded", function () {
  // Get the player's name from localStorage
  const playerName = localStorage.getItem("playerName");

  // Get the most recent score from localStorage
  const mostRecentScore = localStorage.getItem("mostRecentScore");

  // Select the finalScore element
  const finalScore = document.getElementById("finalScore");

  // Display the player's name and score
  if (playerName) {
    finalScore.innerHTML = `Congratulations, ${playerName}!<br>Your Score: ${mostRecentScore}`;
  } else {
    finalScore.innerHTML = `Congratulations!<br>Your Score: ${mostRecentScore}`;
  }

  saveHighScore();

  // Populate the ranking page
  
  //const highScoresList = document.getElementById("highScoresList");
  //const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
  /*highScoresList.innerHTML = highScores
    .map((score) => `<li>${score.name} - ${score.score}</li>`)
    .join("");*/
});

const saveScoreBtn = document.getElementById("saveScoreBtn");
const username = localStorage.getItem("playerName");//document.getElementById("username");
const mostRecentScore = localStorage.getItem("mostRecentScore");

/*
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});*/

function saveHighScore() {

  const score = {
    score: mostRecentScore,
    name: username
  };

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  console.log(score);
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  //highScores.splice(MAX_HIGH_SCORES);

  console.log(highScores);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  //window.location.assign("/");
};
