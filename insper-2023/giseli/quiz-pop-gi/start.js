const selectRegion = document.querySelector("#seletor-regioes");
const startGameForm = document.getElementById("startGameForm");


startGameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let playerName = document.getElementById("playerName").value;
  localStorage.setItem("playerName", playerName)

  let regiao_selecionada = selectRegion.value;
  localStorage.setItem("regiao_selecionada", regiao_selecionada);

});