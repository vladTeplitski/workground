<?php
#Week Dataset
#Graph datasets server side functionality
#Test url: https://irwebsites.co.il/workground/getDataWeek.php

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

$shiftValue="-4";
$shiftDate=date("dmY",strtotime($shiftValue.' days'));

#test shifted dates
#echo "Shift date:"."<br>";
#echo $shiftDate;
#echo "<br>";
#END test dates


#Get data for each day of the week
#Send to function: shiftDate - Sunday, and todayDate - Thursday

$func_output=historicalFunction($shiftDate,$todayDate);

#Order the data of the last 5 days in json
#Json from 0 to 4 (5 days), first day is 0.
$resultsjson = json_decode($func_output, true);

#TEST Json - Print json data
#echo "<br>"."Print r results array with pre:";
#echo '<pre>'; print_r($resultsjson); echo '</pre>';
#echo "<br>";
#echo '<pre>'; print_r($resultsjson['History']['Entry']['0']['BaseRate']); echo '</pre>';
#echo "<br>";

#END - Get data from API



#Get specific values by day
$exampleField=$resultsjson['History']['Entry']['0']['BaseRate'];


#Dates for holidays
#Cut date

$sundayDate=date("d-m-Y",strtotime("-4".' days'));
$mondayDate=date("d-m-Y",strtotime("-3".' days'));
$tuesdayDate=date("d-m-Y",strtotime("-2".' days'));
$wednesdayDate=date("d-m-Y",strtotime("-1".' days'));
$thursdayDate=date("d-m-Y");

#echo "<br>";
#echo "Week dates: ";
#echo "<br>";
#echo $sundayDate;
#echo "<br>";
#echo $mondayDate;
#echo "<br>";
#echo $tuesdayDate;
#echo "<br>";
#echo $wednesdayDate;
#echo "<br>";
#echo $thursdayDate;
#echo "<br>";
#echo "<br>";

$apiDate=substr($resultsjson['History']['Entry']['0']['Date'],0,10);
#echo "<br>";
#echo "Parted date: ";
#print_r($apiDate);
#echo "<br>";


#Dates from API
$apiDateSunday=substr($resultsjson['History']['Entry']['0']['Date'],0,10);
$apiDateMonday=substr($resultsjson['History']['Entry']['1']['Date'],0,10);
$apiDateTuesday=substr($resultsjson['History']['Entry']['2']['Date'],0,10);
$apiDateWednesday=substr($resultsjson['History']['Entry']['3']['Date'],0,10);
$apiDateThursday=substr($resultsjson['History']['Entry']['4']['Date'],0,10);

#Change date structure
if($apiDateSunday != null){
    $apiDateSunday = date("d-m-Y", strtotime($apiDateSunday));
}
else
{
    $apiDateSunday="-";
}
if($apiDateMonday != null){
    $apiDateMonday = date("d-m-Y", strtotime($apiDateMonday));
}
else
{
    $apiDateMonday="-";
}
if($apiDateTuesday != null){
    $apiDateTuesday = date("d-m-Y", strtotime($apiDateTuesday));
}
else
{
    $apiDateTuesday="-";
}
if($apiDateWednesday != null){
    $apiDateWednesday = date("d-m-Y", strtotime($apiDateWednesday));
}
else
{
    $apiDateWednesday="-";
}
if($apiDateThursday != null){
    $apiDateThursday = date("d-m-Y", strtotime($apiDateThursday));
}
else
{
    $apiDateThursday="-";
}

