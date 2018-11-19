//app JS lib
//options manual: http://www.chartjs.org/docs/latest/general/accessibility.html

//test url: https://irwebsites.co.il/workground//view/index.html

//** Globals **

  //json holders
  var json_obj = null;
  var json_obj_Month = null;
  var json_obj_3Month = null;
  var json_obj_6Month = null;
  var json_obj_Year = null;
  var json_obj_3Year = null;
  var json_obj_5Year = null;

  //Intervals
  var interval;
  var intervalMonth;
  var interval3Month;
  var interval6Month;
  var intervalYear;
  var interval3Year;
  var interval5Year;

  //Min/Max
  var weekMin;
  var weekMax;
  var monthMin;
  var monthMax;
  var month3Min;
  var month3Max;
  var month6Min;
  var month6Max;
  var yearMin;
  var yearMax;
  var year3Min;
  var year3Max;
  var year5Min;
  var year5Max;

//**  End Globals **


//Number of data types: Data build model in row: [Type1, Type2 , Type3...]
var typesNum = 3;

//Init app

function initialize(){
    document.getElementById("appCharts").style.display = 'none'; 
    callPhpWeek();
    callPhpMonth();
    callPhp3Month();
    callPhp6Month();
    callPhp3Year();
    callPhp5Year();
    callPhpYear();

    //Set zoom properties
    resetZoomWeek();
    resetZoomMonth();
    resetZoom3Month();
    resetZoom6Month();
    resetZoom3Year();
    resetZoom5Year();
    resetZoomYear();   
}


// Home functions
function resetZoomWeek() {
  window.chart.resetZoom()
}   
function resetZoomMonth() {
      window.chartMonth.resetZoom()
} 
function resetZoom3Month() {
  window.chart3Month.resetZoom()
} 
function resetZoom6Month() {
  window.chart6Month.resetZoom()
} 
function resetZoomYear() {
      window.chartYear.resetZoom()
} 
function resetZoom3Year() {
  window.chart3Year.resetZoom()
} 
function resetZoom5Year() {
  window.chart5Year.resetZoom()
} 

function finishedLoad(){
  //document.getElementById(id).style.display = 'block';
  // hide the lorem ipsum text
  document.getElementById("contentLoader").style.display = 'none'; 
  var x = document.getElementById("appCharts");
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}

// END Home functions

//*********  call PHP json data **********

//Week
function callPhpWeek(){
    var obj;
    var myjson;
    //document.getElementById("debug1").innerHTML = "callPhpWeek()";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        obj = JSON.parse(this.responseText);
        var myjson = JSON.stringify(obj);
        json_obj = myjson; //Store to global var
        //document.getElementById("debug2").innerHTML = myjson;
    }
    };
    xmlhttp.open("GET", "../php/getDataWeek.php", true);
    xmlhttp.send(); 
}

//Month
function callPhpMonth(){
  var obj;
  var myjson;
  //document.getElementById("debug3").innerHTML = "callPhpMonth()";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      var myjson = JSON.stringify(obj);
      json_obj_Month = myjson; //Store to global var
      //document.getElementById("debug4").innerHTML = myjson;
  }
  };
  xmlhttp.open("GET", "../php/getDataMonth.php", true);
  xmlhttp.send(); 
}

//3Month
function callPhp3Month(){
  var obj;
  var myjson;
  //document.getElementById("debug5").innerHTML = "callPhp3Month()";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      var myjson = JSON.stringify(obj);
      json_obj_3Month = myjson; //Store to global var
      //document.getElementById("debug6").innerHTML = myjson;
  }
  };
  xmlhttp.open("GET", "../php/getData3Month.php", true);
  xmlhttp.send(); 
}

//6Month
function callPhp6Month(){
  var obj;
  var myjson;
  //document.getElementById("debug7").innerHTML = "callPhp6Month()";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      var myjson = JSON.stringify(obj);
      json_obj_6Month = myjson; //Store to global var
      //document.getElementById("debug8").innerHTML = myjson;
  }
  };
  xmlhttp.open("GET", "../php/getData6Month.php", true);
  xmlhttp.send(); 
}

//Year
function callPhpYear(){
  var obj;
  var myjson;
  //document.getElementById("debug9").innerHTML = "TEST!";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      var myjson = JSON.stringify(obj);
      json_obj_Year = myjson; //Store to global var
      //document.getElementById("debug10").innerHTML = myjson;
  }
  };
  xmlhttp.open("GET", "../php/getDataYear.php", true);
  xmlhttp.send(); 
}

//3 Year
function callPhp3Year(){
  var obj;
  var myjson;
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      var myjson = JSON.stringify(obj);
      json_obj_3Year = myjson; //Store to global var
      
  }
  };
  xmlhttp.open("GET", "../php/getData3Year.php", true);
  xmlhttp.send(); 
}

//5 Year
function callPhp5Year(){
  var obj;
  var myjson;
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      var myjson = JSON.stringify(obj);
      json_obj_5Year = myjson; //Store to global var
      
  }
  };
  xmlhttp.open("GET", "../php/getData5Year.php", true);
  xmlhttp.send(); 
}


//*********  END call PHP json data **********

