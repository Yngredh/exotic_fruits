
var lista = []
var listaNomes = []
function adicionarAoCarrinhoShop(elt){
    var box = elt.parentElement;
    var nome = box.children[1].textContent.toLowerCase();

    var obtive= obterItem(nome)
    
    if(obtive){
        listaNomes.push(lista[lista.length-1].nome.toLowerCase())
        console.log(listaNomes)
        localStorage.setItem('listaDeItensCart', listaNomes)
        console.log(localStorage.getItem('listaDeItensCart'))
    }else{
        console.log('Fruta não encontrada')
    }

}

function obterItem(nome){
    for(i=0; i<listaDeFrutas.length;i++){
        if(listaDeFrutas[i].nome.toLowerCase() == nome){
            var fruta = listaDeFrutas[i];
            console.log(fruta)
            lista.push(fruta)
            return true
            
        }
    }
    return false
}