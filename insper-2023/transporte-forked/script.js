mapboxgl.accessToken = 'pk.eyJ1IjoidGlhZ29tYnAiLCJhIjoiY2thdjJmajYzMHR1YzJ5b2huM2pscjdreCJ9.oT7nAiasQnIMjhUB-VFvmw';

let pto_origem, pto_destino;

// inicializa o objeto mapa, padrao do Mapbox
const map = new mapboxgl.Map({
  container: 'map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-35.733926, -9.647684],
  zoom: 8
});

// cria o objeto de geocoding para a caixa de pesquisa da origem
const geocoder_origem = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: 'Insira um endereço de origem',
  mapboxgl: mapboxgl,
  bbox: [-73.9872354804, -33.7683777809, -34.7299934555, 5.24448639569]
})

// cria o objeto de geocoding para a caixa de pesquisa do destino
const geocoder_destino = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: 'Insira um endereço de destino',
  mapboxgl: mapboxgl,
  bbox: [-73.9872354804, -33.7683777809, -34.7299934555, 5.24448639569]
})
 
// adiciona as caixas de pesquisas respectivas ao mapa, posicionando ambas no canto superior esquerdo
map.addControl(geocoder_origem, 'top-left');
map.addControl(geocoder_destino, 'top-left');

// monitora toda vez que um novo resultado foi gerado para uma pesquisa na caixa de pesquisa da origem
// armazena as coordenadas do resultado na variável pto_origem
geocoder_origem.on('result', e => {
  pto_origem = e.result.center;
});

// mesma coisa, mas para a caixa de pesquisa do destino
geocoder_destino.on('result', e => {
  pto_destino = e.result.center;
});

