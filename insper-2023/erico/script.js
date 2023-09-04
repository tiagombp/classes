// carrega os dados
fetch('estados.json').then(response => response.json()).then(data => {

    console.log(data.features, data);

    // dimensões do mapa
    const w = 600;
    const h = 600;
    const pad = 30;

    // seleciona o elemento svg e define suas dimensões
    const svg = d3.select('svg.chart');
    svg.attr('width', w);
    svg.attr('height', h);
    svg.attr('viewBox', `0 0 ${w} ${h}`);

    // gera um objeto geojson correspondente à união dos distritos de SP,
    // apenas para definir o center / scale / translation da projeção de forma automática com fitExtent
    const br = turf.combine(data);

    console.log(br);

    // define a projeção, usa o objeto geojson calculado acima para posicionar o mapa automaticamente dentro das dimensões desejadas
    // (para evitar o pesadelo de usar .center().translate().scale() )
    const proj = d3.geoMercator()
      .fitExtent([[pad, pad], [w - pad, h - pad]], br)
      //.center([-55, -15])
      //.rotate([10, 0])
      //.scale(650)
      //.translate([w / 2, h / 2])
    ;

    // define a função que vai pegar as coordenadas em lat/lon dos polígonos e vai transformá-las em coordenadas de desenho do SVG
    const path = d3.geoPath().projection(proj);

    // cria os elementos path para cada distrito presente nos dados
    const estados = svg
            .selectAll("path.estado")
            .data(data.features)
            .join("path")
            .classed('estado', true)
            .attr("d", path);

    // acrescenta um monitor de eventos do tipo "mouseover" nos elementos <path> que foram criados
    // note que estamos usando o método do d3 (.on) aplicado a um objeto do d3 do tipo selection. 
    // Mas é semelhante ao método ".addEventListener" aplicado a um objeto do JS
    estados.on('mouseover', showInfo);

    function showInfo(e) { 
    // os monitores de evento (event listeners) sempre passam um argumento contendo detalhes do evento que foi disparado. 
    // por isso, sempre definimos um parämetro "e" na declaração de uma função que vai ser chamada por um monitor de eventos)
        
        // para entender o que esse argumento "e" carrega, vale dar um console.log nele e navegar um pouco pelo objeto no console...
        //console.log(e);

        // e.target é o elemento HTML em que foi disparado o evento. Na prática, é o elemento "path".
        // quando esses elementos são criados com D3, os dados associados a esse elemento "path" ficam armazenados 
        // em uma propriedade "__data__"

        const element_data = e.target.__data__;
        //console.log(d3.select(e.target).datum())
        //console.log(element_data);

        const state_name = element_data.properties.name_state;

        // pronto, capturamos o nome do estado. Agora vamos atualizar o conteúdo do elemento <span class="nome-distrito"> com esse nome

        // primeiro capturamos uma referência ao elemento
        const name_container = document.querySelector('span.nome-estado');
        // agora atualizamos o seu conteúdo
        name_container.innerText = state_name;

        // agora vamos aplicar uma classe de nome "highlight" ao elemento correspondente 
        // (e remover essa classe de algum outro elemento que já a tenha)
        // (com d3, essa operação é bem mais "sintética": "estados" é uma referência à coleção de todos os elementos path, vamos passar de um por um e testar se o nome do distrito correspondente é igual ao nome do distrito sobre o qual o mouse está (esse nome está armazenado em "state_name"))
        estados.classed('highlight', d => d.properties.name_state == state_name);

        // no css, definimos o que essa classe faz

    }


})