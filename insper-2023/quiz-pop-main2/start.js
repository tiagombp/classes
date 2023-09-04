const selectRegion = document.querySelector("#seletor-regioes");
const startGameForm = document.getElementById("startGameForm");

startGameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let playerName = document.getElementById("playerName");
  localStorage.setItem("playerName", playerName.value)
  window.location.href = "game.html";
  let regiao_selecionada = selectRegion.value;
  localStorage.setItem("regiao_selecionada", regiao_selecionada);

});