// só uma função para formatar valores em percentuais
function format_pct(n) {
  if (n == null) return 0;
  return new Intl.NumberFormat("pt-BR", { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

// mesma coisa, mas para números decimais normais, com duas casas decimais
function format(n) {
  if (n == null) return 0;
  return new Intl.NumberFormat("pt-BR", { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

let selectElement = document.getElementById("opcoes");
let cidadeElement = document.getElementById("cidade");
const resultadoElement = document.getElementById("resultado");
let custoOnibus = 3.49; //valor padrão // como o seletor começa em maceió, usa o valor de maceió por padrão. mas vai ser alterado quando a cidade for alterada.


// Evento de escuta para a mudança na seleção da cidade
cidadeElement.addEventListener("change", definirCustoOnibus);
// Evento de escuta  para a seleção de opções
selectElement.addEventListener("change", mostrarOpcoes);//calcularImpactoSalarial);



function definirCustoOnibus() {
  let cidadeSelecionada = cidadeElement.value;

  let centro_mapa = [-35.733926, -9.647684];

  switch (cidadeSelecionada) {
    case "maceio":
      centro_mapa = [-35.733926, -9.647684];
      custoOnibus = 3.49; // Custo para Maceió (AL)
      break;
    case "salvador":
      centro_mapa = [-38.481277, -12.98225];
      custoOnibus = 4.9; // Custo para Salvador (BA)
      break;
    case "aracaju":
      centro_mapa = [-37.077466, -10.916206];
      custoOnibus = 4.5; // Custo para Aracaju (SE)
      break;
    case "recife":
      centro_mapa = [-34.884819, -8.058493];
      custoOnibus = 4.1; // Custo para Recife (PE)
      break;
    case "natal":
      centro_mapa = [-35.208091, -5.805398];
      custoOnibus = 3.9; // Custo para Natal (RN)
      break;
    case "joao-pessoa":
      centro_mapa = [-34.882028, -7.121598];
      custoOnibus = 4.7; // Custo para João Pessoa (PB)
      break;
    case "teresina":
      centro_mapa = [-42.809588, -5.08964];
      custoOnibus = 4; // Custo para Teresina (PI)
      break;
    case "fortaleza":
      centro_mapa = [-38.521799, -3.730451];
      custoOnibus = 4.5; // Custo para Fortaleza (CE)
      break;
    case "sao-luis":
      centro_mapa = [-44.244872, -2.56346];
      custoOnibus = 4.2; // Custo para São Luís (MA)
      break;
  }

  //console.log(centro_mapa, cidadeSelecionada);

  // faz o mapa voar até a cidade selecionada;
  map.flyTo({
    center: centro_mapa,
    zoom: 9,
    speed: 1
  })
    //custoOnibus = 3.49; // Valor padrão para Maceió (AL)
}

//calcularImpactoSalarial();


// Função para calcular o impacto salarial
async function calcularImpactoSalarial() {
  let opcaoSelecionada = selectElement.value;
  let custoTotal;

  // carros

  if (opcaoSelecionada === "carromais" || opcaoSelecionada === "carromenos") {

    // deixando esse cálculo aqui, para só ser feito se for uma opção de carro
    let distancia = await calcularDistancia() / 1000; // pq a distancia vem em metros!

    if (opcaoSelecionada === "carromais") {
      var consumoVeiculo = 15;
      var precoCombustivel = parseFloat(document.getElementById("combustivel").value);//parseFloat(document.getElementById("preco").value);
      var depreciacaoVeiculo = 1500/21; // Valor fixo de depreciação em reais // divido por 21 pq depois ele vai multiplicar tudo por 21
      custoTotal =
        (distancia / consumoVeiculo) * precoCombustivel + depreciacaoVeiculo;
    } else if (opcaoSelecionada === "carromenos") {
      var consumoVeiculo = 8;
      var precoCombustivel = parseFloat(document.getElementById("combustivel").value);//parseFloat(document.getElementById("preco").value);
      var depreciacaoVeiculo = 4200/21; // Valor fixo de depreciação em reais // divido por 21 pq depois ele vai multiplicar tudo por 21
      custoTotal =
        (distancia / consumoVeiculo) * precoCombustivel + depreciacaoVeiculo;
    }

  // onibus

  } else if (opcaoSelecionada === "onibus-gratuidade") {
    custoTotal = 0; // Valor fixo para ônibus com gratuidade
  } else if (opcaoSelecionada === "onibus-vamu") {
    var passagensVamu = parseInt(
      document.getElementById("passagens-gratuidade").value
    );
    custoTotal = custoOnibus * passagensVamu; // Use a variável de custo do ônibus
  } else if (opcaoSelecionada === "onibus-debito") {
    var passagensDebito = parseInt(
      document.getElementById("passagens-gratuidade").value
    );
    //console.log(passagensDebito, custoOnibus);
    custoTotal = custoOnibus * passagensDebito; // Use a variável de custo do ônibus
  }

  var salarioElement = document.getElementById("salario");
  var salario = parseFloat(salarioElement.value);

  var custo = custoTotal * 21;
  var impactoSalarial = (custo / salario);

  resultadoElement.textContent = isNaN(impactoSalarial) ?
    "Preencha as informações necessárias!" :
    "O impacto salarial é: " + format_pct(impactoSalarial);//impactoSalarial.toFixed(2) + "%";
}

// função que é chamada para calcular a distância, dentro da função de cálculo do impacto salarial, quando a opção selecionada é uma de carro.
async function calcularDistancia() {
  // Define URL das APIs
  const apiGeocode = "https://api.openrouteservice.org/geocode/search";
  const apiDirections =
    "https://api.openrouteservice.org/v2/directions/driving-car";

  // Define chave
  const apiKey = "5b3ce3597851110001cf62482d3588894c554675a511dbec551d4cca";

  // TODO: Converter partida e destino em coordenadas (lon,lat)

  if (!pto_destino || !pto_origem) {
    console.log('preencher endereços');
    return 0;
  }

  // Define pontos de início e fim, a partir das variáveis que foram alimentadas quando a pessoa pesquisou os endereços de origem e destino
  const start = `${pto_origem[0]},${pto_origem[1]}`;//"9.6433526,35.710646"; // lon,lat
  const end = `${pto_destino[0]},${pto_destino[1]}`;; // lon,lat

  // Monta URL
  const url = `${apiDirections}?api_key=${apiKey}&start=${start}&end=${end}`;

  // Pede para a API calcular a distância
  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    const distance = dados.features[0].properties.segments[0].distance;
    // essa distância é em metros!
    console.log(distance);

    return distance;
  } catch (error) {
    console.error("Erro ao calcular a distância: ", error);
    return 0; // Retorna 0 em caso de erro
  }
}

// função que é chamada quando a pessoa seleciona a opção de viagem
function mostrarOpcoes() {
  let opcaoSelecionadaInput = selectElement.value;

  console.log("Opcao selecionada: " + opcaoSelecionadaInput);

  // Ocultar todos os campos antes de exibir as opções relevantes
  document.querySelector("#opcao-combustivel").style.display = "none";
  document.querySelector("#opcoes-onibus-gratuidade").style.display = "none";
  document.querySelector("#opcoes-uber").style.display = "none";

  if (
    opcaoSelecionadaInput == "onibus-gratuidade" ||
    opcaoSelecionadaInput == "onibus-vamu" ||
    opcaoSelecionadaInput == "onibus-debito"
  ) {
    document.querySelector("#opcoes-onibus-gratuidade").style.display = "block";
    // Ocultar partida e destino nas opções de ônibus
    console.log('aqui');
    document.querySelector(".map-container").style.display = "none";
    //document.querySelector("#opcoes-partida").style.display = "none";
    //document.querySelector("#opcoes-destino").style.display = "none";
  } else if (opcaoSelecionadaInput == "uber") {
    document.querySelector("#opcoes-uber").style.display = "block";
    document.querySelector(".map-container").style.display = "block";
    //document.querySelector("#opcoes-partida").style.display = "block";
    //document.querySelector("#opcoes-destino").style.display = "block";
  } else {
    document.querySelector("#opcao-combustivel").style.display = "block";
    document.querySelector(".map-container").style.display = "block";
    //document.querySelector("#opcoes-partida").style.display = "block";
    //document.querySelector("#opcoes-destino").style.display = "block";
  }
}
