<?php
#3 Month - dataset
#Graph datasets server side functionality
#Test url: https://irwebsites.co.il/workground/getData3Month.php

#Connect to DB
include "/code/mysql/database.php";

#echo "Graph dataserver - server side - START";

#START - Get data from API

$jsonPresentation=file_get_contents('http://irwebsites.co.il/Investor_Relations/pages/gto/login.php');
$json_data_presentation=json_decode($jsonPresentation,true);
$lengthPresentationJSON = sizeof($json_data_presentation);

function historicalFunction($shiftDate,$todayDate) {
    $curl = curl_init();
    
    #Dynamic API Path
    $path="https://api.gto.co.il:9005/v2/json/market/history?key=475020&fromDate=".$shiftDate."&toDate=".$todayDate;
    
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

#Work with dates
#Format: 24062018
$todayDate=date("dmY");

#test dates
#echo "Today date:"."<br>";
#echo $todayDate;
#echo "<br>";
#END test dates

#Shift data 1 year back
$shiftDate=date("dmY",strtotime("-3 months"));
#echo "Shift date:"."<br>";
#echo $shiftDate;
#echo "<br>";
#END test dates


#Get data for each day of the month

$func_output=historicalFunction($shiftDate,$todayDate);

#Order the data of the whole month in json
$resultsjson = json_decode($func_output, true);

#TEST Json - Print json data
#echo "<br>"."Print r results array with pre:";
#echo '<pre>'; print_r($resultsjson); echo '</pre>';
#echo "<br>";
#echo '<pre>'; print_r($resultsjson['History']['Entry']['0']['BaseRate']); echo '</pre>';
#echo "<br>";

#END - Get data from API


#Build dataset

#Number of days

$monthDays = sizeof($resultsjson['History']['Entry']);
#echo "Days in last month:"."<br>";
#echo $monthDays;

#Create variables with dates 'date0,date1,..'
for($i = 0; $i <= ($monthDays-1); $i++) {
    ${"srcDate$i"} = substr($resultsjson['History']['Entry'][$i]['Date'],0,10);
    #echo "<br>";
    #echo ${"srcDate$i"};
}
#echo "<br><br>";

#Create variables with vol
for($i = 0; $i <= ($monthDays-1); $i++) {
    ${"srcLock$i"} = $resultsjson['History']['Entry'][$i]['LockRate'];
    #echo "<br>";
    #echo ${"srcVol$i"};
}

#Create an object
$obj = (object) [];

#Add values dynamically to the object

for($i = 0; $i <= ($monthDays-1); $i++) {
    $obj->{"date$i"} = ${"srcDate$i"};
}
for($i = 0; $i <= ($monthDays-1); $i++) {
    $obj->{"lock$i"} = ${"srcLock$i"};
}

#echo the final json dataset:
echo json_encode($obj);
?>