#Values
#Sunday
if($resultsjson['History']['Entry']['0']==NULL)
{
    #Holidays
    $SundayOpeningPrice = "-";
    $SundayLastTrade = "-";
    $SundayPreviousClose = "-";
    $SundayDayHigh = "-";
    $SundayDayLow = "-";
    $SundayVolume = "-";
}
else
{
    #Set the values from json data
    $SundayOpeningPrice = $resultsjson['History']['Entry']['0']['OpeningRate'];
    $SundayLastTrade = $resultsjson['History']['Entry']['0']['LockRate'];
    $SundayPreviousClose = $resultsjson['History']['Entry']['0']['BaseRate'];
    $SundayDayHigh = $resultsjson['History']['Entry']['0']['DailyHigh'];
    $SundayDayLow = $resultsjson['History']['Entry']['0']['DailyLow'];
    $SundayVolume = $resultsjson['History']['Entry']['0']['Turnover'];
}
#Monday
if($resultsjson['History']['Entry']['1']==NULL)
{
    #Holidays
    $MondayOpeningPrice = "-";
    $MondayLastTrade = "-";
    $MondayPreviousClose = "-";
    $MondayDayHigh = "-";
    $MondayDayLow = "-";
    $MondayVolume = "-";
}
else
{
    #Set the values from json data
    $MondayOpeningPrice = $resultsjson['History']['Entry']['1']['OpeningRate'];
    $MondayLastTrade = $resultsjson['History']['Entry']['1']['LockRate'];
    $MondayPreviousClose = $resultsjson['History']['Entry']['1']['BaseRate'];
    $MondayDayHigh = $resultsjson['History']['Entry']['1']['DailyHigh'];
    $MondayDayLow = $resultsjson['History']['Entry']['1']['DailyLow'];
    $MondayVolume = $resultsjson['History']['Entry']['1']['Turnover'];
}
#Tuesday
if($resultsjson['History']['Entry']['2']==NULL)
{
    #Holidays
    $TuesdayOpeningPrice = "-";
    $TuesdayLastTrade = "-";
    $TuesdayPreviousClose = "-";
    $TuesdayDayHigh = "-";
    $TuesdayDayLow = "-";
    $TuesdayVolume = "-";
}
else
{
    #Set the values from json data
    $TuesdayOpeningPrice = $resultsjson['History']['Entry']['2']['OpeningRate'];
    $TuesdayLastTrade = $resultsjson['History']['Entry']['2']['LockRate'];
    $TuesdayPreviousClose = $resultsjson['History']['Entry']['2']['BaseRate'];
    $TuesdayDayHigh = $resultsjson['History']['Entry']['2']['DailyHigh'];
    $TuesdayDayLow = $resultsjson['History']['Entry']['2']['DailyLow'];
    $TuesdayVolume = $resultsjson['History']['Entry']['2']['Turnover'];
}
#Wednesday
if($resultsjson['History']['Entry']['3']==NULL)
{
    #Holidays
    $WednesdayOpeningPrice = "-";
    $WednesdayLastTrade = "-";
    $WednesdayPreviousClose = "-";
    $WednesdayDayHigh = "-";
    $WednesdayDayLow = "-";
    $WednesdayVolume = "-";
}
else
{
    #Set the values from json data
    $WednesdayOpeningPrice = $resultsjson['History']['Entry']['3']['OpeningRate'];
    $WednesdayLastTrade = $resultsjson['History']['Entry']['3']['LockRate'];
    $WednesdayPreviousClose = $resultsjson['History']['Entry']['3']['BaseRate'];
    $WednesdayDayHigh = $resultsjson['History']['Entry']['3']['DailyHigh'];
    $WednesdayDayLow = $resultsjson['History']['Entry']['3']['DailyLow'];
    $WednesdayVolume = $resultsjson['History']['Entry']['3']['Turnover'];
}
#Thursday
if($resultsjson['History']['Entry']['4']==NULL)
{
    #Holidays
    $ThursdayOpeningPrice = "-";
    $ThursdayLastTrade = "-";
    $ThursdayPreviousClose = "-";
    $ThursdayDayHigh = "-";
    $ThursdayDayLow = "-";
    $ThursdayVolume = "-";
}
else
{
    #Set the values from json data
    $ThursdayOpeningPrice = $resultsjson['History']['Entry']['4']['OpeningRate'];
    $ThursdayLastTrade = $resultsjson['History']['Entry']['4']['LockRate'];
    $ThursdayPreviousClose = $resultsjson['History']['Entry']['4']['BaseRate'];
    $ThursdayDayHigh = $resultsjson['History']['Entry']['4']['DailyHigh'];
    $ThursdayDayLow = $resultsjson['History']['Entry']['4']['DailyLow'];
    $ThursdayVolume = $resultsjson['History']['Entry']['4']['Turnover'];
}


#$todayDate=date("d-m-Y");
#echo "<br> Today date is: ". $todayDate . "<br>";


#number format - digits after point, big numbers seperation
if($SundayPreviousClose!="-"){
    $SundayVolume=number_format($SundayVolume);
    $SundayPreviousClose=number_format($SundayPreviousClose,2);
}
if($MondayPreviousClose!="-"){
    $MondayVolume=number_format($MondayVolume);
    $MondayPreviousClose=number_format($MondayPreviousClose,2);
}
if($TuesdayPreviousClose!="-"){
    $TuesdayVolume=number_format($TuesdayVolume);
    $TuesdayPreviousClose=number_format($TuesdayPreviousClose,2);
}
if($WednesdayPreviousClose!="-"){
    $WednesdayVolume=number_format($WednesdayVolume);
    $WednesdayPreviousClose=number_format($WednesdayPreviousClose,2);
}
if($ThursdayPreviousClose!="-"){
    $ThursdayVolume=number_format($ThursdayVolume);
    $ThursdayPreviousClose=number_format($ThursdayPreviousClose,2);
}

#Data build model in row: [Type1, Type2 , Type3...]
$obj = (object) [
    'date1' => $apiDateSunday,
    'date2' => $apiDateMonday,
    'date3' => $apiDateTuesday,
    'date4' => $apiDateWednesday,
    'date5' => $apiDateThursday,
    'lastTrade1' => $SundayLastTrade,
    'lastTrade2' => $MondayLastTrade,
    'lastTrade3' => $TuesdayLastTrade,
    'lastTrade4' => $WednesdayLastTrade,
    'lastTrade5' => $ThursdayLastTrade,
    'Prev1' => $SundayPreviousClose,
    'Prev2' => $MondayPreviousClose,
    'Prev3' => $TuesdayPreviousClose,
    'Prev4' => $WednesdayPreviousClose,
    'Prev5' => $ThursdayPreviousClose,
    'openingRate1' => $SundayOpeningPrice,
    'openingRate2' => $MondayOpeningPrice,
    'openingRate3' => $TuesdayOpeningPrice,
    'openingRate4' => $WednesdayOpeningPrice,
    'openingRate5' => $ThursdayOpeningPrice,
    'dailyHigh1' => $SundayDayHigh,
    'dailyHigh2' => $MondayDayHigh,
    'dailyHigh3' => $TuesdayDayHigh,
    'dailyHigh4' => $WednesdayDayHigh,
    'dailyHigh5' => $ThursdayDayHigh,
    'dailyLow1' => $SundayDayLow,
    'dailyLow2' => $MondayDayLow,
    'dailyLow3' => $TuesdayDayLow,
    'dailyLow4' => $WednesdayDayLow,
    'dailyLow5' => $ThursdayDayLow,
    'turnover1' => $SundayVolume,
    'turnover2' => $MondayVolume,
    'turnover3' => $TuesdayVolume,
    'turnover4' => $WednesdayVolume,
    'turnover5' => $ThursdayVolume,

];
echo json_encode($obj);

?>