//*********  Render data using intervals *******
//Week
interval = setInterval("getResult()", 200);
function getResult()
{
    // once we get a result, turn interval off. 
  if(json_obj != null)
  {
    interval = clearInterval(interval);
    //create json from the data
    
    var newobj = JSON.parse(json_obj);

    //print the data json
    //document.getElementById("debug11").innerHTML = "newobj= " + JSON.stringify(newobj, null, 2);

    // -- Create the chart --
    createChartWeek(newobj);
  }
}

//Month
intervalMonth = setInterval("getResultMonth()", 300);
function getResultMonth()
{
    // once we get a result, turn interval off. 
  if(json_obj_Month != null)
  {
    intervalMonth = clearInterval(intervalMonth);
    //create json from the data
    
    var newobj = JSON.parse(json_obj_Month);

    //print the data json
    //document.getElementById("debug12").innerHTML = "Month newobj= " + JSON.stringify(newobj, null, 2);

    // -- Create the chart --
    createChartMonth(newobj);
  }
}

//3Month
interval3Month = setInterval("getResult3Month()", 300);
function getResult3Month()
{
    // once we get a result, turn interval off. 
  if(json_obj_3Month != null)
  {
    interval3Month = clearInterval(interval3Month);
    //create json from the data
    
    var newobj = JSON.parse(json_obj_3Month);

    //print the data json
    //document.getElementById("debug13").innerHTML = "Month newobj= " + JSON.stringify(newobj, null, 2);

    // -- Create the chart --
    createChart3Month(newobj);
  }
}

//6Month
interval6Month = setInterval("getResult6Month()", 300);
function getResult6Month()
{
    // once we get a result, turn interval off. 
  if(json_obj_6Month != null)
  {
    interval6Month = clearInterval(interval6Month);
    //create json from the data
    
    var newobj = JSON.parse(json_obj_6Month);

    //print the data json
    //document.getElementById("debug14").innerHTML = "Month newobj= " + JSON.stringify(newobj, null, 2);

    // -- Create the chart --
    createChart6Month(newobj);
  }
}


//Year
intervalYear = setInterval("getResultYear()", 400);
function getResultYear()
{
    // once we get a result, turn interval off. 
  if(json_obj_Year != null)
  {
    intervalYear = clearInterval(intervalYear);
    //create json from the data
    
    var newobj = JSON.parse(json_obj_Year);

    //print the data json
    //document.getElementById("debug15").innerHTML = "Month newobj= " + JSON.stringify(newobj, null, 2);

    // -- Create the chart --
    createChartYear(newobj);
  }
}

//3 Year
interval3Year = setInterval("getResult3Year()", 400);
function getResult3Year()
{
    // once we get a result, turn interval off. 
  if(json_obj_3Year != null)
  {
    interval3Year = clearInterval(interval3Year);
    //create json from the data
    
    var newobj = JSON.parse(json_obj_3Year);

    

    // -- Create the chart --
    createChart3Year(newobj);
  }
}

//5 Year
interval5Year = setInterval("getResult5Year()", 400);
function getResult5Year()
{
    // once we get a result, turn interval off. 
  if(json_obj_5Year != null)
  {
    interval5Year = clearInterval(interval5Year);
    //create json from the data
    
    var newobj = JSON.parse(json_obj_5Year);

    // -- Create the chart --
    createChart5Year(newobj);
  }
}


//************** Data builders *************
// Data built in php from json
// pointsShift - Used in case of data type: [X values ... Y values...]

// ** Weekly **
//Data set structure: [Dates,Vol]

//Weekly X
function buildxData(data){
    //TODO - Add shift to function arg
    var pointsShift = 0;  //X data is in the start
    var arr = [];
    var i;
    //document.getElementById("debug16").innerHTML = "Into buildxData";

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array    

    //document.getElementById("debug17").innerHTML = "Converted: " + convertToArr + "Place 0 = " + convertToArr[0];
    
    var l = convertToArr.length;
    var j = l/typesNum; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

    // Dynamic values add

    for(i=pointsShift;i<j;i++){
      arr.push(convertToArr[i]);
    }


    var finalData = [];
    for(i=0;i<arr.length;i++){
        if(arr[i]!="-"){
            finalData.push(arr[i]);
        }
    }

    //document.getElementById("debug18").innerHTML = finalData;
    return finalData;
}

//Weekly Y
function buildyData(data){
  
      //Deprecated: var pointsShift = 5;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
      var arr = [];
      var i;
      //document.getElementById("debug19").innerHTML = "Into buildyData";
      
      var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 
      
      //document.getElementById("debug20").innerHTML = "Converted: " + convertToArr + "Place 5 = " + convertToArr[pointsShift];

      var l = convertToArr.length;
      var pointsShift = l/typesNum;
      var j = l/typesNum + pointsShift; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

      // Dynamic values add

      for(i=pointsShift;i<j;i++){
        arr.push(convertToArr[i]);
      }

      var finalData = [];
      for(i=0;i<arr.length;i++){
          if(arr[i]!="-"){
              arr[i]=arr[i].replace(/\,/g,''); // remove comma
              arr[i]=parseInt(arr[i],10);
              finalData.push(arr[i]);
          }
      }

      //Dynamic graph min/max
      weekMin=finalData[0];
      weekMax=finalData[0];
      //Calculate Min val
      
      for(i=0;i<finalData.length;i++){
        weekMin = ((finalData[i] < weekMin) ? finalData[i] : weekMin);
        weekMax = ((finalData[i] > weekMax) ? finalData[i] : weekMax);
      }
      //END Dynamic graph min/max

      //document.getElementById("debug21").innerHTML = finalData;
      return finalData;
}

