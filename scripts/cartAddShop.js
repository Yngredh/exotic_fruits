
var lista = []
var listaNomes = []
function adicionarAoCarrinhoShop(elt){
    var box = elt.parentElement;
    var nome = box.children[1].textContent.toLowerCase().replace(/\s/g, '');

    console.log(nome)
    var obtive= obterItem(nome)
    
    if(obtive){
        var fruta = lista[lista.length-1]
        console.log(lista)
        if(localStorage.listaDeItensCart == undefined){
            listaNomes.push(fruta.nome.toLowerCase().replace(/\s/g, ''))
            localStorage.setItem('listaDeItensCart', listaNomes)
        }else{
            var listaQueVem= localStorage.getItem('listaDeItensCart').split(',')
            console.log(listaQueVem)
            listaNomes = listaQueVem
            console.log(listaNomes)
            listaNomes.push(fruta.nome.toLowerCase().replace(/\s/g, ''))
            console.log(listaNomes)
            localStorage.setItem('listaDeItensCart', listaNomes)
            listaQueVem= localStorage.getItem('listaDeItensCart').split(",")
            console.log(listaQueVem);
        }
        
    }else{
        console.log('Fruta não encontrada')
    }

}

function obterItem(nome){
    for(i=0; i<listaDeFrutas.length;i++){
        if(listaDeFrutas[i].nome.toLowerCase().replace(/\s/g, '') == nome){
            if(!lista.includes(listaDeFrutas[i])){
                var fruta = listaDeFrutas[i];
                console.log(fruta)
                lista.push(fruta)
                return true
            }else{
                console.log("Já tem essa no carrinho")
            }
        }
        var fruta = listaDeFrutas[i];
        console.log(fruta)
    }
    return false
}