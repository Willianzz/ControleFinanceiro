const inputTransacaoNome = document.querySelector('#usuario')
const inputTransacaoValor = document.querySelector('#password')

const form = document.getElementById("form-cadastro");
const usuario = document.getElementById("usuario");
const senha = document.getElementById("password");


const localStorageCadastro = JSON.parse(localStorage
    .getItem('dados'))
let dados = localStorage
.getItem('dados') !== null ? localStorageCadastro : []

const atualizarLocalStorage = () =>{
    localStorage.setItem('dados', JSON.stringify(dados))
}

const gerarId = () => Math.round(Math.random()*1000)

form.addEventListener('submit',event => {
    event.preventDefault();

    if(inputTransacaoNome.value=== '' || inputTransacaoValor.value ===''){
        alert('Por favor, preecha tanto o nome quanto o valor da transação')
    }else{
        alert("Cadastrado com sucesso!")
    }

    const login = {
        id: gerarId(), 
        username: inputTransacaoNome.value, 
        pass: Number(inputTransacaoValor.value)
    }

    dados.push(login)
    atualizarLocalStorage();

    inputTransacaoNome.value = ''
    inputTransacaoValor.value = ''
})