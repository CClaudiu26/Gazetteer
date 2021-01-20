<?php



$url = 'api.openweathermap.org/data/2.5/weather?lat=' . $_REQUEST['lat'] . '&lon='  . $_REQUEST['lng'] . '&units=metric&appid=48f4ecee703e899a7425d4d536feabc6' ;



$ch = curl_init();

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);


$result = curl_exec($ch);


curl_close($ch);

	

$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
    $output['data'] = $decode;
    
    echo json_encode($output); 

	






?>