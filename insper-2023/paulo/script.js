const colors = {
  "Sem favelas" : "#fff3e7",
  "Até 10%" : "#FBCAB9", 
  "Entre 10% e 20%" : "#FD9E7B", 
  "Entre 20% e 30%" : "#FF723D", 
  "Acima de 30%" : "orangered"
}

// funçãozinha para formatar os valores numéricos para um formato mais apresentável, com separador de milhar etc.
function format(n) {
  if (n == null) return 0;
  return new Intl.NumberFormat("pt-BR", { style: 'decimal' }).format(n)
}

function make_color_legend() {

  const cats = Object.keys(colors);

  const leg = document.querySelector('.legenda');

  cats.forEach(cat => {

    const new_cat_container = document.createElement('div');
    new_cat_container.classList.add('color-container');

    const new_color_key = document.createElement('span');
    new_color_key.classList.add('color-key');
    new_color_key.style.backgroundColor = colors[cat];

    const new_color_label = document.createElement('span');
    new_color_label.classList.add('color-label');
    new_color_label.innerText = cat;

    new_cat_container.appendChild(new_color_key);
    new_cat_container.appendChild(new_color_label);

    leg.appendChild(new_cat_container);

  })

}

make_color_legend();

// carrega os dados
Promise.all([

  fetch('dados_distritos.json').then(response => response.json()),
  fetch('dados_municipio.json').then(response => response.json())

]).then( files => {

  // dimensões do mapa
  //const w = 600;
  //const h = 600;

  // dados dos distritos propriamente ditos
  const data = files[0];
  console.log(data);

  // uma margem para o mapa
  const pad = 10;

  // seleciona o elemento svg
  const svg = d3.select('svg.map');

  // capturamos as dimensoes do svg calculadas pelo browser
  const wpx = svg.style('width');
  const hpx = svg.style('height');
  console.log(wpx,hpx);

  // só para remover os "px" das dimensões que capturamos
  const w = +wpx.slice(0,-2);
  const h = +hpx.slice(0,-2);

  // define os atributos do svg com base nessas dimensões
  svg.attr('width', w);
  svg.attr('height', h);
  svg.attr('viewBox', `0 0 ${w} ${h}`);

  // gera um objeto geojson correspondente à união dos distritos de SP,
  // apenas para definir o center / scale / translation da projeção de forma automática com fitExtent
  //const sp = turf.combine(data);

  // o segundo arquivo é só um polígono do município de SP, para ser usado para centralizar e definir a escala ideal da projeção do mapa
  const sp = files[1]; 

  // define a projeção, usa o polígono acima para posicionar o mapa automaticamente dentro das dimensões desejadas
  // (para evitar o pesadelo de usar .center().translate().scale() )
  const proj = d3.geoMercator()
    .fitExtent([[pad, pad], [w - pad, h - pad]], sp)
  ;

  // define a função que vai pegar as coordenadas lat/lon dos polígonos e vai transformá-las em coordenadas de desenho do SVG
  const path = d3.geoPath().projection(proj);

  // cria os elementos path para cada distrito presente nos dados
  const distritos = svg
          .selectAll("path.distrito")
          .data(data.features)
          .join("path")
          .classed('distrito', true)
          .attr("d", path)
          .attr('fill', d => colors[d.properties.cat]);

  // acrescenta um monitor de eventos do tipo "mouseover" nos elementos <path> que foram criados
  distritos.on('mouseover', showInfo);

  function showInfo(e, element_data) {

    // os monitores de evento (event listeners) sempre passam um argumento contendo detalhes do evento que foi disparado. 
    // por isso, sempre definimos um parämetro "e" na declaração de uma função que vai ser chamada por um monitor de eventos)
    // para entender o que esse argumento "e" carrega, vale dar um console.log nele e navegar um pouco pelo objeto no console...
    //console.log(e);

    // como estamos usando o monitor de eventos do d3 (o ".on"), além de um parâmetro "e", é possível passar um segundo parâmetro que representa o dado que foi "amarrado" ao elemento que disparou o evento. Aqui, chamei de "element_data"

    // a alternativa seria recuperar o dado a partir do atributo "e".
    // e.target é o elemento HTML em que foi disparado o evento. Na prática, é o elemento "path".
    // quando esses elementos são criados com D3, os dados associados a esse elemento "path" ficam armazenados 
    // em uma propriedade "__data__"

    // então poderíamos buscar o "element_data" assim:
    // const element_data = e.target.__data__;
    // ou 
    // const element_data = d3.select(e.target).datum();

    const district_name = element_data.properties.regiao;

    // pronto, capturamos o nome do distrito. Agora vamos atualizar o conteúdo do elemento <span class="nome-distrito"> com esse nome

    // primeiro geramos uma referência ao elemento
    const name_container = document.querySelector('span.nome-distrito');
    // agora atualizamos o conteúdo do elemento
    name_container.innerText = district_name;

    // mesma coisa para o texto com dados
    const texto_el = document.querySelector('span.dados-distrito');
    const ndf = element_data.properties.ndf;
    const ndp = element_data.properties.ndp;
    const pct = element_data.properties.pct;

    let texto;

    if (ndf == 0) texto = 'não possui favelas.';
    else {
      texto = `possui <strong>${format(ndf)}</strong> favelas de um total de <strong>${format(ndp)}</strong> domicílios, o que representa um percentual de <strong>${format(pct)}%</strong>.`
    }

    texto_el.innerHTML = texto;
    

    // agora vamos aplicar uma classe de nome "highlight" ao elemento correspondente 
    // (e remover essa classe de algum outro elemento que já a tenha)
    // (com d3, essa operação é bem mais "sintética": "distritos" é uma referência à coleção de todos os elementos path, vamos passar de um por um e testar se o nome do distrito correspondente é igual ao nome do distrito sobre o qual o mouse está (esse nome está armazenado em "district_name"))
    distritos.classed('highlight', d => d.properties.regiao == district_name);

    // no css, definimos o efeito que essa classe provoca!

  }

})