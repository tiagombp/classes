const selectRegion = document.querySelector('#seletor-regioes');

let regiao_selecionada = selectRegion.value;
localStorage.setItem('regiao_selecionada', regiao_selecionada);

console.log(regiao_selecionada);

selectRegion.addEventListener('change', function(e) {

    regiao_selecionada = selectRegion.value;
    localStorage.setItem('regiao_selecionada', regiao_selecionada);
    
    console.log(regiao_selecionada);

})