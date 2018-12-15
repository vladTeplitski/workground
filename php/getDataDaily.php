<?php
#Daily - dataset - Working with DB
#Graph datasets server side functionality
#Test url: https://irwebsites.co.il/workground/php/getDataDaily.php

##TODO:
## 1) Choose wanted date, get desired date as argument for $todaydate, list available dates in json output

#Connect to DB
include "/code/mysql/database_stockquote.php";
include "/var/www/html/master/public/graph_app/workground/php/globalConfig.php";



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