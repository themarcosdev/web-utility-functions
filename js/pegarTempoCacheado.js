/**
    @example : pegarTempoCacheado('http://127.0.0.1/site/sistema/js/arquivo_pagina.js') ;
*/
function pegarTempoCacheado(pathRecurso) {
    let retorno = {} ;

    if (window.performance) {
      // Obtém todas as entradas de recursos com o nome "script.js, css ... "
      const entries = performance.getEntriesByName(pathRecurso);
    
      // Verifica se há alguma entrada encontrada
      if (entries.length > 0) {
        // Obtém o tempo de resposta da última entrada encontrada
        const responseEnd = entries[entries.length - 1].responseEnd;
    
        // Calcula o tempo de cache em segundos
        const cacheTime = Math.round((performance.now() - responseEnd) / 1000);

        retorno.status = 200 ;
        retorno.time = cacheTime ;
        retorno.msg = (`O arquivo ${pathRecurso} está em cache há ${cacheTime} segundos.`);
      } else {
        retorno.status = 404 ;
        retorno.time = null ;
        retorno.msg = (`O arquivo ${pathRecurso} não foi encontrado em cache.`);
      }
    } else {
      retorno.status = 401 ;
      retorno.time = null ;
      retorno.msg = ('O objeto Performance não é suportado neste navegador.');
    }

    return retorno ;
}