function weekPrevClose(data){
  
  //Deprecated: var pointsShift = 5;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
  var arr = [];
  var i;
  //document.getElementById("debug19").innerHTML = "Into buildyData";
  
  var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 
  
  //document.getElementById("debug20").innerHTML = "Converted: " + convertToArr + "Place 5 = " + convertToArr[pointsShift];

  var l = convertToArr.length;
  var pointsShift = 2*l/typesNum;
  var j = l/typesNum + pointsShift; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

  // Dynamic values add

  for(i=pointsShift;i<j;i++){
    arr.push(convertToArr[i]);
  }

  var finalData = [];
  for(i=0;i<arr.length;i++){
      if(arr[i]!="-"){
          arr[i]=arr[i].replace(/\,/g,''); // remove comma
          arr[i]=parseInt(arr[i],10);
          finalData.push(arr[i]);
      }
  }

  //document.getElementById("debug21").innerHTML = finalData;
  return finalData;
}
// ** END Weekly **


// ** Start Month ***
//Data set structure: [Dates,Vol]

//Month X
function buildxDataMonth(data){
  //TODO - Add shift to function arg
  var pointsShift = 0;  //X data is in the start
  var arr = [];
  var i;
  //document.getElementById("debug22").innerHTML = "Into buildxData";

  var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array    

  //document.getElementById("debug23").innerHTML = "Converted: " + convertToArr + "Place 0 = " + convertToArr[0];
  
  var l = convertToArr.length;
  var j = l/2; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

  // Dynamic values add

  for(i=pointsShift;i<j;i++){
    arr.push(convertToArr[i]);
  }

  var finalData = [];
  for(i=0;i<arr.length;i++){
      if(arr[i]!="-"){
          finalData.push(arr[i]);
      }
  }

  //document.getElementById("debug24").innerHTML = finalData;
  return finalData;
}

//Month Y
function buildyDataMonth(data){

    //Deprecated: var pointsShift = 21;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;
    //document.getElementById("debug25").innerHTML = "Into buildyData Month";

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 

    var l = convertToArr.length;
    var pointsShift = l/2; //Will be l/typesnum
    var j = l/2 + pointsShift; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

    // Dynamic values add

    for(i=pointsShift;i<j;i++){
      arr.push(convertToArr[i]);
    }

    var finalData = [];
    for(i=0;i<arr.length;i++){
        if(arr[i]!="-"){
            arr[i]=arr[i].replace(/\,/g,''); // remove comma
            arr[i]=parseInt(arr[i],10);
            finalData.push(arr[i]);
        }
    }

    //Dynamic graph min/max
    monthMin=finalData[0];
    monthMax=finalData[0];
    //Calculate Min val
    
    for(i=0;i<finalData.length;i++){
      monthMin = ((finalData[i] < monthMin) ? finalData[i] : monthMin);
      monthMax = ((finalData[i] > monthMax) ? finalData[i] : monthMax);
    }
    //END Dynamic graph min/max

    //document.getElementById("debug26").innerHTML = "Max val: " + monthMax + "Min Val = " + monthMin;
    //document.getElementById("debug27").innerHTML = "Month Y Data final data:" + finalData;
    return finalData;
}
// ** END Monthly **


// ** Start 3 Months ***
//Data set structure: [Dates,Vol]

//3 Month X
function buildxData3Month(data){
  //TODO - Add shift to function arg
  var pointsShift = 0;  //X data is in the start
  var arr = [];
  var i;
  //document.getElementById("debug28").innerHTML = "Into buildxData";

  var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array    

  //document.getElementById("debug29").innerHTML = "Converted: " + convertToArr + "Place 0 = " + convertToArr[0];
  
  var l = convertToArr.length;
  var j = l/2; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

  // Dynamic values add

  for(i=pointsShift;i<j;i++){
    arr.push(convertToArr[i]);
  }

  var finalData = [];
  for(i=0;i<arr.length;i++){
      if(arr[i]!="-"){
          finalData.push(arr[i]);
      }
  }

  //document.getElementById("debug30").innerHTML = finalData;
  return finalData;
}

//3 Month Y
function buildyData3Month(data){

    //Deprecated: var pointsShift = 21;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;
    //document.getElementById("debug31").innerHTML = "Into buildyData Month";

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 

    var l = convertToArr.length;
    var pointsShift = l/2; //Will be l/typesnum
    var j = l/2 + pointsShift; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

    // Dynamic values add

    for(i=pointsShift;i<j;i++){
      arr.push(convertToArr[i]);
    }

    var finalData = [];
    for(i=0;i<arr.length;i++){
        if(arr[i]!="-"){
            arr[i]=arr[i].replace(/\,/g,''); // remove comma
            arr[i]=parseInt(arr[i],10);
            finalData.push(arr[i]);
        }
    }

    //Dynamic graph min/max
    month3Min=finalData[0];
    month3Max=finalData[0];
    //Calculate Min val
    
    for(i=0;i<finalData.length;i++){
      month3Min = ((finalData[i] < month3Min) ? finalData[i] : month3Min);
      month3Max = ((finalData[i] > month3Max) ? finalData[i] : month3Max);
    }
    //END Dynamic graph min/max

    //document.getElementById("debug32").innerHTML = "month3Max val: " + month3Max + "month3Min Val = " + month3Min;
    //document.getElementById("debug33").innerHTML = "3 Month Y Data final data:" + finalData;
    return finalData;
}
// ** END 3 Months **


