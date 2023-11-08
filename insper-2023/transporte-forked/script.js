mapboxgl.accessToken = 'pk.eyJ1IjoidGlhZ29tYnAiLCJhIjoiY2thdjJmajYzMHR1YzJ5b2huM2pscjdreCJ9.oT7nAiasQnIMjhUB-VFvmw';

let pto_origem, pto_destino;

const map = new mapboxgl.Map({
  container: 'map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [9.64, 35.71],
  zoom: 13
});

const geocoder_origem = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: 'Insira um endereço de origem',
  mapboxgl: mapboxgl,
  bbox: [-73.9872354804, -33.7683777809, -34.7299934555, 5.24448639569]
})

const geocoder_destino = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: 'Insira um endereço de destino',
  mapboxgl: mapboxgl,
  bbox: [-73.9872354804, -33.7683777809, -34.7299934555, 5.24448639569]
})
 
// Add the control to the map.
map.addControl(geocoder_origem, 'top-left');
map.addControl(geocoder_destino, 'top-left');

geocoder_origem.on('result', e => {
  pto_origem = e.result.center;
});

geocoder_destino.on('result', e => {
  pto_destino = e.result.center;
});




let selectElement = document.getElementById("opcoes");
let cidadeElement = document.getElementById("cidade");
let custoOnibus = 0; //valor padrão

// Evento de escuta para a mudança na seleção da cidade
cidadeElement.addEventListener("change", definirCustoOnibus);

function definirCustoOnibus() {
  let cidadeSelecionada = cidadeElement.value;

  switch (cidadeSelecionada) {
    case "Maceió(AL)":
      custoOnibus = 3.49; // Custo para Maceió (AL)
      break;
    case "Salvador(BA)":
      custoOnibus = 4.9; // Custo para Salvador (BA)
      break;
    case "Aracaju(SE)":
      custoOnibus = 4.5; // Custo para Aracaju (SE)
      break;
    case "Recife(PE)":
      custoOnibus = 4.1; // Custo para Recife (PE)
      break;
    case "Natal(RN)":
      custoOnibus = 3.9; // Custo para Natal (RN)
      break;
    case "João Pessoa(PB)":
      custoOnibus = 4.7; // Custo para João Pessoa (PB)
      break;
    case "Teresina(PI)":
      custoOnibus = 4; // Custo para Teresina (PI)
      break;
    case "Fortaleza(CE)":
      custoOnibus = 4.5; // Custo para Fortaleza (CE)
      break;
    case "São Luís(MA)":
      custoOnibus = 4.2; // Custo para São Luís (MA)
      break;
    default:
    //custoOnibus = 3.49; // Valor padrão para Maceió (AL)
  }
}

//calcularImpactoSalarial();

// Event listener para a seleção de opções
selectElement.addEventListener("change", calcularImpactoSalarial);

// Função para calcular o impacto salarial
async function calcularImpactoSalarial() {
  let opcaoSelecionada = selectElement.value;

  let distancia = await calcularDistancia(
    "João Davino, AL",
    "Massagueirinha, AL"
  );

  let custoTotal;

  if (opcaoSelecionada === "carromais" || opcaoSelecionada === "carromenos") {
    if (opcaoSelecionada === "carromais") {
      var consumoVeiculo = 15;
      var precoCombustivel = parseFloat(document.getElementById("preco").value);
      var depreciacaoVeiculo = 1500; // Valor fixo de depreciação em reais
      custoTotal =
        (distancia / consumoVeiculo) * precoCombustivel + depreciacaoVeiculo;
    } else if (opcaoSelecionada === "carromenos") {
      var consumoVeiculo = 8;
      var precoCombustivel = parseFloat(document.getElementById("preco").value);
      var depreciacaoVeiculo = 4200; // Valor fixo de depreciação em reais
      custoTotal =
        (distancia / consumoVeiculo) * precoCombustivel + depreciacaoVeiculo;
    }
  } else if (opcaoSelecionada === "onibus-gratuidade") {
    custoTotal = 0; // Valor fixo para ônibus com gratuidade
  } else if (opcaoSelecionada === "onibus-vamu") {
    var passagensVamu = parseInt(
      document.getElementById("passagens-vamu").value
    );
    custoTotal = custoOnibus * passagensVamu; // Use a variável de custo do ônibus
  } else if (opcaoSelecionada === "onibus-debito") {
    var passagensDebito = parseInt(
      document.getElementById("passagens-debito").value
    );
    custoTotal = custoOnibus * passagensDebito; // Use a variável de custo do ônibus
  }

  var salarioElement = document.getElementById("salario");
  var salario = parseFloat(salarioElement.value);

  var custo = custoTotal * 21;
  var impactoSalarial = (custo / salario) * 100;

  var resultadoElement = document.getElementById("resultado");
  resultadoElement.textContent =
    "O impacto salarial é: " + impactoSalarial.toFixed(2) + "%";
}

async function calcularDistancia(partida, destino) {
  // Define URL das APIs
  const apiGeocode = "https://api.openrouteservice.org/geocode/search";
  const apiDirections =
    "https://api.openrouteservice.org/v2/directions/driving-car";

  // Define chave
  const apiKey = "5b3ce3597851110001cf62482d3588894c554675a511dbec551d4cca";

  // TODO: Converter partida e destino em coordenadas (lon,lat)

  // Define pontos de início e fim
  const start = "9.6433526,35.710646"; // lon,lat
  const end = "9.627569,35.6992383"; // lon,lat

  // Monta URL
  const url = `${apiDirections}?api_key=${apiKey}&start=${start}&end=${end}`;

  // Pede para a API calcular a distância
  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    const distance = dados.features[0].properties.segments[0].distance;
    console.log(distance);

    return distance;
  } catch (error) {
    console.error("Erro ao calcular a distância: ", error);
    return 0; // Retorna 0 em caso de erro
  }
}

function mostrarOpcoes(selectElement) {
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
    document.querySelector("#opcoes-partida").style.display = "none";
    document.querySelector("#opcoes-destino").style.display = "none";
  } else if (opcaoSelecionadaInput == "uber") {
    document.querySelector("#opcoes-uber").style.display = "block";
    document.querySelector("#opcoes-partida").style.display = "block";
    document.querySelector("#opcoes-destino").style.display = "block";
  } else {
    document.querySelector("#opcao-combustivel").style.display = "block";
    document.querySelector("#opcoes-partida").style.display = "block";
    document.querySelector("#opcoes-destino").style.display = "block";
  }
}
