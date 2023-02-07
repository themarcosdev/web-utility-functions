    <head>
      <meta charset="UTF-8">
      <!-- css customizado -->
      <!-- bootstrap, font awsome e libs js -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />	
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title><?php echo (isset($titulo_pag) ? $titulo_pag : "página-timer"); ?></title>
    </head>
    <div class="container-fluid">
      <div class="row mx-1 my-3">
        <div class="col-12">
          <div class="row">
            <div class="row">
              <div class="col-12 d-flex flex-row-reverse">
                <div class="col-2 mx-1">
                  <button id="btn_atualizar_agora" class="btn btn-primary bg-cor1 text-white p-3 mt-1" title="Atualiza os dados das cargas agora"><i class="fas fa-redo"></i></button>
                </div>
                <div class="form-floating col-2 mx-1">
                  <select id="selectAgendaAtualizacao" class="form-control" onchange="atualizarDadosEmXTempo(this.value)" title="Ativa/Reseta o timer quando é alterado">
                    <option value="">N&atilde;o agendar</option>
                    <option value="5">5 Segundos</option>
                    <option value="10">10 Segundos</option>
                    <option value="30">30 Segundos</option>
                    <option value="60"> 1 Minuto</option>
                    <option value="120">2 Minutos</option>
                    <option value="180">3 Minutos</option>
                    <option value="300">5 Minutos</option>
                    <option value="600">10 Minutos</option>
                    <option value="900">15 Minutos</option>
                    <option value="1200">20 Minutos</option>
                    <option value="1800">30 Minutos</option>
                  </select>
                  <label for="selectAgendaAtualizacao">Atualização</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex flex-row-reverse">
                <div class="col-4 me-1">
                  <div class="my-1 progress col-6 me-2">
                    <div class="progress-bar" role="progressbar" aria-label="Basic example" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>

      window.addEventListener("DOMContentLoaded",funcaoInicial);

      /** Função para chamar outras funções que dependem do DOM estar carregado */
      function funcaoInicial(){
        restauraIntevaloTempoSelecSalvo();
        habilitaBotaoRealodEAcao();
      }

      /** 
       * @author :  Marcos T. de L. Coelho;
       * @Função : Responsável por receber um valor em segundos e executar uma função/ação baseando em segundos informados como parâmetro ;*/
      function atualizarDadosEmXTempo(tempoEmSegundos){

        let barra_de_progresso = document.getElementsByClassName("progress-bar")[0];

        guardaIntervaloTempoSelecionado();

        if(+tempoEmSegundos){
          /** tempo : Resultado do tempoEmSegundos x 1000 */
          let tempo = tempoEmSegundos * 1000;

          /** tempoAgora :  Começando em 0 é cada segundo que se passou acrescentando 1000 */
          let tempoAgora = 0 ;

          // efetuado apenas na primeira vez, quando a função é executada ;
          resetaIntervalo();		

          // Subintervalo é variavel para desenhar o tempo passando ⚠ OBS: o subIntervalo é executado de 1 em 1 segundo;
          subIntervalo = setInterval(()=>{

            /* 
            Função PRINCIPAL - inicio ;
            Função principal aqui, baseando no tempoEmSegundos ; ⚠ OBS : executado pelo tempo definido pelo usuario */
            if(tempoAgora == tempo){
              // Escrevendo o tempo passado, para debug quando o tempoAgora chegar no tempo para efetuar a ação ;
              if(tempoEmSegundos <= 60){
                console.log('se passou : '+ tempoEmSegundos + ' segundos !');
              } else {
                tempoEmMin = tempoEmSegundos / 60;
                console.log('se passou : '+ tempoEmMin + ' minutos !');
              }

              funcaoPrincipal();
            }
            /* FIM - função principal */

            // Incrementar tempo agora de 1000 em 1000 milisegundos ;
            if(tempoAgora == 0){
              console.log('tempo:0');
              tempoAgora = restauraTempoPassadoSalvo() * 1000 ;
            } 

            tempoAgora += 1000;

            barra_de_progresso.style.width = `${+barra_de_progresso.style.width.replace("%",'')}%` ;
            barra_de_progresso.ariaValueNow = `${+barra_de_progresso.style.width.replace("%",'')}` ;

            // Re-escrevendo o tamanho e valor da barra de progresso a cada 1 segundo ;
            barra_de_progresso.style.width = `${+barra_de_progresso.style.width.replace("%",'') - (100 / tempoEmSegundos)}%`;

            if(tempoAgora <= tempo){
              guardaTempoPercorridoNoIntervalo(tempoAgora / 1000);
            } else {
              tempoAgora = tempo;
              guardaTempoPercorridoNoIntervalo(0);
            }

            /* Escrendo no titulo da progress bar */
            if(tempoEmSegundos <= 60){
              barra_de_progresso.title = 'Tempo passado: ' + (tempoAgora / tempo) * tempo / 1000 + ' segundos - restante : ' + formataTamanho(100 - tempoAgora / tempo * 100, 5 )  + ' % !';
            } else {
              tempoTotal = tempoAgora / 1000 ;
              tempoEmMin = (tempoTotal / 60).toString().split('.')[0] + ' min e ' + (tempoTotal % 60) + ' segundos';
              barra_de_progresso.title = 'Tempo passado: ' + tempoEmMin + ' - restante : ' + formataTamanho(100 - tempoAgora / tempo * 100 , 5 )+ ' % !';
            }

          }, 1000);

        } else {
          guardaTempoPercorridoNoIntervalo(0);
          resetaIntervalo();
        }
      }

      // Declaração da let subIntervalo, quando a função atualizarDadosEmXTempo é chamada essa let assume valor de chamada de um setInterval;
      let subIntervalo = 0;

      /** Função Auxiliar da função atualizarDadosEmXTempo para resetar a variavel subIntervalo e redesenhar a barra de progresso e valor para 100  */
      function resetaIntervalo(){
        let barra_de_progresso = document.getElementsByClassName("progress-bar")[0];
        barra_de_progresso.style.width = `100%` ;
        barra_de_progresso.ariaValueNow = `100` ;	
        subIntervalo ? clearInterval(subIntervalo): null;
      }

      /** Função principal da página responsável pelo core dps da lógica de timer */
      function funcaoPrincipal(){
        window.location.reload();
      }

      /** Função para salvar o tempo que o usuário salvou na interface no armazenamento do LocalStorage */
      function guardaIntervaloTempoSelecionado(){
        localStorage.setItem("lst-sistemaTimer-tempoSelecionado",document.getElementById("selectAgendaAtualizacao").value);
      }

      /** Função apra salvar o tempo que foi percorrido na interface do usuário no LocalStorage */
      function guardaTempoPercorridoNoIntervalo(tempoPercorrido){
        localStorage.setItem("lst-sistemaTimer-tempoPercorrido",tempoPercorrido);
      }

      /** Função para restaurar o tempo que o usuario selecionou na interface e que está no localStorage */
      function restauraIntevaloTempoSelecSalvo(){
        // Se temo o tempo percorrido, usar o tempo percorrido, senão usar o tempo selecionado
        if(localStorage.getItem("lst-sistemaTimer-tempoSelecionado") != null && localStorage.getItem("lst-sistemaTimer-tempoSelecionado") != ''){
          document.getElementById("selectAgendaAtualizacao").value = localStorage.getItem("lst-sistemaTimer-tempoSelecionado")
        }

        // Atualizando os dados e aplicando lógica principal da página ;
        atualizarDadosEmXTempo(localStorage.getItem("lst-sistemaTimer-tempoSelecionado"));
      }

      /** Função para restaurar o tempo que havia passado e foi salvo */
      function restauraTempoPassadoSalvo(){
        let tempoRestaurado = 0;
        // Se temos o tempo percorrido, usar o tempo percorrido ;
        if(localStorage.getItem("lst-sistemaTimer-tempoPercorrido") != null && localStorage.getItem("lst-sistemaTimer-tempoPercorrido") != ''){
          tempoRestaurado = localStorage.getItem("lst-sistemaTimer-tempoPercorrido");
          tempoSelec = 100 / localStorage.getItem("lst-sistemaTimer-tempoSelecionado") ;
          document.getElementsByClassName("progress-bar")[0].style.width =  100 - tempoSelec * tempoRestaurado +'%';
        }
        console.log('cadaSegundoEmPorcentagemVale: '+tempoSelec);
        console.log('tempoJaPercorridoEmSegundos:'+tempoRestaurado);
        return +tempoRestaurado;
      }

      /** Função para quando o botão btn_atualizar_agora for clicado recarregar a página para trazer dados */
      function habilitaBotaoRealodEAcao(){
        if(document.getElementById("btn_atualizar_agora")){
          document.getElementById("btn_atualizar_agora").addEventListener("click",()=>{
            funcaoPrincipal();
          });
        }
      }

      /** Função para formatar, reduzir uma string para um determinado tamanho ou número para um valor de casas informado,
       *  importante considerar o '.' no números 
       * 	@example 
       * 		let texto = 'Apenas um teste 123 abc ';
       * 		formataTamanhoStringOuNum(texto,15);
          r: 'Apenas um teste'
       * 		let num = 4.1545645465456 ;
       * 		formataTamanhoStringOuNum(num,4,'s') ; 
          r: 4.15 ; 
       * */
      function formataTamanhoStringOuNum(stringOuNum, totalDeCasas, retornarComoNumero){
        possibilidadesRetornarComoNro = ['S','N'];

        if(!stringOuNum){
          return 'Informe uma string ou número para ser formatado ';
        }

        if(!totalDeCasas){
          return 'Informe o tamanho total de casas a formatar a string ou número ';
        }

        if(!retornarComoNumero){
          retornarComoNumero = 'N';
        }

        retornarComoNumero = retornarComoNumero.toLocaleUpperCase();

        if(!possibilidadesRetornarComoNro.includes(retornarComoNumero)){
          return 'Informe uma possibilidade válida de retorno como número, "S" ou "N" ';
        }

        stringOuNum = stringOuNum.toString();
        stringOuNum = stringOuNum.split('');
        stringOuNum.length = totalDeCasas ;
        stringOuNum = stringOuNum.join(''); 

        if(retornarComoNumero == 'S'){
          return +stringOuNum ;
        } else { 
          return stringOuNum ;
        }
      }

    </script>