// ** Start 6 Months ***
//Data set structure: [Dates,Vol]

//6 Month X
function buildxData6Month(data){
  //TODO - Add shift to function arg
  var pointsShift = 0;  //X data is in the start
  var arr = [];
  var i;
  //document.getElementById("debug34").innerHTML = "Into buildxData";

  var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array    

  //document.getElementById("debug35").innerHTML = "Converted: " + convertToArr + "Place 0 = " + convertToArr[0];
  
  var l = convertToArr.length;
  var j = l/2; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

  // Dynamic values add

  for(i=pointsShift;i<j;i++){
    arr.push(convertToArr[i]);
  }

  var finalData = [];
  for(i=0;i<arr.length;i++){
      if(arr[i]!="-"){
          finalData.push(arr[i]);
      }
  }

  //document.getElementById("debug36").innerHTML = finalData;
  return finalData;
}

//6 Month Y
function buildyData6Month(data){

    //Deprecated: var pointsShift = 21;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;
    //document.getElementById("debug37").innerHTML = "Into buildyData 6 Month";

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 

    var l = convertToArr.length;
    var pointsShift = l/2; //Will be l/typesnum
    var j = l/2 + pointsShift; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

    // Dynamic values add

    for(i=pointsShift;i<j;i++){
      arr.push(convertToArr[i]);
    }

    var finalData = [];
    for(i=0;i<arr.length;i++){
        if(arr[i]!="-"){
            arr[i]=arr[i].replace(/\,/g,''); // remove comma
            arr[i]=parseInt(arr[i],10);
            finalData.push(arr[i]);
        }
    }

    //Dynamic graph min/max
    month6Min=finalData[0];
    month6Max=finalData[0];
    //Calculate Min val
    
    for(i=0;i<finalData.length;i++){
      month6Min = ((finalData[i] < month6Min) ? finalData[i] : month6Min);
      month6Max = ((finalData[i] > month6Max) ? finalData[i] : month6Max);
    }
    //END Dynamic graph min/max

    //document.getElementById("debug38").innerHTML = "month3Max val: " + month3Max + "month3Min Val = " + month3Min;
    //document.getElementById("debug39").innerHTML = "3 Month Y Data final data:" + finalData;
    return finalData;
}
// ** END 3 Months **


// ** Start Yearly ***
//Data set structure: [Dates,Vol]

//YEAR X
function buildxDataYear(data){
  //TODO - Add shift to function arg
  var pointsShift = 0;  //X data is in the start
  var arr = [];
  var i;
  //document.getElementById("debug40").innerHTML = "Into buildxData";

  var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array    

  //document.getElementById("debug41").innerHTML = "Converted: " + convertToArr + "Place 0 = " + convertToArr[0];
  
  var l = convertToArr.length;
  var j = l/2; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

  // Dynamic values add

  for(i=pointsShift;i<j;i++){
    arr.push(convertToArr[i]);
  }


  var finalData = [];
  for(i=0;i<arr.length;i++){
      if(arr[i]!="-"){
          finalData.push(arr[i]);
      }
  }

  //document.getElementById("debug42").innerHTML = finalData;
  return finalData;
}

//YEAR Y
function buildyDataYear(data){
   
    //Deprecated: var pointsShift = 21;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;
    //document.getElementById("debug43").innerHTML = "Into buildyData";

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 

    //document.getElementById("debug44").innerHTML = "Converted: " + convertToArr + "Place 5 = " + convertToArr[pointsShift];

    var l = convertToArr.length;
    var pointsShift = l/2; //Will be l/typesnum
    var j = l/2 + pointsShift; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

    // Dynamic values add

    for(i=pointsShift;i<j;i++){
      arr.push(convertToArr[i]);
    }

    var finalData = [];
    for(i=0;i<arr.length;i++){
        if(arr[i]!="-"){
            arr[i]=arr[i].replace(/\,/g,''); // remove comma
            arr[i]=parseInt(arr[i],10);
            finalData.push(arr[i]);
        }
    }

    //Dynamic graph min/max
      yearMin=finalData[0];
      yearMax=finalData[0];
    //Calculate Min val
          
    for(i=0;i<finalData.length;i++){
      yearMin = ((finalData[i] < yearMin) ? finalData[i] : yearMin);
      yearMax = ((finalData[i] > yearMax) ? finalData[i] : yearMax);
    }
    //END Dynamic graph min/max

    //document.getElementById("debug45").innerHTML = finalData;
    return finalData;
}
// ** END Yearly **

// ** Start 3 Years ***
//Data set structure: [Dates,Vol]

//3 YEARS X
function buildxData3Year(data){
  //TODO - Add shift to function arg
  var pointsShift = 0;  //X data is in the start
  var arr = [];
  var i;
  
  var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array    
 
  var l = convertToArr.length;
  var j = l/2; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

  // Dynamic values add

  for(i=pointsShift;i<j;i++){
    arr.push(convertToArr[i]);
  }

  var finalData = [];
  for(i=0;i<arr.length;i++){
      if(arr[i]!="-"){
          finalData.push(arr[i]);
      }
  }
  
  return finalData;
}

