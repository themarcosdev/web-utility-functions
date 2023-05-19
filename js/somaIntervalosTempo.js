/**
  Função para somar e retornar o tempo em segundos entre intervalos de tempo ;
*/
function somarIntervalosDeTempo(...intervalos) {
  let tempoTotal = 0;

  for (let i = 0; i < intervalos.length; i++) {
    let [inicio, fim] = intervalos[i];
    let dataInicio = new Date(inicio);
    let dataFim = new Date(fim);
    let diferenca = dataFim - dataInicio;
    tempoTotal += diferenca;
  }
  // retorna o tempo total em segundos
  return tempoTotal / 1000; 
}

let intervalos = [
  ['2023-05-18 21:16:05', '2023-05-18 21:16:09'],
  ['2023-05-18 21:17:13', '2023-05-18 21:16:29']
];

let exemploTempoTotal = somarIntervalosDeTempo(...intervalos);
console.log(exemploTempoTotal); // 20 segundos 
