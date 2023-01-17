    /**
     * @description
     * Função responsável por converter uma data (data) de um formato (formato1) para outro formato de saída informado (formato2) ;
     * @author Marcos T. L. Coelho ;
     * @param {string} data -> string de data|hora ;
     * @param {string} formato1 -> formato da string data informada ;
     * @param {string} formato2 -> formato em que deve ser retornado ;
     * @returns {string} retorno -> data no formato selecionado ;
     * @summary
     * * OBS : sobre os formatos de Data e Hora :
     * * d : dia ;
     * * m : mês ;
     * * y : ano ;
     * * h : horas ;
     * * i : minutos;
     * * s : segundos;
     * * x : milisegundos;
     * *
     * * OBS : sobre os separadores Data (dia-mês-ano) || (dia/mês/ano):
     * * são aceitos '-' e '/' ;
     * *
     * * OBS : sobre os separadores de Horário (horas:minutos:segundos:milisegundos):
     * * é aceito ':' ;
     * *
     * * OBS : sobre os separadores entre Data e Horário:
     * * são aceitos ' ' e 'T' ;
     * *
     * @example
        formataData('22/12/2022 17:35:59','d/m/y h:i:s','y-m-d h:i:s:x') ;
        retorno : '2022-12-22 17:35:59:00' ;
     * @example
        formataData('2023-Feb-14 12:46:39:549','y-m-d H:i:s:x','dd/mm/yyyy h:i:s:x') ;
        retorno : '14/02/2023 12:46:39:549';
     */
    function formataData(data,formato1,formato2){
        /* Separadores definindo se é '-' ou '/' */
        let separadorFormato1 ;
        let separadorFormato2;
        /** separador entre a data e hora (' ' ou 'T' ) */
        let separadorFormatoHora;
        /** separador do campo de hora (':') */
        let separadorHorario = ":";

        /* Data informada; dia, mês e ano informados */
        let dia;
        let mes;
        let ano;

        /* Horário informado ; Hora, minuto, segundo e milisegundos informados */
        let hora;
        let minuto;
        let segundo;
        let milisegundo;

        /* String DATA, String HORA*/
        let sData;
        let sHoras;

        /** Valor Padrão das horas ao retornar 0 trocar por 00 */
        let valPadraoHoras = '00' ;
        
        /* Transformando formato de entrada, saída e de horas em minúsculo para comparações */
        formato1 = formato1.toLowerCase();
        formato2 = formato2.toLowerCase();

        /** h : horas ;  i : minutos; s : segundos; x : milisegundos; */
        formatoHoras = "h:i:s:x";

        /* Validando o separador do formato1 - formato informado */
        if (formato1.includes("-")){
            separadorFormato1 = '-';
        } else if(formato1.includes('/')){
            separadorFormato1 = '/';
        } else if (formato1.trim() == ''){
            return 'formato 1 é inválido';
        } else {
            return 'formato 1 é inválido';
        }

        /* Validando o separador do formato2 - formato retornado */
        if (formato2.includes("-")){
            separadorFormato2 = '-';
        } else if(formato2.includes('/')){
            separadorFormato2 = '/';
        } else if (formato2.trim() == ''){
            return 'formato 2 é inválido';
        } 
        // OBS : Deixar sem else ,isso permitirá retornar o dado formatado ou apenas um dado ex: apenas ano ou mês ou minuto ou milisegundo ... ;
        
        /* Validando o separador entre a Data e o Horário */
        if(data.includes(" ")){
            separadorFormatoHora = " ";
        } else if (data.includes("T")){
            separadorFormatoHora = "T";
        }

        /* Tentativa de transformação da data usando JS puro em datas válidas ; ex : Oct 14 2023 */
        if((new Date(data) !== 'Invalid Date') && (formato1.substring(0, 5) == `m${separadorFormato1}d${separadorFormato1}y` || formato1.substring(0, 5) == `y${separadorFormato1}m${separadorFormato1}d`)){
            data = new Date(data);

            dia = data.getDate();
            mes = data.getMonth()+1;
            ano = data.getFullYear();

            hora        = data.getHours();
            minuto      = data.getMinutes();
            segundo     = data.getSeconds();
            milisegundo = data.getMilliseconds();

            /* Sanetizando formato2 ! para obtermos apenas 1 letra para retorno ex : d/m/y h:i:s:x ;
                isso previne : dd/mm/yyyy virar : 1414/1010/2023202320232023 ;
                ref: https://stackoverflow.com/a/50012120 ; */
            formato2 = formato2.replace(/d/g, (i => m => !i++ ? m : '')(0));
            formato2 = formato2.replace(/m/g, (i => m => !i++ ? m : '')(0));
            formato2 = formato2.replace(/y/g, (i => m => !i++ ? m : '')(0));
            formato2 = formato2.replace(/h/g, (i => m => !i++ ? m : '')(0));
            formato2 = formato2.replace(/i/g, (i => m => !i++ ? m : '')(0));
            formato2 = formato2.replace(/s/g, (i => m => !i++ ? m : '')(0));
            formato2 = formato2.replace(/x/g, (i => m => !i++ ? m : '')(0));

            formato2 = formato2.split('');

            for(let i = 0 ; i < formato2.length ; i ++){
                // Data ;
                if(formato2[i] == 'd'){
                    formato2[i] = formato2[i].replace('d',dia);
                    /* --- caso dia tenha tamanho == 1, acrescentar 0 no retorno; ex : dia = 1 ; dia = 01 --- */
                    (formato2[i].length == 1 ? formato2[i] = '0'+formato2[i] : null);
                }

                if(formato2[i] == 'm'){
                    formato2[i] = formato2[i].replace('m',mes);
                    (formato2[i].length == 1 ? formato2[i] = '0'+formato2[i] : null);
                }

                if(formato2[i] == 'y'){
                    formato2[i] = formato2[i].replace('y',ano);
                }

                // Horário ;
                if(formato2[i] == 'h'){
                    formato2[i] = formato2[i].replace('h',hora);
                    (formato2[i].length == 1 ? formato2[i] = formato2[i].replaceAll("0",valPadraoHoras) : null);
                }

                if(formato2[i] == 'i'){
                    formato2[i] = formato2[i].replace('i',minuto);
                    (formato2[i].length == 1 ? formato2[i] = formato2[i].replaceAll("0",valPadraoHoras) : null);
                }

                if(formato2[i] == 's'){
                    formato2[i] = formato2[i].replace('s',segundo);
                    (formato2[i].length == 1 ? formato2[i] = formato2[i].replaceAll("0",valPadraoHoras) : null);
                }

                if(formato2[i] == 'x'){
                    formato2[i] = formato2[i].replace('x',milisegundo);
                    (formato2[i].length == 1 ? formato2[i] = formato2[i].replaceAll("0",valPadraoHoras) : null);
                }
            }

            retorno = formato2.join('');

            return retorno;
        }
        /* Caso a conversão acima falhe em criar uma data válida, apenas seguir o código para tentar converter logo abaixo */

        /* Gerando uma contagem para aparecimento da strings, d,m,y ; OBS :não está em uso */
        // let dNoFormato =  (formato1.match(/d/g) || []).length;
        // let mNoFormato =  (formato1.match(/m/g) || []).length;
        // let yNoFormato =  (formato1.match(/y/g) || []).length;

        /* Transformando formato1 em multiplos arrays baseando no separador para obtermos dia,mês,ano */
        formato1 = formato1.split(separadorFormato1);
        /* Transformando formato2 em 2 arrays, um para tratativa de Data[0], outro para Horas[1] */
        formato2 = formato2.split(separadorFormatoHora);

        /* Sanetizando formato2[0] ! Garantindo integridade no retorno da DATA ;
            transformando 'yyyy' em 'y' ou 'mm' em 'm' ;
            isso previne : dd/mm/yyyy virar : 1414/1010/2023202320232023 ;
        */
        formato2[0] = formato2[0].split(separadorFormato2);
        for(let i = 0 ; i < formato2[0].length; i++){
            // Validando DATAS;
            if(formato2[0][i].includes("d")){
                formato2[0][i] = formato2[0][i].replaceAll('d','').replace('','d');
            } else if(formato2[0][i].includes("m")){
                formato2[0][i] = formato2[0][i].replaceAll('m','').replace('','m');
            } else if(formato2[0][i].includes("y")){
                formato2[0][i] = formato2[0][i].replaceAll('y','').replace('','y');
            } 
        }
        formato2[0] = formato2[0].join(separadorFormato2);

        /* Sanetizando formato2[1] ! Garantindo integridade no retorno do HORARIO ; 
            transformando 'HH' em 'h' ou 'mm' em 'm' ;
            isso previne : HH:mm:ss virar :  1212:2020:5353 ;
        */
        if(formato2[1] !== undefined && formato2[1] !== null && formato2[1] !== ''){
            formato2[1] = formato2[1].split(separadorHorario);
            for(let i = 0 ; i < formato2[1].length; i++){
                // VALIDANDO HORAS
                if(formato2[1][i].includes("h")){
                    formato2[1][i] = formato2[1][i].replaceAll('h','').replace('','h');
                } else if(formato2[1][i].includes("i")){
                    formato2[1][i] = formato2[1][i].replaceAll('i','').replace('','i');
                } else if(formato2[1][i].includes("s")){
                    formato2[1][i] = formato2[1][i].replaceAll('s','').replace('','s');
                } else if(formato2[1][i].includes("x")){
                    formato2[1][i] = formato2[1][i].replaceAll('x','').replace('','x');
                }
            }
            formato2[1] = formato2[1].join(separadorHorario);
        }

        /* SEPARANDO os valores (STRING) de HORAS e de DATA  -> se baseando na string : @param data ;
            OBS: É importante separar os valores devido ao horário poder não ter sido informado na data ;
        */
        /* --- HORA --- */
        sHoras = data.split(separadorFormatoHora)[1];
        if(sHoras !== undefined && sHoras !== null && sHoras !== ''){
            sHoras = sHoras.split(separadorHorario);
        }
        /* --- DATA --- */
        sData = data.split(separadorFormatoHora)[0];
        sData = sData.split(separadorFormato1);

        /* RETORNO É O FORMATO2 [0](DATA) E FORMATO2 [1](HORARIO) CONCATENADOS DE FORMA VÁLIDA */
        if(formato2[1] !== undefined && formato2[1] !== null && formato2[1] !== ''){
            retorno = formato2[0]+separadorFormatoHora+formato2[1];
        } else {
            retorno = formato2[0];
        }
        
        /* Validando DATA - Alterando valor da formula de retorno por valor informado */
        for(let i = 0; i < sData.length ; i++){
            /* Quebra do formato1  - definindo qual é o dia;mes;ano; */
            if(formato1[i].toLowerCase().includes("d")){
                dia = sData[i];
                /* --- caso dia tenha tamanho == 1, acrescentar 0 no retorno; ex : dia = 1 ; dia = 01 --- */
                (dia.length == 1 ? dia = '0'+ dia : null);
                retorno = retorno.replaceAll('d',dia);
            }

            if(formato1[i].toLowerCase().includes("m")){
                mes = sData[i];
                (mes.length == 1 ? mes = '0'+ mes : null);
                retorno = retorno.replaceAll('m',mes)
            }

            if(formato1[i].toLowerCase().includes("y")){
                ano = sData[i];
                (ano.length == 2 ? ano = new Date().getFullYear().toString().substring(0, 2) + ano : null);
                retorno = retorno.replaceAll('y',ano);
            }
        }

        /* Validando HORÁRIO - Alterando valor da formula de retorno por valor informado */
        /* Se sHoras for array temos que dar replace item a item da string pelo valor correto informado */
        if(Array.isArray(sHoras)){
            formatoHoras = formatoHoras.split(separadorHorario);
            for(let i = 0; i < formatoHoras.length ; i++){
                /* Quebra do formatoHoras  - definindo qual é a hora,minuto,segundo,milisegundo; */
                if(i == 0){
                    hora = (sHoras[i] == undefined ? valPadraoHoras : sHoras[i]);
                    (hora.length == 1 ? hora = '0'+hora : null)
                    retorno = retorno.replaceAll('h',hora);
                }

                if(i == 1){
                    minuto = (sHoras[i] == undefined ? valPadraoHoras : sHoras[i]);
                    (minuto.length == 1 ? minuto = '0'+minuto : null)
                    retorno = retorno.replaceAll('i',minuto);
                }

                if(i == 2){
                    segundo = (sHoras[i] == undefined ? valPadraoHoras : sHoras[i]);
                    (segundo.length == 1 ? segundo = '0'+segundo : null)
                    retorno = retorno.replaceAll('s',segundo);
                }

                if(i == 3){
                    milisegundo = (sHoras[i] == undefined ? valPadraoHoras : sHoras[i]);
                    (milisegundo.length == 1 ? milisegundo = '0'+milisegundo : null)
                    retorno = retorno.replaceAll('x',milisegundo);
                }

            }
        } else {
            // Caso contrário cada valor assume valPadraoHoras, devido não ter sido informado mas ter sido solicitado para retorno ;
            if(retorno.includes('h')){
                retorno = retorno.replaceAll('h',valPadraoHoras);
            }

            if(retorno.includes('i')){
                retorno = retorno.replaceAll('i',valPadraoHoras);
            }

            if(retorno.includes('s')){
                retorno = retorno.replaceAll('s',valPadraoHoras);
            }

            if(retorno.includes('x')){
                retorno = retorno.replaceAll('x',valPadraoHoras);
            }
        }
        
        // Tratamento para T como separadorFormatoHora ; 
        if(retorno.includes("t")){
            retorno = retorno.replace("t","T");
        }

        return retorno;
    }