/*
var ctx;
var backgroundSP;
var x = 0;
var y = 0;
*/
var numerodefWagners = 10; //total de imagens do wagner na tela

/*
var chuvadeWagners = []; //array/lista inicialmente vazia

function drawBackground() {
  ctx.drawImage(backgroundSP, 0, 0); //imagem de fundo do canvas
}

function draw() {
  drawBackground();

  for (var i = 0; i < 9; i++) {
    //imagens do Wagner moura caindo
    ctx.drawImage(
      chuvadeWagners[i].image,
      chuvadeWagners[i].x,
      chuvadeWagners[i].y
    );

    chuvadeWagners[i].y += chuvadeWagners[i].speed;
    if (chuvadeWagners[i].y > 200) {
      chuvadeWagners[i].y = 0;
      chuvadeWagners[i].x = Math.random() * 1250; //faz a imagem aparecer aleatoriamente na área indicada
    }
  }
}

function setup() {
  var canvas = document.getElementById("canvasRegn");

  if (canvas.getContext) {
    ctx = canvas.getContext("2d"); //define o contexto de renderização do canvas, que no caso é 2D

    backgroundSP = new Image(); //define o endereço da imagem de fundo do canvas
    backgroundSP.src = "images/SPnoite.png";
    setInterval(draw, 40);
    for (var i = 1; i < numerodefWagners; i++) {
      var fotoWagner = new Object();
      fotoWagner["image"] = new Image();
      fotoWagner.image.src = "images/man.png"; //define o ederenço da imagem do Wagner Moura

      fotoWagner["x"] = Math.random() * 700;
      fotoWagner["y"] = Math.random() * 800;
      fotoWagner["speed"] = 3 + Math.random() * 1;
      chuvadeWagners.push(fotoWagner);
    }
  }
}

setup();
*/

let fim = false;

// pega uma referência para o div que vai servir de container para os Wagners
const container = document.querySelector("div.canvas");

// pega uma referência para o elemento com a mensagem que vai ser mostrada quando os wagners se forem todos
const msg = document.querySelector("p.no-more-wagners");

// calcula as dimensões do div
const h = +window.getComputedStyle(container).height.slice(0, -2);
const w = +window.getComputedStyle(container).width.slice(0, -2);

//console.log(h, w);

function alt_setup() {
  for (let i = 1; i < numerodefWagners; i++) {
    // cria um elemento imagem, e adiciona a classe "wagner"
    const fotoWagner = document.createElement("img");
    fotoWagner.classList.add("wagner");

    // adiciona a classe "moving", para no futuro diferenciar os wagners que ainda estão se movendo dos que foram clicados e desapareceram
    fotoWagner.classList.add("moving");
    // define o arquivo que contem a imagem do elemento
    fotoWagner.src = "images/man.png";
    // limita a largura do elemento a 10% da largura da imagem de fundo
    fotoWagner.style.width = w / 10 + "px";

    // gera posicoes x e y aleatorias e armazena os valores em atributo data-x e data-y
    const x = Math.random() * w;
    const y = Math.random() * h;
    fotoWagner.dataset.x = x;
    fotoWagner.dataset.y = y;

    // aplica uma translação ao elemento, que é o que vai efetivamente posicioná-lo sobre o elemento container (a imagem de fundo)
    fotoWagner.style.transform = `translate(${x}px, calc(-100% + ${y}px))`;

    const speed = 3 + Math.random() * 1;
    // armazena a velocidade num atributo data-speed do próprio elemento
    fotoWagner.dataset.speed = speed;

    // anexa o elemento img ao div container
    container.append(fotoWagner);

    // adiciona um monitor de eventos para detectar clicks, e chamar a função tchauWagner quando isso acontecer
    fotoWagner.addEventListener("click", tchauWagner);
  }
}

function atualiza_posicoes() {
  // pega todos os elementos img que foram criados (mas só os que ainda estão se movendo);
  const wagners = document.querySelectorAll("img.wagner.moving");

  if (wagners.length == 0) {
    // ou seja, quando não houver mais nenhum wagner com a classe "moving"
    if (!fim) {
      // adiciona a classe "visible" ao elemento que contém a mensagem final -- na prática, muda sua opacity de 0 (invisível) para 1 (visível)
      msg.classList.add("visible");
      // para a música
      document.querySelector("audio").pause();
      // só para não ficar executando este bloco de código para sempre -- paz de espírito
      fim = true;
    }
  }

  wagners.forEach((wagner) => {
    // recupera os atributos speed, x e y do elemento
    const speed = +wagner.dataset.speed;
    let x = +wagner.dataset.x;
    let y = +wagner.dataset.y;

    // incrementa a posição y com base no valor de speed
    y += speed;

    if (y > h) {
      y = 0;
      x = Math.random() * w;
      wagner.dataset.x = x;
    }

    // atualiza o valor armazenado no elemento
    wagner.dataset.y = y;

    // aplica a transformação novamente, agora com os valores de x e y atualizados
    wagner.style.transform = `translate(${x}px, calc(-100% + ${y}px))`;
  });
}

function tchauWagner(e) {
  // uma referencia para o elemento clicado
  const wagner = e.target;

  // acrescentamos a classe "gone", o que na prática vai incluir uma transição para a propriedade transform
  wagner.classList.add("gone");

  // remove a classe "moving", de forma que esse elemento não vai mais ser atualizado pela funcao "atualiza_posicoes"
  wagner.classList.remove("moving");

  // recupera os valores da posição atual do wagner
  let x = +wagner.dataset.x;
  let y = +wagner.dataset.y;

  // aplica uma transformação incluindo uma rotação e um scale para 0 -- o que fará a imagem desaparecer
  // como o elemento agora tem uma transição programada, essas transformações vão acontecer de forma gradual
  wagner.style.transform = `translate(${x}px, calc(-100% + ${y}px)) rotateZ(5turn) scale(0)`;
}

alt_setup();
setInterval(atualiza_posicoes, 40);
