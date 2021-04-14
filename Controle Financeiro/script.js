const transacaoUl = document.querySelector('#transacao')
const displayAtual = document.querySelector('#v-atual')
const displayDespesa = document.querySelector('#v-retirado')
const displayReceita = document.querySelector('#v-adicionado')
const form = document.querySelector('#form')
const inputTransacaoNome = document.querySelector('#text')
const inputTransacaoValor = document.querySelector('#valor')


let testeTransacoes = [
    {id: 1, name:'Bolo de Brigadeiro', valor: -20},
    {id: 2, name:'Salário', valor: 400},
    {id: 3, name:'Torta', valor: -10},
    {id: 4, name:'Violão', valor: 150}
]

const localStorageTransacao = JSON.parse(localStorage
    .getItem('transacoes'))
let transacoes = localStorage
    .getItem('transacoes') !== null ? localStorageTransacao : []


const removeTransacao = ID =>{
    transacoes = transacoes.filter(transacoes =>
        transacoes.id !== ID)
        atualizarLocalStorage()
        iniciarAtualiza()
        
}

const addtransacao = transacoes => {
    const operador = transacoes.valor < 0 ? '-' : '+'
    const CSSClass = transacoes.valor < 0 ? 'menor' : 'maior'
    const valorSemOperador = Math.abs(transacoes.valor)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transacoes.name} <span>${operador} R$ ${valorSemOperador}</span>
        <button class="botao-deletar" onClick="removeTransacao(${transacoes.id})">
        x
        </button>
    `
    transacaoUl.append(li)
}

const atualizarVTotal = () =>{
  const transacaoValor = transacoes
    .map(transacoes=> transacoes.valor)
  const atual = transacaoValor
    .reduce((acumular, transacoes) => acumular + transacoes, 0)
    .toFixed(2)
  const receita = transacaoValor
    .filter(value =>value>0)
    .reduce((acumular, value) => acumular +value, 0)
    .toFixed(2)
  const despesas = Math.abs(transacaoValor
    .filter(value => value <0)
    .reduce((acumular,value) => acumular + value,0))
    .toFixed(2)

    displayAtual.textContent = `R$ ${atual}`
    displayReceita.textContent = `R$ ${receita}`
    displayDespesa.textContent = `R$ ${despesas}` 
}

const iniciarAtualiza = () => {
    transacaoUl.innerHTML = ''
    transacoes.forEach(addtransacao)
    atualizarVTotal()
}

iniciarAtualiza()


const atualizarLocalStorage = () =>{
    localStorage.setItem('transacoes', JSON.stringify(transacoes))
}

const gerarId = () => Math.round(Math.random()*1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transacaoaddNome = inputTransacaoNome.value.trim()
    const transacaoaddValor = inputTransacaoValor.value.trim()

    if(transacaoaddNome === '' || transacaoaddValor  ===''){
        alert('Por favor, preecha tanto o nome quanto o valor da transação')
        return
    }

    const transacao = {
        id: gerarId(), 
        name: transacaoaddNome, 
        valor: Number(transacaoaddValor)
    }

    transacoes.push(transacao)
    iniciarAtualiza()
    atualizarLocalStorage()

    inputTransacaoNome.value = ''
    inputTransacaoValor.value = ''
})

