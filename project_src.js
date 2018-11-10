//app JS lib
//options manual: http://www.chartjs.org/docs/latest/general/accessibility.html

//test url: https://irwebsites.co.il/workground/index.html

//Globals
var json_obj = null;
var json_obj_Month = null;
var interval;
var intervalMonth;

//Number of data types: Data build model in row: [Type1, Type2 , Type3...]
var typesNum = 3;

function initialize(){
    
    callPhpWeek();
    callPhpMonth();
}

//*********  call PHP json data **********

//Week
function callPhpWeek(){
    var obj;
    var myjson;
    document.getElementById("debug1").innerHTML = "TEST!";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        obj = JSON.parse(this.responseText);
        var myjson = JSON.stringify(obj);
        json_obj = myjson; //Store to global var
        document.getElementById("debug2").innerHTML = myjson;
    }
    };
    xmlhttp.open("GET", "getDataWeek.php", true);
    xmlhttp.send(); 
}

//Month
function callPhpMonth(){
  var obj;
  var myjson;
  //document.getElementById("debug1").innerHTML = "TEST!";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(this.responseText);
      var myjson = JSON.stringify(obj);
      json_obj_Month = myjson; //Store to global var
      //document.getElementById("debug2").innerHTML = myjson;
  }
  };
  xmlhttp.open("GET", "getDataMonth.php", true);
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
    document.getElementById("debug4").innerHTML = "newobj= " + JSON.stringify(newobj, null, 2);

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
    document.getElementById("debug11").innerHTML = "Month newobj= " + JSON.stringify(newobj, null, 2);

    // -- Create the chart --
    createChartMonth(newobj);
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
    document.getElementById("debug5").innerHTML = "Into buildxData";

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array    

    document.getElementById("debug6").innerHTML = "Converted: " + convertToArr + "Place 0 = " + convertToArr[0];
    
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

    //var finalData = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
    document.getElementById("debug7").innerHTML = finalData;
    return finalData;
}

//Weekly Y
function buildyData(data){
  
  //Deprecated: var pointsShift = 5;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
  var arr = [];
  var i;
  document.getElementById("debug8").innerHTML = "Into buildyData";
  
  var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 
  
  document.getElementById("debug9").innerHTML = "Converted: " + convertToArr + "Place 5 = " + convertToArr[pointsShift];

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

  //var finalData = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
  document.getElementById("debug10").innerHTML = finalData;
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
  //document.getElementById("debug5").innerHTML = "Into buildxData";

  var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array    

  //document.getElementById("debug6").innerHTML = "Converted: " + convertToArr + "Place 0 = " + convertToArr[0];
  
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

  //var finalData = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
  //document.getElementById("debug7").innerHTML = finalData;
  return finalData;
}

//Month Y
function buildyDataMonth(data){

    //Deprecated: var pointsShift = 21;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;
    //document.getElementById("debug8").innerHTML = "Into buildyData";

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 

    //document.getElementById("debug9").innerHTML = "Converted: " + convertToArr + "Place 5 = " + convertToArr[pointsShift];

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

    //var finalData = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
    //document.getElementById("debug10").innerHTML = finalData;
    return finalData;
}
// ** END Monthly **

//END Data builders ***************************

//**************** Chart builder  ****************

// **** START Create Week chart *****
function createChartWeek(dataset){
  
        //x axis values
        var x_data = buildxData(dataset);
        var y_data = buildyData(dataset);
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
              min: 0,
              stepSize: 70000,
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

      var graphWeek = Object.create(graph);
      graphWeek.data = y_data;
      graphWeek.label = "Last Week Statistics";
      graphWeek.fill = true;
      graphWeek.borderColor = "#0F4468";
      graphWeek.borderWidth = "1";
      graphWeek.pointRadius= "5";
      graphWeek.pointHoverRadius= "7";
      graphWeek.pointHoverBackgroundColor = "#8291C7";
      graphWeek.pointHoverBorderColor = "#8291C7";

      //*** add graphs ***
      data.datasets.push(graphWeek);
      
      //*** Build the chart  ***
      //Week
      new Chart(document.getElementById("chart"), {
        type: 'line',
        options: options,
        data: data
      });  

    }
// **** END Create week chart *****


// **** START Create Month chart *****
function createChartMonth(dataset){
  
  document.getElementById("debug12").innerHTML = "Into createChartMonth()";
    //x axis values
    var x_data = buildxDataMonth(dataset);
    var y_data = buildyDataMonth(dataset);

    document.getElementById("debug13").innerHTML = "x data Month:" + x_data;
    document.getElementById("debug14").innerHTML = "y data Month:" + y_data;

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
            min: 0,
            stepSize: 100000,
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
    graphMonth.label = "Last Month Statisctics";
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
    new Chart(document.getElementById("chartMonth"), {
      type: 'line',
      options: options,
      data: data
    });  

}

// **** END Create month chart *****

