// const xx = document.body;
// const xy = document.createElement('li');
// xy.innerText = "testeee";
// xx.appendChild(xy);



var nomeLembrete = document.getElementById('nomeLembrete');
var dataLembrete = document.getElementById('data');
var formNovoEvento = document.getElementById('formNovoEvento');
var clickBotao = document.getElementById('buttonNovoEvento');
var botaoCancelar = document.getElementById('buttonCancelar');
var tabelaEventos = document.getElementById('tabelaEventos');
var divMensagemErro = document.getElementById('mensagemErro');
var containerModal = document.querySelector('[data-modal="container"]');
var listaEventos = [];



clickBotao.addEventListener('click', newEvent);
formNovoEvento.addEventListener('submit', salvarNovoEvento);
window.addEventListener('load', atualizarTabela);

function newEvent(){
   containerModal.classList.add('ativo');
}
function limparNovoEvento(){
  dataLembrete.classList.remove('is-invalid');
  nomeLembrete.classList.remove('is-invalid');
  divMensagemErro.classList.add('d-none');
  nomeLembrete.value = null;
  dataLembrete.value = null
}

function removerEvento(event){
  var posicao = event.target.getAttribute('data-evento');
  listaEventos.splice(posicao, 1);    // vc passa a posicao e o numero de eventos que quer excluir nela 
  atualizarTabela();
}

function atualizarTabela(){
  if(listaEventos.length === 0){
     tabelaEventos.innerHTML = '<tr><td> Nenhum evento </td></tr>';
     return;
  }

  tabelaEventos.innerHTML = '';
  for(var i = 0; i < listaEventos.length; i++){
    var evento = listaEventos[i];
    var linha = document.createElement('tr');
    var celulaNome = document.createElement('td');
    var celulaData = document.createElement('td');
    var celulaAcoes = document.createElement('td');
    var br = document.createElement('br');
    var botaoExcluir = document.createElement('button');

    botaoExcluir.setAttribute('data-evento', i);
    botaoExcluir.classList.add('btn');
    botaoExcluir.classList.add('btn-danger');
    botaoExcluir.addEventListener('click', removerEvento);

    celulaNome.innerText = evento.nome;
    celulaData.innerText = evento.data;
    botaoExcluir.innerText = "Remover";
    celulaAcoes.appendChild(botaoExcluir);

    linha.appendChild(celulaNome);
    linha.appendChild(celulaData);
    linha.appendChild(celulaAcoes);
    linha.appendChild(br);
    tabelaEventos.appendChild(linha);
  }
}


function novoEventoValido(nomeEvento, dataEvento){

  var validacao = true;
  var erro = '';
  
  if(nomeEvento.trim().length === 0){
    nomeLembrete.classList.add('is-invalid');
    erro = "O nome do evento é obrigatório!";
    validacao = false;
  }else{
    nomeLembrete.classList.remove('is-invalid');
  }

  var TimeStamp = Date.parse(dataEvento);
  var TimeStampAtual = (new Date()).getTime();

  if(isNaN(TimeStamp) || TimeStamp < TimeStampAtual){
    if(erro.length > 0){
      erro += '<br>';
    }
    dataLembrete.classList.add('is-invalid');
    erro += "A data do evento é obrigatória e deve estar no futuro!";
    validacao = false;
  }
  else{
    dataLembrete.classList.remove('is-invalid');
  }

  if(!validacao){
     divMensagemErro.classList.remove('d-none');
     divMensagemErro.innerHTML = erro;
  }else{
    divMensagemErro.classList.add('d-none');
  }
  return validacao;
}

function salvarNovoEvento(event){
  event.preventDefault();
  var nomeEvento = nomeLembrete.value;
  var dataEvento = new Date(dataLembrete.value);
  
  if(novoEventoValido(nomeEvento, dataEvento)){
    console.log('Evento é válido');  
      listaEventos.push({
      nome: nomeEvento,
      data: new Date(dataEvento),
    })
    atualizarTabela();
    limparNovoEvento();
    containerModal.classList.remove('ativo');
  }
  else{
    console.log('Evento não é válido');
  }
}





// FUNCIONALIDADE MODAL


function initModal(){
  
//  const abrir = document.querySelector('[data-modal="abrir"]');
  const fechar = document.querySelector('[data-modal="fechar"]');
  const containerModal = document.querySelector('[data-modal="container"]');
  //var btn = document.querySelector('.btn');
  
  
    if(fechar && containerModal){

      function toggleModal(event){
        limparNovoEvento();
        event.preventDefault();
        containerModal.classList.toggle('ativo');
        
      }

      function cliqueForaModal(event){

        if(event.target === this){
          // event.target pega o local do html q estamos clicando
        // this é a section q esta em volta do modal
          limparNovoEvento();
          toggleModal(event);
          
        }
      }

      //abrir.addEventListener('click', toggleModal);
      fechar.addEventListener('click', toggleModal);
      containerModal.addEventListener('click', cliqueForaModal);
      // btn.addEventListener('click', toggleModal);
  }
}
initModal();





