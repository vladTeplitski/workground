//app JS lib
//manual: http://www.chartjs.org/docs/latest/general/accessibility.html

function initialize(){
    createChart();
}

function createChart(){
        //x axis values
       var x_data = [1501,1600,1700,1750,1800,1850,1900,1950,1999,2050];

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