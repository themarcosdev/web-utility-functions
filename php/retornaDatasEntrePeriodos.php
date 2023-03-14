	  /** Função para retornar datas entre um periodo */
		function retornaDatasEntrePeriodos($periodo1,$periodo2){
			$dataInicial = $periodo1;
			$dataFinal = $periodo2;
			
			$retorno = array();
			
			$date1=date_create($dataInicial);
			$date2=date_create($dataFinal);
			$diff=date_diff($date1,$date2);
			$totalDias= $diff->format("%a");
			
			for($i = 0 ; $i <= $totalDias ; $i ++){
				if(date('Y-m-d', strtotime($dataInicial.'+ 1 day')) <=  date('Y-m-d', strtotime($dataFinal.'+ 1 day'))){
					array_push($retorno,date('Y-m-d', strtotime($dataInicial)));
					$dataInicial = date('Y-m-d', strtotime($dataInicial.'+ 1 day'));
				}
			}
			
			return $retorno;
		}