//3 YEARS Y
function buildyData3Year(data){
   
    //Deprecated: var pointsShift = 21;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 

    var l = convertToArr.length;
    var pointsShift = l/2; //Will be l/typesnum
    var j = l/2 + pointsShift; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

    // Dynamic values add

    for(i=pointsShift;i<j;i++){
      arr.push(convertToArr[i]);
    }

    var finalData = [];
    for(i=0;i<arr.length;i++){
        if(arr[i]!="-"){
            arr[i]=arr[i].replace(/\,/g,''); // remove comma
            arr[i]=parseInt(arr[i],10);
            finalData.push(arr[i]);
        }
    }

    //Dynamic graph min/max
      year3Min=finalData[0];
      year3Max=finalData[0];
    //Calculate Min val
          
    for(i=0;i<finalData.length;i++){
      year3Min = ((finalData[i] < year3Min) ? finalData[i] : year3Min);
      year3Max = ((finalData[i] > year3Max) ? finalData[i] : year3Max);
    }
    //END Dynamic graph min/max

    return finalData;
}
// ** END 3 Years **

// ** Start 5 Years ***
//Data set structure: [Dates,Vol]

//5 YEARS X
function buildxData5Year(data){
  //TODO - Add shift to function arg
  var pointsShift = 0;  //X data is in the start
  var arr = [];
  var i;
  
  var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array    
 
  var l = convertToArr.length;
  var j = l/2; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

  // Dynamic values add

  for(i=pointsShift;i<j;i++){
    arr.push(convertToArr[i]);
  }

  var finalData = [];
  for(i=0;i<arr.length;i++){
      if(arr[i]!="-"){
          finalData.push(arr[i]);
      }
  }
  
  return finalData;
}

//3 YEARS Y
function buildyData5Year(data){
   
    //Deprecated: var pointsShift = 21;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 

    var l = convertToArr.length;
    var pointsShift = l/2; //Will be l/typesnum
    var j = l/2 + pointsShift; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var

    // Dynamic values add

    for(i=pointsShift;i<j;i++){
      arr.push(convertToArr[i]);
    }

    var finalData = [];
    for(i=0;i<arr.length;i++){
        if(arr[i]!="-"){
            arr[i]=arr[i].replace(/\,/g,''); // remove comma
            arr[i]=parseInt(arr[i],10);
            finalData.push(arr[i]);
        }
    }

    //Dynamic graph min/max
      year5Min=finalData[0];
      year5Max=finalData[0];
    //Calculate Min val
          
    for(i=0;i<finalData.length;i++){
      year5Min = ((finalData[i] < year5Min) ? finalData[i] : year5Min);
      year5Max = ((finalData[i] > year5Max) ? finalData[i] : year5Max);
    }
    //END Dynamic graph min/max

    return finalData;
}
// ** END 5 Years **


//END Data builders ***************************

//**************** Chart builder  ****************

// **** START Create Week chart *****
function createChartWeek(dataset){

        //x axis values
        var x_data = buildxData(dataset);
        var y_data = buildyData(dataset);
        var prevClose_data = weekPrevClose(dataset);
       //chart Object init

       //Week data
       data = {
        labels: x_data,
        datasets: []
      };

      //build generic graph objects
      var graph = 
      { 
        data: [],
        label: "",
        borderColor: "",
        lineTension: 0,
        fill: false
      };
      var options = {
        pan: {
          enabled: true,
          mode: 'x'
        },
        zoom: {
          enabled: true,
          drag: true,
          mode: 'x',
          limits: {
            max: 1.5,
            min: 0.5
          }
        },
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            title: function(tooltipItem, data) {
              return data['labels'][tooltipItem[0]['index']];
            },
            //Commas in tooltip
            label: function(tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index];
              if(parseInt(value) >= 1000){
                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      } else {
                        return '$' + value;
                      }
            },
            label: function(tooltipItems, data) { 
              var multistringText = ["Lock Rate: $" + tooltipItems.yLabel];
                  multistringText.push('Previous Close: $' + prevClose_data[tooltipItems.index]);

                  //Print vals in box
                  document.getElementById("weekDate").innerHTML = 'Date: ' + x_data[tooltipItems.index];
                  document.getElementById("weekLockRate").innerHTML = 'Lock Rate: $' + tooltipItems.yLabel;
                  document.getElementById("weekPrevClose").innerHTML = 'Previous Close: $' + prevClose_data[tooltipItems.index];

               return multistringText;
            }
            //** TODO: Add more properties in tooltip */
          }
        },
        legend: {
          display: true,
          labels: {
              position: top,
              fontColor: '#0F4468',
          }
        },
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              padding: 1,
              min: weekMin - 50,
              max: weekMax + 50,
              stepSize: 20,
              //Add commas to the scale
              userCallback: function(value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(',');
                return value;
            }
            },
            gridLines: {
              display: true,
              color: "#B8D7EC"
            }
          }],
          xAxes: [{
            barThickness : 70,
            gridLines: {
              display: true,
              color: "#B8D7EC"
            }
          }]
        }};

      //*** create new graph object ***

      var graphWeek = Object.create(graph);
      graphWeek.data = y_data;
      graphWeek.label = "Week Lock Rate - Bar";
      graphWeek.fill = true;
      graphWeek.borderColor = "#0F4468";
      graphWeek.borderWidth = "1";
      graphWeek.pointRadius= "5";
      graphWeek.pointHoverRadius= "7";
      graphWeek.pointHoverBackgroundColor = "#8291C7";
      graphWeek.pointHoverBorderColor = "#8291C7";

      var graphWeek2 = Object.create(graph);
      graphWeek2.data = y_data;
      graphWeek2.type = 'line';
      graphWeek2.label = "Week Lock Rate - Line";
      graphWeek2.fill = false;
      graphWeek2.borderColor = "#3158C7";
      graphWeek2.borderWidth = "1";
      graphWeek2.pointRadius= "5";
      graphWeek2.pointHoverRadius= "7";
      graphWeek2.pointHoverBackgroundColor = "#8291C7";
      graphWeek2.pointHoverBorderColor = "#8291C7";


      //*** add graphs ***
      data.datasets.push(graphWeek);
      data.datasets.push(graphWeek2);
      
      //*** Build the chart  ***
      //Week
      window.chart = new Chart(document.getElementById("chart"), {
        type: 'bar',
        options: options,
        data: data
      });  

    }
