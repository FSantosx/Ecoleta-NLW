// procura todos os elementos descritos no parametro
// document.querySelectorAll("form input")

// procura apenas o primeiro elemento descrito no parametro
// document.querySelectorAll("form input")

//Dados da Entidade 
// usando a api para popular os Estados 
function populateUFs () {
  let ufSelect = document.querySelector("select[name=uf]")
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( (res) => {return res.json() }) 
  // pode-se fazer desta maneira também
  // then(res => res.json())
  // quando se há apenas um parametro pode-se ocultar-se os parenteses da arrow
  // function e os colchetes da função
  .then( states => {
    for( let state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}


function getCities (event) {
  // substituindo o ID pelo estado exibido na url
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text
  // ---- fim

  // usando a api para popular as cidades 
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  citySelect.innerHTML = "<option value> Selecione a Cidade </option>"
  citySelect.disabled = true
  fetch(url)
  .then( (res) => {return res.json() }) 
  .then( cities => {
    for( const city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
    citySelect.disabled = false
  })
}

// fim dados da entidade -------------

populateUFs()
// apos a finalização desta função "populateUFs" e o usuário estiver escolhido
// o estado, o objeto .addEventListener(), ira iniciar a proxima função,
// passa-se a função sem os () para que não execute junto a primeira função


document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

//Itens de coleta
//pegar todos os Li's
let itemsToCollect = document.querySelectorAll(".items-grid li")

for (let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []

let collectedItems = document.querySelector("input[name=items]")
function handleSelectedItem (event) {
  // adicionar ou remover uma classe no HTML com JS
  let itemLi = event.target
  itemLi.classList.toggle("selected")
  
  // console.log(event.target.dataset.id)
  let itemId = itemLi.dataset.id

  // verificando se existe itens selecionados, se sim, pegar os itens seleciona-
  // dos 
  let alredySelected = selectedItems.findIndex( item => item == itemId )
  // fim verificação ----------------------------------------------------------- 

  // se ja estiver selecionado, tirar da selecao
  if( alredySelected >= 0) {
    // tirar da seleção
    let filteredItems = selectedItems.filter( item => {
      let itemIsDiferrent = item != itemId // false
      return itemIsDiferrent
    })

    selectedItems = filteredItems
  } 
  // fim "se ja estiver selecionado" -------------------------------------------
  // se não estiver selecionado, adicionar à selecao
  else {
    selectedItems.push(itemId)
  }
  // fim
  // Atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems
}








// fim itens de coleta
