/**
 Função para retornar um array de datas que estão entre duas datas;
*/
function retornaDatasEntrePeriodos(dataInicial, dataFinal) {
  let datasEntre = [];
  let dataAtual = new Date(dataInicial);
  let dataFim = new Date(dataFinal);

  if(dataAtual == "Invalid Date"){
    return 'Data inicial inválida';
  }
    
  if(dataFim == "Invalid Date"){
    return 'Data final inválida';
  }

  while (dataAtual <= dataFim) {
    datasEntre.push(dataAtual.toISOString().slice(0,10));
    dataAtual.setDate(dataAtual.getDate() + 1);
  }

  return datasEntre;
}

// Exemplo de uso ;
const dataInicial = '2023-03-10';
const dataFinal = '2023-03-13';
const datasEntrePeriodos = retornaDatasEntrePeriodos(dataInicial, dataFinal);

console.log(datasEntrePeriodos);
