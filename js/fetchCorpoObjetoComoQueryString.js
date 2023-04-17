function FetchURLSearch(){
	let meus_headers = {
		'Content-Type': 'application/json'
	}
  
	/* Transformando objeto de dados legível em um querystring para ser usado no URL através de fetch : metódo GET */
	let dados = 	{
		param_1: "1",
		d1: 1 ,
		d2: 2 ,
		d3: null,
	}
	let url = new URLSearchParams(dados);
	url = url.toString();

  	// Site de exemplo ;
	fetch(`https://example.com?${url}`, {
	method: 'GET',
	headers: meus_headers
	}).then(response => {
		console.log(response);
		response.json().then(function (data) {
			console.log(data);
		});
	});

}
