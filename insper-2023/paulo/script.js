// carrega os dados
fetch('dados.json').then(response => response.json()).then(data => {

    //console.log(data.features);

    // dimensões do mapa
    const w = 600;
    const h = 600;
    const pad = 30;

    // seleciona o elemento svg e define suas dimensões
    const svg = d3.select('svg.map');
    svg.attr('width', w);
    svg.attr('height', h);
    svg.attr('viewBox', `0 0 ${w} ${h}`);

    // gera um objeto geojson correspondente à união dos distritos de SP,
    // apenas para definir o center / scale / translation da projeção de forma automática com fitExtent
    const sp = turf.combine(data);

    // define a projeção, usa o objeto geojson calculado acima para posicionar o mapa automaticamente dentro das dimensões desejadas
    // (para evitar o pesadelo de usar .center().translate().scale() )
    const proj = d3.geoTransverseMercator()
      .fitExtent([[pad, pad], [w - pad, h - pad]], sp)
    ;

    // define a função que vai pegar as coordenadas em lat/lon dos polígonos e vai transformá-las em coordenadas de desenho do SVG
    const path = d3.geoPath().projection(proj);

    // cria os elementos path para cada distrito presente nos dados
    const distritos = svg
            .selectAll("path.distrito")
            .data(data.features)
            .join("path")
            .classed('distrito', true)
            .attr("d", path);

    // acrescenta um monitor de eventos do tipo "mouseover" nos elementos <path> que foram criados
    distritos.on('mouseover', showInfo);

    function showInfo(e) { 
    // os monitores de evento (event listeners) sempre passam um argumento contendo detalhes do evento que foi disparado. 
    // por isso, sempre definimos um parämetro "e" na declaração de uma função que vai ser chamada por um monitor de eventos)
        
        // para entender o que esse argumento "e" carrega, vale dar um console.log nele e navegar um pouco pelo objeto no console...
        //console.log(e);

        // e.target é o elemento HTML em que foi disparado o evento. Na prática, é o elemento "path".
        // quando esses elementos são criados com D3, os dados associados a esse elemento "path" ficam armazenados 
        // em uma propriedade "__data__"

        const element_data = e.target.__data__;
        //console.log(element_data);

        const district_name = element_data.properties.NOME_DIST;

        // pronto, capturamos o nome do distrito. Agora vamos atualizar o conteúdo do elemento <span class="nome-distrito"> com esse nome

        // primeiro capturamos uma referência ao elemento
        const name_container = document.querySelector('span.nome-distrito');
        // agora atualizamos o seu conteúdo
        name_container.innerText = district_name;

        // agora vamos aplicar uma classe de nome "highlight" ao elemento correspondente 
        // (e remover essa classe de algum outro elemento que já a tenha)
        // (com d3, essa operação é bem mais "sintética": "distritos" é uma referência à coleção de todos os elementos path, vamos passar de um por um e testar se o nome do distrito correspondente é igual ao nome do distrito sobre o qual o mouse está (esse nome está armazenado em "district_name"))
        distritos.classed('highlight', d => d.properties.NOME_DIST == district_name);

        // no css, definimos o que essa classe faz

    }


})