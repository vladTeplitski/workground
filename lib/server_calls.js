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
    xmlhttp.open("GET", "../php/getDataWeek_build.php", true);
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

//Daily
function callPhpDaily(){
  var obj;
  var myjson;
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      var myjson = JSON.stringify(obj);
      json_obj_Daily = myjson; //Store to global var
      
  }
  };
  xmlhttp.open("GET", "../php/getDataDaily.php", true);
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

//Daily
interval5Year = setInterval("getResultDaily()", 400);
function getResultDaily()
{
    // once we get a result, turn interval off. 
  if(json_obj_Daily != null)
  {
    intervalDaily = clearInterval(intervalDaily);
    //create json from the data
    
    var newobj = JSON.parse(json_obj_Daily);

    // -- Create the chart --
    createChartDaily(newobj);
  }
}