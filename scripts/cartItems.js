var listaDeItems = receberItems()
console.log(listaDeItems)

const itemContainer = document.getElementById('itensContainer');
const itemPadrao = document.getElementById('lista-item-0');

if(listaDeItems.length==0){
    console.log("implementar algo para listas vazias")
}else{
    itemPadrao.style.cssText = 'display:block';
    atribuirInfo();
}


function atribuirInfo(){
    
    for(var i=0; i<listaDeItems.length;i++){
        console.log(i)
        if(i==0){
            
            mudarChildsLista(itemPadrao,listaDeItems,0);
            calcularPreco(itemPadrao)
        }else{
            console.log("Ai é foda")
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
    let fruta = listaDeFrutas[posicaoFruta]
    console.log(fruta)
    console.log(listaDeItems)
    if(!listaDeItems.includes(fruta)){
        listaDeItems.push(fruta);
        adicionarItensLocal(listaDeFrutas[posicaoFruta].nome)
        indice = listaDeItems.length-1
        var item = clonar(indice)

        mudarChildsLista(item,listaDeItems,indice);
        calcularPreco(item)
        $("#itensContainer").scrollTop($("#itensContainer")[0].scrollHeight);
    }else{
        console.log("Mensagem ao usuário que a fruta já está adicionada.")
    }
    
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
    console.log(index)
    if(listaDeItems.length != 0){
        console.log(listaDeItems)
        var nome = listaDeItems[index].nome
        listaDeItems.splice(index,1)
        removerItensLocal(nome)
    }
    console.log(listaDeItems)
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
    for(var i=0; i<lista.length;i++){
       soma += parseFloat(lista[i].textContent)
    }

    precoTotal.textContent = soma.toFixed(2)
}

function receberItems(){
    let nomes = localStorage.getItem('listaDeItensCart').split(",")
    let listaDeItems = []
    console.log(nomes)
    for(var i=0; i<nomes.length;i++){
        let nome = nomes[i]
        for(j=0; j< listaDeFrutas.length; j++){
            console.log(nome)
            var frutaNome = listaDeFrutas[j].nome.toLowerCase().replace(/\s/g, '')
            var fruta = listaDeFrutas[j];
            if(frutaNome == nome){
                if(!listaDeItems.includes(fruta)){
                    console.log("Passei do if")
                    console.log(fruta)
                    listaDeItems.push(fruta)

                }
            }
        }     
    }
    console.log(listaDeItems)
    return listaDeItems
}

function removerItensLocal(nome){
    var listaQueVem= localStorage.getItem('listaDeItensCart').split(',')
    var index=  listaQueVem.indexOf(nome.toLowerCase().replace(/\s/g, ''))
    listaQueVem.splice(index,1)
    console.log(nome)
    localStorage.setItem('listaDeItensCart',listaQueVem)
    console.log(listaQueVem)
}
function adicionarItensLocal(nome){
    console.log("Olha só")
    var listaQueVem= localStorage.getItem('listaDeItensCart').split(',')
    listaQueVem.push(nome.toLowerCase().replace(/\s/g, ''))
    localStorage.setItem('listaDeItensCart',listaQueVem)
    console.log(listaQueVem)
}