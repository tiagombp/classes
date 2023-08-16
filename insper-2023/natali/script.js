document.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById("container");
  var balls = [];

  document.addEventListener("mousemove", function (event) {
    var ball = document.createElement("div"); // Representar uma bolinha na página
    ball.classList.add("ball"); // Permite que a bolinha tenha estilos pré-definidos ou seja estilizada
    ball.style.width = getRandomSize() + "px"; // Largura da bolinha
    ball.style.height = ball.style.width; // Fazer com que a bolinha seja um círculo perfeito!

    var mouseX = event.clientX; // Posição horizontal do cursor do mouse em relação à janela do navegador
    var mouseY = event.clientY; // Posição vertical do cursor do mouse em relação à janela do navegador

    var separation = 10; // Espaçamento entre as bolinhas

    // Garantir que a bolinha seja posicionada precisamente onde o mouse está
    ball.style.left = mouseX + "px";
    ball.style.top = mouseY + "px";

    container.appendChild(ball);
    balls.push(ball);
  });

  function getRandomSize() {
    var minSize = 1; // Tamanho mínimo da bolinha
    var maxSize = 200; // Tamanho máximo da bolinha
    return Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
  }
});

function abrirPopup() {
  var textoAba = document.getElementById("textoAba").innerText;
  document.getElementById("popupTexto").textContent = textoAba;
  document.getElementById("popup").style.display = "block";
}

function fecharPopup() {
  document.getElementById("popup").style.display = "none";
}
