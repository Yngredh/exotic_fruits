const listaDeItems = [listaDeFrutas[1],listaDeFrutas[8],listaDeFrutas[9],listaDeFrutas[5]];
localStorage.setItem('listaDeItensCart', listaDeItems)

const itemContainer = document.getElementById('itemsContainer');
const itemPadrao = document.getElementById('lista-item-0');
var items = listaDeItems.length;

if(listaDeItems.length==0){
    console.log("implementar algo para listas vazias")
}else{
    itemPadrao.style.cssText = 'display:block';
    atribuirInfo();
}


function atribuirInfo(){
    
    for(i=0; i<listaDeItems.length;i++){
        
        if(i==0){
            mudarChildsLista(itemPadrao,listaDeItems,0);
            calcularPreco(itemPadrao)
        }else{
            elementCloneLista = clonar(i)
            mudarChildsLista(elementCloneLista,listaDeItems,i);
            calcularPreco(elementCloneLista)
        }
    }

}

function mudarChildsLista(item,lista,indice){
    var child = item.children
    var imagem = child[0].children[0].children[0]
    var nome = child[0].children[1].children[0]
    var preco = child[0].children[1].children[1].children[1]

    alocarDados(lista,indice, imagem,nome,preco)
}

function alocarDados(lista,indice,imagem,nome,preco){
    nome.textContent = lista[indice].nome;
    imagem.src = lista[indice].imagem;
    preco.textContent = lista[indice].preco;
}

function adicionarItemAoCarrinho(elt){

    var dados = "add-list-item-" + elt.id
    dados = dados.split("-")

    var posicaoFruta = parseInt(dados[3]);
    listaDeItems.push(listaDeFrutas[posicaoFruta]);
    localStorage.setItem('listaDeItensCart',listaDeItems)

    indice = listaDeItems.length-1
    var item = clonar(indice)

    mudarChildsLista(item,listaDeItems,indice);
    calcularPreco(item)
    $("#itemsContainer").scrollTop($("#itemsContainer")[0].scrollHeight);
    
}

function clonar(indice){
    var clone = itemPadrao.cloneNode(true);
    clone.setAttribute('id', 'lista-item-'+indice);
    itemContainer.appendChild(clone);

    var qntd = document.getElementsByClassName('quantidade')
    var posicaoQtnd = qntd.length-1;
    qntd[posicaoQtnd].id = "qtnd-"+ indice;

    var botaoClose = document.getElementsByClassName('closeButton')
    var posicaoClose = botaoClose.length-1;
    botaoClose[posicaoClose].id = "close-" + indice;
    
    return elementCloneLista = document.getElementById('lista-item-'+indice);
}

function removerItem(elt){
    let dados = elt.id.split("-");
    let idItem = "lista-item-" + dados[1];

    
    document.getElementById(idItem).remove();

    var index= parseInt(dados[1])
    listaDeItems.splice(index)
    localStorage.setItem('listaDeItensCart',listaDeItems)
    let totals = document.getElementsByClassName('subprecos');
    calcularTotal(totals);
}

function calcularPreco(elt){
    let dados = elt.id.split("-");

    if(dados.length == 2){
        idItemCalculo = "lista-item-" + dados[1];
    }else{
        idItemCalculo = "lista-item-" + dados[2];
        elt.value = 1;
    }
    
    
    let item = document.getElementById(idItemCalculo);
    let precoUnidade = item.children[0].children[1].children[1].children[1].textContent;
    precoUnidade = parseFloat(precoUnidade);
    let subtotal = item.children[1].children[1].children[1];

    subtotal.textContent = (precoUnidade * elt.value).toFixed(2);

    let totals = document.getElementsByClassName('subprecos');
    calcularTotal(totals);
}

function calcularTotal(lista){
    let precoTotal = document.getElementById('precoTotal')
    let soma = 0;
    for(i=0; i<lista.length;i++){
       soma += parseFloat(lista[i].textContent)
    }

    precoTotal.textContent = soma.toFixed(2)
}