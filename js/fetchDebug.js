/**
 *  @var originalFetch -  Fetch Original do JS ;
 */
const originalFetch = window.fetch;

/**
 * Novo Fetch re-escrito para debugar o fetch original do JS ;
 * @param {*} url 
 * @param {*} options 
 * @returns {object} response
 */
window.fetch = function (url, options) {
    let retorno = {};
    let requisicao = {};
    let resposta = {};
    let invocador = null;

    /* Inicializador da função ; */
    try {
        throw new Error();
    } catch (e) {
        const stack = e.stack.split('\n');
        const caller = stack[stack.length - 1];
        invocador = caller.trim();
    }


    /* Intercepta a requisição fetch aqui (Dados Enviados) ; */
    requisicao.url = url;
    requisicao.options = options;

    let headersObj = {};

    if (options.headers && typeof options.headers === 'object' && options.headers instanceof Headers) {
        for (const [key, value] of options.headers.entries()) {
            headersObj[key] = value;
        }
        requisicao.options.headers = headersObj;
    }

    retorno.requisicao = requisicao;

    /* Chama a função fetch original ; */
    return originalFetch.apply(this, arguments)
        .then(response => {
            /* Clonar response, para que a original possa ler os dados e usar o clone para a let retorno ; */
            return response.clone().text().then(data => {
                /* Tratamento na devolução de retorno.requisicao ; */
                if (options.body) {
                    if (requisicao.options.body.charAt(0) == "[" || requisicao.options.body.charAt(0) == "{" && typeof
                        requisicao.options.body === 'string') {
                        requisicao.options.body = JSON.parse(options.body);
                    } else {
                        requisicao.options.body = options.body;
                    }
                }

                /* Tratamento na devolução de retorno.resposta ; */
                resposta = {
                    body: data,
                    bodyUsed: response.bodyUsed,
                    headers: response.headers,
                    ok: response.ok,
                    redirected: response.redirected,
                    status: response.status,
                    statusText: response.statusText,
                    type: response.type,
                    url: response.url
                };

                headersObj = {}
                if (response.headers) {
                    for (const [key, value] of response.headers.entries()) {
                        headersObj[key] = value;
                    }
                }

                resposta.headers = headersObj;

                if (resposta.body) {
                    resposta.body = resposta.body.replace(/[\t\r\n]/g, "");
                    if (resposta.body.charAt(0) == "[" || resposta.body.charAt(0) == "{") {
                        resposta.body = JSON.parse(resposta.body);
                    }
                }

                retorno.resposta = resposta;

                retorno.invocador = invocador;

                /* Faça o que quiser com o retorno | Debug ; */
                sessionStorage.setItem('sst_retorno_rr', JSON.stringify(retorno));
                console.log(retorno);

                if (retorno.resposta.status == 401) {
                    /* Não autorizado, recarregue a página sessão expirada no php ; */
                    window.location.reload();
                }

                /* Retornando os dados originais para o originalFetch ; */
                return response;
            });
        });
}