// **** END Create week chart *****


// **** START Create Month chart *****
function createChartMonth(dataset){
  
  //document.getElementById("debug46").innerHTML = "Into createChartMonth()";
    //x axis values
    var x_data = buildxDataMonth(dataset);
    var y_data = buildyDataMonth(dataset);

    //document.getElementById("debug47").innerHTML = "x data Month:" + x_data;
    //document.getElementById("debug48").innerHTML = "y data Month:" + y_data;

    //chart Object init

    //Month data
    data = {
      labels: x_data,
      datasets: []
    };

    //build generic graph objects
    var graph = 
    { 
      data: [],
      label: "",
      borderColor: "",
      lineTension: 0,
      fill: false
    };
    var options = {
      pan: {
        enabled: true,
        mode: 'x'
      },
      zoom: {
        enabled: true,
        drag: true,
        mode: 'x',
        limits: {
          max: 1,
          min: 0.5
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']];
          },
          //Commas in tooltip
          label: function(tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index];
            if(parseInt(value) >= 1000){
                       return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                       return '$' + value;
                    }
        }
        //** TODO: Add more properties in tooltip */
        }
      },
      
      legend: {
        display: true,
        labels: {
            position: top,
            fontColor: '#0F4468',
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            padding: 1,
            min: monthMin - 50,
            max: monthMax + 50,
            stepSize: 20,
            //Add commas to the scale
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
          }
          },
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }]
      }};

    //*** create new graph object ***

    var graphMonth = Object.create(graph);
    graphMonth.data = y_data;
    graphMonth.label = "Month Lock Rate Statisctics";
    graphMonth.fill = true;
    graphMonth.borderColor = "#3FCA34";
    graphMonth.borderWidth = "1";
    graphMonth.pointRadius= "5";
    graphMonth.pointHoverRadius= "7";
    graphMonth.pointHoverBackgroundColor = "#74D16D";
    graphMonth.pointHoverBorderColor = "#5DED52";

    //*** add graphs ***
    data.datasets.push(graphMonth);

    //*** Build the chart  ***
     //Month
     window.chartMonth = new Chart(document.getElementById("chartMonth"), {
      type: 'line',
      options: options,
      data: data
    });  

}
// **** END Create month chart *****


// **** START Create 3 Month chart *****
function createChart3Month(dataset){
  
  //document.getElementById("debug49").innerHTML = "Into createChart3Month()";
    //x axis values
    var x_data = buildxData3Month(dataset);
    var y_data = buildyData3Month(dataset);

    //document.getElementById("debug50").innerHTML = "x data 3 Month:" + x_data;
    //document.getElementById("debug51").innerHTML = "y data 3 Month:" + y_data;

    //chart Object init

    //3 Month data
    data = {
      labels: x_data,
      datasets: []
    };

    //build generic graph objects
    var graph = 
    { 
      data: [],
      label: "",
      borderColor: "",
      lineTension: 0,
      fill: false
    };
    var options = {
      pan: {
        enabled: true,
        mode: 'x'
      },
      zoom: {
        enabled: true,
        drag: true,
        mode: 'x',
        limits: {
          max: 1,
          min: 0.5
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']];
          },
          //Commas in tooltip
          label: function(tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index];
            if(parseInt(value) >= 1000){
                       return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                       return '$' + value;
                    }
        }
        //** TODO: Add more properties in tooltip */
        }
      },
      
      legend: {
        display: true,
        labels: {
            position: top,
            fontColor: '#0F4468',
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            padding: 1,
            min: month3Min - 50,
            max: month3Max + 50,
            stepSize: 20,
            //Add commas to the scale
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
          }
          },
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }]
      }};

    //*** create new graph object ***
    
    var graph3Month = Object.create(graph);
    graph3Month.data = y_data;
    graph3Month.label = "3 Months Lock Rate Statisctics";
    graph3Month.fill = true;
    graph3Month.borderColor = "#FF4E00";
    graph3Month.borderWidth = "1";
    graph3Month.pointRadius= "4";
    graph3Month.pointHoverRadius= "6";
    graph3Month.pointHoverBackgroundColor = "#863E1E";
    graph3Month.pointHoverBorderColor = "#C5714C";

    //*** add graphs ***
    data.datasets.push(graph3Month);

    //*** Build the chart  ***
     //Month
     window.chart3Month = new Chart(document.getElementById("chart3Month"), {
      type: 'line',
      options: options,
      data: data
    });  

}
// **** END Create 3 month chart *****

