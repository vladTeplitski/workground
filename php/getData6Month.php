<?php
#Half Year - dataset
#Graph datasets server side functionality
#Test url: https://irwebsites.co.il/workground/getData6Month.php

#Connect to DB
include "/code/mysql/database.php";
include "/var/www/html/master/public/graph_app/workground/php/globalConfig.php";

#Work with dates
#Format: 24062018
$todayDate=date("dmY");

#test dates
#echo "Today date:"."<br>";
#echo $todayDate;
#echo "<br>";
#END test dates

#Shift data 1 year back
$shiftDate=date("dmY",strtotime("-6 months"));
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

#Create variables with LockRate
for($i = 0; $i <= ($monthDays-1); $i++) {
    ${"srcLock$i"} = $resultsjson['History']['Entry'][$i]['LockRate'];
    #echo "<br>";
    #echo ${"srcVol$i"};
}

#Create variables with BaseRate
for($i = 0; $i <= ($monthDays-1); $i++) {
    ${"srcBaseRate$i"} = $resultsjson['History']['Entry'][$i]['BaseRate'];
    #echo "<br>";
    #echo ${"srcVol$i"};
}

#Create variables with OpeningRate
for($i = 0; $i <= ($monthDays-1); $i++) {
    ${"srcOpeningRate$i"} = $resultsjson['History']['Entry'][$i]['OpeningRate'];
    #echo "<br>";
    #echo ${"srcVol$i"};
}

#Create variables with DailyHigh
for($i = 0; $i <= ($monthDays-1); $i++) {
    ${"srcDailyHigh$i"} = $resultsjson['History']['Entry'][$i]['DailyHigh'];
    #echo "<br>";
    #echo ${"srcVol$i"};
}

#Create variables with DailyLow
for($i = 0; $i <= ($monthDays-1); $i++) {
    ${"srcDailyLow$i"} = $resultsjson['History']['Entry'][$i]['DailyLow'];
    #echo "<br>";
    #echo ${"srcVol$i"};
}

#Create variables with Turnover
for($i = 0; $i <= ($monthDays-1); $i++) {
    ${"srcTurnover$i"} = $resultsjson['History']['Entry'][$i]['Turnover'];
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
for($i = 0; $i <= ($monthDays-1); $i++) {
    $obj->{"baseRate$i"} = ${"srcBaseRate$i"};
}
for($i = 0; $i <= ($monthDays-1); $i++) {
    $obj->{"openingRate$i"} = ${"srcOpeningRate$i"};
}
for($i = 0; $i <= ($monthDays-1); $i++) {
    $obj->{"dailyHigh$i"} = ${"srcDailyHigh$i"};
}
for($i = 0; $i <= ($monthDays-1); $i++) {
    $obj->{"dailyLow$i"} = ${"srcDailyLow$i"};
}
for($i = 0; $i <= ($monthDays-1); $i++) {
    $obj->{"turnover$i"} = ${"srcTurnover$i"};
}

#echo the final json dataset:
echo json_encode($obj);
?>