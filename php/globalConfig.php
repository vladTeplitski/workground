<?php
#Configure global settings
#echo "In global config";
#Company Code


######### Project Personalization Configs ##############

#Company: Delek Drilling
    $globalCC="475020";

######### END Project Personalization Configs ##############

#Project global functions

#START - Get data from API

$jsonPresentation=file_get_contents('http://irwebsites.co.il/Investor_Relations/pages/gto/login.php');
$json_data_presentation=json_decode($jsonPresentation,true);
$lengthPresentationJSON = sizeof($json_data_presentation);

function historicalFunction($shiftDate,$todayDate) {
    $curl = curl_init();
    global $globalCC;
    
    #Dynamic API Path
    $path="https://api.gto.co.il:9005/v2/json/market/history?key=".$globalCC."&fromDate=".$shiftDate."&toDate=".$todayDate;
    
 #  echo "Path:"."<br>";
 #  echo $path;
 #  echo "<br>";
    
    global $json_data_presentation;
    
    curl_setopt_array($curl, array(
        CURLOPT_PORT => "9005",
        CURLOPT_URL => $path,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_CUSTOMREQUEST => "GET",
        //CURLOPT_POSTFIELDS => "{\n\t\"Login\": {\n\t\t\n\t\t\"User\":\"apizvi01\",\n\t\t\"Password\":\"12345\"\n\t\n\t}\n}",
        CURLOPT_HTTPHEADER => array(
            "Cache-Control: no-cache",
            "Content-Type: application/json",
            "session: ".$json_data_presentation["Login"]["SessionKey"]
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);
    
    curl_close($curl);
    
    return $response;
}
#END - Get data from API

?>