// **** START Create 6 Month chart *****
function createChart6Month(dataset){
  
  //document.getElementById("debug52").innerHTML = "Into createChart3Month()";
    //x axis values
    var x_data = buildxData6Month(dataset);
    var y_data = buildyData6Month(dataset);

    //document.getElementById("debug53").innerHTML = "x data 6 Month:" + x_data;
    //document.getElementById("debug54").innerHTML = "y data 6 Month:" + y_data;

    //chart Object init

    //3 Month data
    data = {
      labels: x_data,
      datasets: []
    };

    //build generic graph objects
    var graph = 
    { 
      data: [],
      label: "",
      borderColor: "",
      lineTension: 0,
      fill: false
    };
    var options = {
      pan: {
        enabled: true,
        mode: 'x'
      },
      zoom: {
        enabled: true,
        drag: true,
        mode: 'x',
        limits: {
          max: 1,
          min: 0.5
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']];
          },
          //Commas in tooltip
          label: function(tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index];
            if(parseInt(value) >= 1000){
                       return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                       return '$' + value;
                    }
        }
        //** TODO: Add more properties in tooltip */
        }
      },
      
      legend: {
        display: true,
        labels: {
            position: top,
            fontColor: '#0F4468',
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            padding: 1,
            min: month6Min - 50,
            max: month6Max + 50,
            stepSize: 20,
            //Add commas to the scale
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
          }
          },
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }]
      }};

    //*** create new graph object ***
    
    var graph6Month = Object.create(graph);
    graph6Month.data = y_data;
    graph6Month.label = "6 Months Lock Rate Statisctics";
    graph6Month.fill = true;
    graph6Month.borderColor = "#C54CC1";
    graph6Month.borderWidth = "1";
    graph6Month.pointRadius= "3";
    graph6Month.pointHoverRadius= "5";
    graph6Month.pointHoverBackgroundColor = "#6F146C";
    graph6Month.pointHoverBorderColor = "#AC73AA";

    //*** add graphs ***
    data.datasets.push(graph6Month);

    //*** Build the chart  ***
     //Month
     window.chart6Month = new Chart(document.getElementById("chart6Month"), {
      type: 'line',
      options: options,
      data: data
    });  

}
// **** END Create 3 month chart *****


// **** START Create Year chart *****
function createChartYear(dataset){
  
  //document.getElementById("debug55").innerHTML = "Into createChartYear()";
    //x axis values
    var x_data = buildxDataYear(dataset);
    var y_data = buildyDataYear(dataset);


    //chart Object init

    //Month data
    data = {
      labels: x_data,
      datasets: []
    };

    //build generic graph objects
    var graph = 
    { 
      data: [],
      label: "",
      borderColor: "",
      lineTension: 0,
      fill: false
    };
    var options = {
      pan: {
        enabled: true,
        mode: 'x',
        rangeMin: {
          // Format of min pan range depends on scale type
          x: null,
          y: null
        },
        rangeMax: {
          // Format of max pan range depends on scale type
          x: null,
          y: null
        },
      },
      zoom: {
        enabled: true,
        //drag: true,
        mode: 'x',
        rangeMin: {
          // Format of min zoom range depends on scale type
          x: null,
          y: null
        },
        rangeMax: {
          // Format of max zoom range depends on scale type
          x: null,
          y: null
        },
        limits: {
          max: 1.5,
          min: 0.5
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']];
          },
          //Commas in tooltip
          label: function(tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index];
            if(parseInt(value) >= 1000){
                       return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                       return '$' + value;
                    }
        }
        //** TODO: Add more properties in tooltip */
        }
      },
      
      legend: {
        display: true,
        labels: {
            position: top,
            fontColor: '#0F4468',
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            padding: 1,
            min: yearMin - 50,
            max: yearMax + 50,
            stepSize: 40,
            //Add commas to the scale
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
          }
          },
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }]
      }};

    //*** create new graph object ***

    var graphYear = Object.create(graph);
    graphYear.data = y_data;
    graphYear.label = "Year Lock Rate Statisctics";
    graphYear.fill = true;
    graphYear.borderColor = "#D01D1D";
    graphYear.borderWidth = "1";
    graphYear.pointRadius= "2";
    graphYear.pointHoverRadius= "3";
    graphYear.pointHoverBackgroundColor = "#CE5050";
    graphYear.pointHoverBorderColor = "#E17272";
    graphYear.scaleOverride= true;

    //*** add graphs ***
    data.datasets.push(graphYear);

    //*** Build the chart  ***
     //Year
     window.chartYear = new Chart(document.getElementById("chartYear"), {
      type: 'line',
      options: options,
      data: data
    });  

    //Finished loading the app
    finishedLoad();
}
// **** END Create Year chart *****

