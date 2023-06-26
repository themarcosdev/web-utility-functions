$.ajaxSetup({
    beforeSend: function (jqXHR, settings) {
        let retorno = {};
        let requisicao = {};
        let invocador = null;

        /* Inicializador da função ; */
        try {
            throw new Error();
        } catch (e) {
            let stack = e.stack.split('\n');
            stack.shift();
            stack = stack.map(item => item.trim()) ;
            let caller = Object.assign({}, stack);
            invocador = caller;
        }

        /* Intercepta a requisição aqui (Dados Enviados) ; */
        requisicao.url = settings.url;
        requisicao.type = settings.type;
        requisicao.data = settings.data;
        requisicao.headers = settings.headers;

        retorno.invocador = invocador;
        retorno.requisicao = requisicao;

        /* Guardando valores de requisição para $ajax.setup complete  ;*/
        sessionStorage.setItem('sst_retorno_ir', JSON.stringify(retorno));
    },
    complete: function (jqXHR, textStatus) {
        let retorno = {};
        let resposta = {};

        /* Clonar response, para que a original possa ler os dados e usar o clone para a let retorno ; */
        let clone = jqXHR.responseText;

        /* Tratamento na devolução de retorno.resposta ; */
        resposta = {
            body: clone,
            headers: jqXHR.getAllResponseHeaders(),
            status: jqXHR.status,
            statusText: jqXHR.statusText
        };

        if (resposta.body) {
            resposta.body = resposta.body.replace(/[\t\r\n]/g, "");
            if (resposta.body.charAt(0) == "[" || resposta.body.charAt(0) == "{") {
                resposta.body = JSON.parse(resposta.body);
            }
        }

        retorno.resposta = resposta;
        retorno.requisicao = JSON.parse(sessionStorage.getItem('sst_retorno_ir')).requisicao;
        retorno.invocador = JSON.parse(sessionStorage.getItem('sst_retorno_ir')).invocador;

        /* Faça o que quiser com o retorno | Debug ; */
        console.log(retorno);
        sessionStorage.setItem('sst_retorno_as', JSON.stringify(retorno));
    }
});
