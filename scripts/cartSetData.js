
const dropdownLista = document.getElementsByClassName("dropdown");
const linhaLista = document.getElementById("option2")
const buttonOpenList = document.getElementById("openList");
const listaPadrao = document.getElementById("selecionarFrutas");
var verificar = false;

function controlarDropdown(){
    let dropdown = dropdownLista[0].style;
    let linha = linhaLista.style;
    console.log(status)
    if(linha.display == '' || linha.display == 'none'){
        
        if(!verificar){
            aparecerLista();
            atribuirItensALista();
        }else{
            aparecerLista();
        }
        
    }else{
        removerLista(dropdown,linha);
    }
}

function aparecerLista(){
    console.log(dropdownLista)
    dropdownLista[0].style.cssText= 'display:flex;';
    linhaLista.style.cssText= 'display:block;';
    listaPadrao.style.cssText = 'overflow-y:scroll';
    verificar = true;
}

function removerLista(dropdown, linha){
    dropdown.cssText = 'display: none';
    linha.cssText = 'display: none';
    listaPadrao.style.cssText = 'overflow-y:hidden';
}

function atribuirItensALista(){
    var button = document.getElementsByClassName('itemAddButton')


    for(i=0; i<listaDeFrutas.length; i++){

        if(i==0){
            var model = document.getElementById("add-lista-item-0");
            mudarChilds(model,listaDeFrutas,i)
        }else{
            var clone = dropdownLista[0].cloneNode(true);
    
            clone.setAttribute('id', 'add-lista-item-'+i);
            linhaLista.appendChild(clone);
            var elementClone =document.getElementById('add-lista-item-'+i)
        
            var posicao = button.length-1
            button[posicao].id = i;

            if(listaDeFrutas[i] != '' && listaDeFrutas[i] != null){
                mudarChilds(elementClone,listaDeFrutas,i);
            }
        }

        
    }
    
}

function atribuirDados(lista, imagem, nome,preco, indice){
    nome.textContent = lista[indice].nome;
    imagem.src = lista[indice].imagem;
    preco.textContent = lista[indice].preco;
}

function mudarChilds(item,lista,indice){
    var childs = item.children[0].children
    var imagem = childs[0]
    var nome = childs[1].children[0]
    var preco = childs[1].children[1].children[1]

    atribuirDados(lista,imagem,nome,preco,indice)
}