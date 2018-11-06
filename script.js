//app JS lib
//options manual: http://www.chartjs.org/docs/latest/general/accessibility.html

//test url: https://irwebsites.co.il/workground/index.html

//Globals
var json_obj;

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

    createChart();
    
}

//Data builders
function buildxData(){
    //document.getElementById("debug3").innerHTML = "Into buildxData";
    //var data = callPhp();
    //document.getElementById("debug4").innerHTML = data.date1;
    //var arr = [];
    //arr.push(data.date1);
    //arr.push(data.date2);
    //arr.push(data.date3);
    //arr.push(data.date4);
    //arr.push(data.date5);

    //var finalData = [];
    //for(i=0;i<arr.length();i++){
    //    if(arr[i]!="-"){
    //        finalData.push(arr[i]);
    //    }
    //}

    var data = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
    document.getElementById("debug4").innerHTML = "Using json data";
    document.getElementById("debug4").innerHTML = json_obj;
    return data;
}

//function buildyData(){
//    var data = callPhp()
//    return data;
//}


//Chart builder
function createChart(){
        //x axis values
        var x_data = buildxData();
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
              color: "rgba(255,99,132,0.2)"
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
      graph01.borderColor = "#CAD118";

      var graph02 = Object.create(graph);
      graph02.data = [40,20,1000,16,24,2000,74,4500,508,784];
      //graph02.data = [40,20];
      graph02.label = "Haifa";
      graph02.borderColor = "#c45850";

      //add graphs
      data.datasets.push(graph01);
      data.datasets.push(graph02);
      
      //Build the chart
      new Chart(document.getElementById("chart"), {
        type: 'line',
        options: options,
        data: data
      });  
}