// **** START Create 3 Years chart *****
function createChart3Year(dataset){

    //x axis values
    var x_data = buildxData3Year(dataset);
    var y_data = buildyData3Year(dataset);

    
    //chart Object init

    //Month data
    data = {
      labels: x_data,
      datasets: []
    };

    //build generic graph objects
    var graph = 
    { 
      data: [],
      label: "",
      borderColor: "",
      lineTension: 0,
      fill: false
    };
    var options = {
      pan: {
        enabled: true,
        mode: 'x',
        rangeMin: {
          // Format of min pan range depends on scale type
          x: null,
          y: null
        },
        rangeMax: {
          // Format of max pan range depends on scale type
          x: null,
          y: null
        },
      },
      zoom: {
        enabled: true,
        //drag: true,
        mode: 'x',
        rangeMin: {
          // Format of min zoom range depends on scale type
          x: null,
          y: null
        },
        rangeMax: {
          // Format of max zoom range depends on scale type
          x: null,
          y: null
        },
        limits: {
          max: 1.5,
          min: 0.5
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']];
          },
          //Commas in tooltip
          label: function(tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index];
            if(parseInt(value) >= 1000){
                       return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                       return '$' + value;
                    }
        }
        //** TODO: Add more properties in tooltip */
        }
      },
      
      legend: {
        display: true,
        labels: {
            position: top,
            fontColor: '#0F4468',
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            padding: 1,
            min: year3Min - 50,
            max: year3Max + 50,
            stepSize: 40,
            //Add commas to the scale
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
          }
          },
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }]
      }};

    //*** create new graph object ***

    var graph3Year = Object.create(graph);
    graph3Year.data = y_data;
    graph3Year.label = "3 Years Lock Rate Statisctics";
    graph3Year.fill = true;
    graph3Year.borderColor = "#09dae5";
    graph3Year.borderWidth = "1";
    graph3Year.pointRadius= "1";
    graph3Year.pointHoverRadius= "1.5";
    graph3Year.pointHoverBackgroundColor = "#71d8dd";
    graph3Year.pointHoverBorderColor = "#73b4b7";
    graph3Year.scaleOverride= true;

    //*** add graphs ***
    data.datasets.push(graph3Year);

    //*** Build the chart  ***
     //Year
     window.chart3Year = new Chart(document.getElementById("chart3Year"), {
      type: 'line',
      options: options,
      data: data
    });  

}
// **** END Create 3 Years chart *****


// **** START Create 5 Years chart *****
function createChart5Year(dataset){

  //x axis values
  var x_data = buildxData5Year(dataset);
  var y_data = buildyData5Year(dataset);


  //chart Object init

  //Month data
  data = {
    labels: x_data,
    datasets: []
  };

  //build generic graph objects
  var graph = 
  { 
    data: [],
    label: "",
    borderColor: "",
    lineTension: 0,
    fill: false
  };
  var options = {
    pan: {
      enabled: true,
      mode: 'x',
      rangeMin: {
        // Format of min pan range depends on scale type
        x: null,
        y: null
      },
      rangeMax: {
        // Format of max pan range depends on scale type
        x: null,
        y: null
      },
    },
    zoom: {
      enabled: true,
      //drag: true,
      mode: 'x',
      rangeMin: {
        // Format of min zoom range depends on scale type
        x: null,
        y: null
      },
      rangeMax: {
        // Format of max zoom range depends on scale type
        x: null,
        y: null
      },
      limits: {
        max: 1.5,
        min: 0.5
      }
    },
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        //Commas in tooltip
        label: function(tooltipItem, data) {
          var value = data.datasets[0].data[tooltipItem.index];
          if(parseInt(value) >= 1000){
                     return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  } else {
                     return '$' + value;
                  }
      }
      //** TODO: Add more properties in tooltip */
      }
    },
    
    legend: {
      display: true,
      labels: {
          position: top,
          fontColor: '#0F4468',
      }
    },
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          padding: 1,
          min: year5Min - 50,
          max: year5Max + 50,
          stepSize: 40,
          //Add commas to the scale
          userCallback: function(value, index, values) {
            value = value.toString();
            value = value.split(/(?=(?:...)*$)/);
            value = value.join(',');
            return value;
        }
        },
        gridLines: {
          display: true,
          color: "#B8D7EC"
        }
      }],
      xAxes: [{
        gridLines: {
          display: true,
          color: "#B8D7EC"
        }
      }]
    }};

  //*** create new graph object ***

  var graph5Year = Object.create(graph);
  graph5Year.data = y_data;
  graph5Year.label = "5 Years Lock Rate Statisctics";
  graph5Year.fill = true;
  graph5Year.borderColor = "#9242f4";
  graph5Year.borderWidth = "1";
  graph5Year.pointRadius= "1";
  graph5Year.pointHoverRadius= "1.5";
  graph5Year.pointHoverBackgroundColor = "#9975c4";
  graph5Year.pointHoverBorderColor = "#bfa8db";
  graph5Year.scaleOverride= true;

  //*** add graphs ***
  data.datasets.push(graph5Year);

  //*** Build the chart  ***
   //Year
   window.chart5Year = new Chart(document.getElementById("chart5Year"), {
    type: 'line',
    options: options,
    data: data
  });  

}
// **** END Create 5 Years chart *****

