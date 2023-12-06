// carrega os dados
Promise.all([

  fetch('mun-data-very-simp.json').then(response => response.json()),
  fetch('map-br.json').then(response => response.json())

]).then( files => {

  // dimensões do mapa
  //const w = 600;
  //const h = 600;

  // dados dos municipios 
  const data = files[0];

  // dados do Brasil
  const br = files[1];

  console.log(data, br);

  // seleciona o elemento svg em que o mapa será desenhado
  const svg = d3.select('svg.map');

  // pega a largura do container do mapa (vai ser necessário para o tooltip)

  // capturamos as dimensoes do svg calculadas pelo browser
  const wpx = svg.style('width');
  const hpx = svg.style('height');
  console.log('Dimensões capturadas', wpx,hpx);

  // só para remover os "px" das dimensões que capturamos
  const w = +wpx.slice(0,-2);
  const h = +hpx.slice(0,-2);
  console.log('Dimensoes em formato numérico', w, h)

  // atualiza variável do css que define a largura do tooltip
  if (w < 600) {
    document.documentElement.style.setProperty('--largura-tt', w / 2 - 10 + 'px');
  }

  // define os atributos do svg com base nessas dimensões
  svg.attr('width', w);
  svg.attr('height', h);
  svg.attr('viewBox', `0 0 ${w} ${h}`)

  // uma margenzinha para o mapa
  const pad = 10;

  // o segundo arquivo, que armazenamos na variável "br" é só um polígono do Brasil inteiro, para ser usado para centralizar e definir a escala ideal da projeção do mapa
  // define a projeção, com base nas dimensões desejadas, e usa o polígono mencionado acima para posicionar o mapa automaticamente dentro das dimensões desejadas
  // (para evitar o pesadelo de usar .center().translate().scale() )
  const proj = d3.geoMercator()
    .fitExtent([[pad, pad], [w - pad, h - pad]], br)
  ;

  // define a função que vai converter as coordenadas lat/lon dos polígonos em coordenadas de desenho do SVG
  const gerador_path = d3.geoPath().projection(proj);

  // cria os elementos path para cada municipio presente nos dados
  const municipios = svg
          .selectAll("path.municipio") // esse é o padrao do D3, precisa começar com uma seleção, ainda que vazia, já que ainda não existe nenhum elemento "path"
          .data(data.features) // aqui definimos de onde vêm os dados que serão associados aos elementos "path" que serão criados
          .join("path") // na prática, este comando cria um elemento "path" para elemento na lista de dados (ou seja, para cada linha do dataframe)
          .classed('municipio', true) // acrescentamos uma classe aos elementos criados, para ficar mais fácil fazer referências a eles depois
          .attr("d", gerador_path) // o principal atributo do elemento "path" de um svg é o atributo "d", que são como instruções de desenhos ("mova o cursor para o ponto (x,y), desenhe uma linha até o ponto (x1,y1)" etc.) esse atributo vai ser gerado pela função "gerador_path" que definimos acima, convertendo as coordenadas geográficas presentes em cada linha do dataframe (ou elemento da lista de dados), em instruções de desenho
          .attr("fill", d => d3.schemeBlues[7][d.properties.FEMININO])
  ;

  // acrescenta um monitor de eventos do tipo "mouseover" nos elementos <path> que foram criados
  
  municipios.on('mouseover', showInfo);

  function showInfo(e, element_data) {

    // os monitores de evento (event listeners) sempre passam um argumento contendo detalhes do evento que foi disparado. 
    // por isso, sempre definimos um parämetro "e" na declaração de uma função que vai ser chamada por um monitor de eventos)
    // para entender o que esse argumento "e" carrega, vale dar um console.log nele e navegar um pouco pelo objeto no console...
    //console.log(e);

    // como estamos usando o monitor de eventos do d3 (o método ".on", chamado no objeto "municipios"), além de um parâmetro "e", é possível passar um segundo parâmetro que representa o dado que se encontra "amarrado" ao elemento que disparou o evento. Aqui, chamei de "element_data"

    // a alternativa seria recuperar o dado a partir do atributo "e".
    // e.target é o elemento HTML em que foi disparado o evento. Na prática, é o elemento "path".
    // quando esses elementos são criados com D3, os dados associados a esse elemento "path" ficam armazenados 
    // em uma propriedade "__data__"

    // então poderíamos buscar o "element_data" assim:
    // const element_data = e.target.__data__;
    // ou 
    // const element_data = d3.select(e.target).datum();

    const nome_municipio = element_data.properties.name_muni + ` (${element_data.properties.abbrev_state})`; // "name_muni" é a coluna onde está armazenado o nome do município nesse meu arquivo de dados, e "abbrev_state" contém a sigla do estado (estou usando os dois por conta dos municípios homônimos)

    const qde_prefeitas = element_data.properties.FEMININO; // 'FEMININO' é a coluna com o número de prefeitas eleitas

    let msg;

    if (qde_prefeitas == null) msg = 'Sem informação';
    else if (qde_prefeitas == 0) msg = 'O município nunca elegeu uma prefeita';
    else if (qde_prefeitas == 1) msg = 'Apenas uma mulher foi eleita prefeita no município:';
    else msg = `Mulheres foram eleitas prefeitas em ${qde_prefeitas} ocasiões:`;

    let lista_prefeitas;
    if (qde_prefeitas >= 1) {

      lista_prefeitas = element_data.properties.lista_nome_prefeitas.split(';'); // converte a lista com os nomes das prefeitas eleitas, que está armazenada como uma string na coluna "lista_nome_prefeitas", em um array

    }

    // pronto, capturamos as informações de que precisamos para montar a caixinha de informação. Agora vamos atualizar o conteúdo do html com essas informaçoes.

    // primeiro geramos uma referência ao elemento que vai mostrar o nome do município
    const elemento_nome = document.querySelector('.nome-municipio');
    // agora atualizamos o conteúdo do elemento
    elemento_nome.innerText = nome_municipio;

    // agora geramos uma referência ao elemento que vai mostrar uma mensagem com uma síntese da quantidade de prefeitas
    const elemento_msg = document.querySelector('.sumario-municipio');
    // agora atualizamos o conteúdo do elemento
    elemento_msg.innerText = msg;

    // agora, caso a quantidade seja maior do 0, vamos incluir uma lista com os nomes das prefeiras
    // capturamos uma referência para o container, um elemento de lista (<ul>)
    const container_lista_nome = document.querySelector('.lista-prefeitas');

    // primeiro esvaziamos esse elemento (ele pode já estar preenchido de uma outra seleção)
    container_lista_nome.innerHTML = '';

    // se pelo menos uma prefeita foi eleita...
    if (qde_prefeitas >= 1) {

      lista_prefeitas.forEach(prefeita => { // vamos iterar sobre a array que contem a lista de prefeitas

        // para cada prefeita, vamos criar um elemento do tipo item de lista <li>
        const li = document.createElement('li');
        // alimentamos seu conteúdo com o nome da prefeita
        li.innerText = prefeita;
        // adicionamos o elemento à lista de nomes
        container_lista_nome.appendChild(li);
      })

    }

    // agora mostramos a tooltip (ela fica escondida por padrão)
    const tt = document.querySelector('.texto-tooltip');
    tt.classList.remove('hidden');

    // agora definimos a posição
    // a variável "e" traz informações sobre a posição do mouse
    console.log(e);

    const x = e.offsetX;
    const y = e.offsetY;

    if (x < w / 2) {
      tt.style.left = x + 10 + 'px';
      tt.style.right = '';
    } else {
      tt.style.right = w - x + 10 + 'px';
      tt.style.left = '';
    }

    if (y < h / 2) {
      tt.style.top = y + 10 + 'px';
      tt.style.bottom = '';
    } else {
      tt.style.bottom = h - y + 10 + 'px';
      tt.style.top = '';
    }
    
    
    // agora vamos aplicar uma classe de nome "highlight" ao elemento correspondente 
    // (e remover essa classe de algum outro elemento que já a tenha)
    // (com d3, essa operação é bem mais "sintética": "municipios" é uma referência ao objeto que contem a coleção de todos os elementos path, vamos passar de um por um e testar se o nome do municipio correspondente é igual ao nome do municipio sobre o qual o mouse está (esse nome está armazenado em "nome_municipio"))
    municipios.classed('highlight', d => d.properties.name_muni + ` (${d.properties.abbrev_state})` == nome_municipio);
    // e, no css, definimos o efeito que essa classe provoca!

  }

})

// legenda

function faz_a_legenda() {

  const valores_feminino = [0, 1, 2, 3, 4, 5, 6];

  const leg = document.querySelector('.legenda');

  valores_feminino.forEach(feminino => {

    const new_cat_container = document.createElement('div');
    new_cat_container.classList.add('color-container');
    new_cat_container.dataset.category = feminino;

    const new_color_key = document.createElement('span');
    new_color_key.classList.add('color-key');
    new_color_key.style.backgroundColor = d3.schemeBlues[7][feminino];

    const new_color_label = document.createElement('span');
    new_color_label.classList.add('color-label');
    new_color_label.innerText = feminino;

    new_cat_container.appendChild(new_color_key);
    new_cat_container.appendChild(new_color_label);

    leg.appendChild(new_cat_container);

  })

}

faz_a_legenda();