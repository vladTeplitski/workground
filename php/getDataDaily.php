<?php
#Daily - dataset
#Graph datasets server side functionality
#Test url: https://irwebsites.co.il/workground/php/getDataDaily.php

##TODO:
## 1) Choose wanted date, get desired date as argument for $todaydate, list available dates in json output

#Connect to DB
include "/code/mysql/database_stockquote.php";
include "/var/www/html/master/public/workground/php/globalConfig.php";

#echo "Graph dataserver - server side - START";

##START API Function

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
#END API Function

#Work with dates
#Format: 2018-12-08

$todayDate=date("Y-m-d");
#test dates
#echo "Today date:"."<br>";
#echo $todayDate;
#echo "<br>";

#Connect to Database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

#Daily Data Query for specific company and specific date
$sql = "SELECT Rate, timeInsert, DailyHighestRate, DailyLowestRate, BaseRate, BaseRateChangePercentage, BaseRateChange, AllYearMaximumRate, AllYearMinimumRate FROM dailyStockValues WHERE dateInsert='$todayDate' AND idcompany='$globalCC'";
$result = $conn->query($sql);
$i=0;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        
                     
        #Debug info
        #echo "<br> Rate: ". $row["Rate"] . "Time: ". $row["timeInsert"]. "<br>";

        #Create variables dynamically
        
        ${"srcDate$i"} = $row["timeInsert"];
        ${"srcLock$i"} = $row["Rate"];
        ${"srcDailyHigh$i"} = $row["DailyHighestRate"];
        ${"srcDailyLow$i"} = $row["DailyLowestRate"];
        ${"srcBaseRate$i"} = $row["BaseRate"];
        ${"srcBaseRatePercent$i"} = $row["BaseRateChangePercentage"];
        ${"srcBaseRateChange$i"} = $row["BaseRateChange"];
        ${"srcAllYearMaximumRate$i"} = $row["AllYearMaximumRate"];
        ${"srcAllYearMinimumRate$i"} = $row["AllYearMinimumRate"];




        #echo "<br>";
        #echo "Building variables:".$i;
        #echo "<br>";
        #echo ${"srcDate$i"};
        #echo "<br>";
        #echo ${"srcLock$i"};
        #echo "<br>";


        $i=$i+1;
    }

}

#Number of results for this day
$resutsCount = $result->num_rows;
#echo "Number of results:"."<br>";
#echo $resutsCount;
#echo "<br>";

#Create data object
$obj = (object) [];

#Add values dynamically to the object

for($i = 0; $i <= ($resutsCount-1); $i++) {
    $obj->{"date$i"} = ${"srcDate$i"};
}
for($i = 0; $i <= ($resutsCount-1); $i++) {
    $obj->{"lock$i"} = ${"srcLock$i"};
}
for($i = 0; $i <= ($resutsCount-1); $i++) {
    $obj->{"dailyHigh$i"} = ${"srcDailyHigh$i"};
}
for($i = 0; $i <= ($resutsCount-1); $i++) {
    $obj->{"dailyLow$i"} = ${"srcDailyLow$i"};
}
for($i = 0; $i <= ($resutsCount-1); $i++) {
    $obj->{"baseRate$i"} = ${"srcBaseRate$i"};
}
for($i = 0; $i <= ($resutsCount-1); $i++) {
    $obj->{"baseRatePercent$i"} = ${"srcBaseRatePercent$i"};
}
for($i = 0; $i <= ($resutsCount-1); $i++) {
    $obj->{"baseRateChange$i"} = ${"srcBaseRateChange$i"};
}
for($i = 0; $i <= ($resutsCount-1); $i++) {
    $obj->{"allYearMaximumRate$i"} = ${"srcAllYearMaximumRate$i"};
}
for($i = 0; $i <= ($resutsCount-1); $i++) {
    $obj->{"allYearMinimumRate$i"} = ${"srcAllYearMinimumRate$i"};
}


#echo the final json dataset:
echo json_encode($obj);

?>