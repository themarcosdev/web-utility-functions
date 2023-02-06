<?php
  error_reporting(0);
  // Alterando X-Powered-By para ASP.NET - (teste*) ;
  header("X-Powered-By: ASP.NET");
  // Fechando conexão ;
  header('Connection: close');

  /** Função para pegar os dados do browser de quem está efetuando uma requisição ou dados devolvidos pelo servidor   */
  function exploraRequest($param){
    $paramsValidos = array("dados_do_browser","dados_do_server","browser");

    if(!in_array($param,$paramsValidos)){
      return "Informe um retorno válido";
    }

    $dados_receb_do_browser = apache_request_headers();

    $dados_enviados_ao_browser = apache_response_headers();

    /* Detecta no Desktop : Google Chrome e Edge ; Mozila : no_chromium */
    $browser = explode(",",$dados_receb_do_browser['sec-ch-ua'])[1] ? explode(",",$dados_receb_do_browser['sec-ch-ua'])[1] : 'Mozilla' ;

    switch ($param){
      case($paramsValidos[0]):
        $retorno = $dados_receb_do_browser ;
        break;
      case($paramsValidos[1]):
        $retorno = $dados_enviados_ao_browser ;
        break;
      case($paramsValidos[2]):
        $retorno = $browser ;
        break;
    }

    return json_encode($retorno) ;
  }

  $request = exploraRequest("browser");

  echo $request;

?>
