//app JS lib
//options manual: http://www.chartjs.org/docs/latest/general/accessibility.html

//test url: https://irwebsites.co.il/workground/index.html

//Globals
var json_obj = null;
var interval;

function initialize(){
    
    callPhp();
}

//call PHP json data

function callPhp(){
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
    xmlhttp.open("GET", "getData.php", true);
    xmlhttp.send(); 

}

interval = setInterval("getResult()", 200);
function getResult()
{
    // once we get a result, turn interval off. 
  if(json_obj != null)
  {
    interval = clearInterval(interval);
    //create json from the data
    var newobj = JSON.parse(json_obj);
    createChart(newobj);
  }
}

//Data builders
function buildxData(data){
    var arr = [];
    var i;
    document.getElementById("debug5").innerHTML = "Into buildxData";
    
    arr.push(data.date1);
    arr.push(data.date2);
    arr.push(data.date3);
    arr.push(data.date4);
    arr.push(data.date5);

    document.getElementById("debug6").innerHTML = arr;
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


function buildyData(data){
  var arr = [];
  var i;
  document.getElementById("debug8").innerHTML = "Into buildyData";
  
  arr.push(data.vol1);
  arr.push(data.vol2);
  arr.push(data.vol3);
  arr.push(data.vol4);
  arr.push(data.vol5);

  document.getElementById("debug9").innerHTML = arr;
  var finalData = [];
  for(i=0;i<arr.length;i++){
      if(arr[i]!="-"){
          finalData.push(arr[i]);
      }
  }

  //var finalData = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
  document.getElementById("debug10").innerHTML = finalData;
  return finalData;
}


//Chart builder
function createChart(dataset){
  //document.getElementById("debug4").innerHTML = dataset;
        //x axis values
        var x_data = buildxData(dataset);
       //chart Object init
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
        fill: false
      };
      var options = {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: true,
              color: "#B8D7EC"
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }};

      //create new graph object
      var graph01 = Object.create(graph);
      graph01.data = [200,1200,4052,7521,1025,2555,3654,4562,2478,1256];
      graph01.label = "Akko";
      graph01.borderColor = "#124784";

      var graph02 = Object.create(graph);
      //graph02.data = [40,20,1000,16,24,2000,74,4500,508,784];
      graph02.data = [40,20,40,30,45];
      graph02.label = "Weekly";
      graph02.borderColor = "#128435";

      //add graphs
      //data.datasets.push(graph01);
      data.datasets.push(graph02);
      
      //Build the chart
      new Chart(document.getElementById("chart"), {
        type: 'line',
        options: options,
        data: data
      });  
}

