//app JS lib
//options manual: http://www.chartjs.org/docs/latest/general/accessibility.html

//test url: https://irwebsites.co.il/workground//view/index.html

//Libraries:
//data_builders.js
//server_calls.js
//Main: project_src.js

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

  document.getElementById("contentLoader").style.display = 'none'; 
  var x = document.getElementById("appCharts");
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}

// END Home functions

//Custom Modification Functions
//Add commas
function fixCommas(value) {
  if(parseInt(value) >= 1000){
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          } else {
            return value;
          }
}

//**************** Chart builders  ****************

// **** START Create Week chart *****
function createChartWeek(dataset){

        //x axis values
        var x_data = buildxData(dataset);
        var y_data = buildyData(dataset);

        //Get additional data
        var prevClose_data = additionalData(dataset,2);
        var openingRate_data = additionalData(dataset,3);
        var dailyHigh_data = additionalData(dataset,4);
        var dailyLow_data = additionalData(dataset,5);
        var turnover_data = additionalData(dataset,6);

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
            label: function(tooltipItems, data) { 
              var multistringText = ["Lock Rate: $" + fixCommas(tooltipItems.yLabel)];
                  multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
                  multistringText.push('Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]));
                  multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
                  multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
                  multistringText.push('Turnover: $' + fixCommas(turnover_data[tooltipItems.index]));
                  //Print vals in info box
                  document.getElementById("weekDate").innerHTML = 'Date: ' + x_data[tooltipItems.index];
                  document.getElementById("weekLockRate").innerHTML = 'Lock Rate: $' + fixCommas(tooltipItems.yLabel);
                  document.getElementById("weekPrevClose").innerHTML = 'Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]);
                  document.getElementById("weekOpeningRate").innerHTML = 'Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]);
                  document.getElementById("weekDailyHigh").innerHTML = 'Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]);
                  document.getElementById("weekDailyLow").innerHTML = 'Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]);
                  document.getElementById("weekTurnover").innerHTML = 'Turnover: $' + fixCommas(turnover_data[tooltipItems.index]);

               return multistringText;
            }
            
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

    var prevClose_data = additionalData(dataset,2);
    var openingRate_data = additionalData(dataset,3);
    var dailyHigh_data = additionalData(dataset,4);
    var dailyLow_data = additionalData(dataset,5);
    var turnover_data = additionalData(dataset,6);

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
          label: function(tooltipItems, data) { 
            var multistringText = ["Lock Rate: $" + fixCommas(tooltipItems.yLabel)];
                multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
                multistringText.push('Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]));
                multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
                multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
                multistringText.push('Turnover: $' + fixCommas(turnover_data[tooltipItems.index]));
                //Print vals in info box
                document.getElementById("monthDate").innerHTML = 'Date: ' + x_data[tooltipItems.index];
                document.getElementById("monthLockRate").innerHTML = 'Lock Rate: $' + fixCommas(tooltipItems.yLabel);
                document.getElementById("monthPrevClose").innerHTML = 'Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]);
                document.getElementById("monthOpeningRate").innerHTML = 'Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]);
                document.getElementById("monthDailyHigh").innerHTML = 'Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]);
                document.getElementById("monthDailyLow").innerHTML = 'Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]);
                document.getElementById("monthTurnover").innerHTML = 'Turnover: $' + fixCommas(turnover_data[tooltipItems.index]);

             return multistringText;
          }
          
        }
      },
      
      legend: {
        display: true,
        labels: {
            boxWidth: 0,
            position: top,
            fontColor: '#0F4468',
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            padding: 1,
            min: monthMin - 10,
            max: monthMax + 10,
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
          barThickness : 7,
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }]
      }};

    //*** create new graph object ***

    var graphMonth = Object.create(graph);
    graphMonth.data = y_data;
    graphMonth.label = "";
    graphMonth.fill = true;
    graphMonth.borderColor = "#3FCA34";
    graphMonth.borderWidth = "1";
    graphMonth.pointRadius= "5";
    graphMonth.pointHoverRadius= "7";
    graphMonth.pointHoverBackgroundColor = "#74D16D";
    graphMonth.pointHoverBorderColor = "#5DED52";

    var graphMonthLine = Object.create(graph);
    graphMonthLine.data = y_data;
    graphMonthLine.type = 'line';
    graphMonthLine.label = "Month Line Date/Lock-Rate";
    graphMonthLine.fill = true;
    graphMonthLine.borderColor = "#3FCA34";
    graphMonthLine.borderWidth = "1";
    graphMonthLine.pointRadius= "5";
    graphMonthLine.pointHoverRadius= "7";
    graphMonthLine.pointHoverBackgroundColor = "#74D16D";
    graphMonthLine.pointHoverBorderColor = "#5DED52";

    //*** add graphs ***
    data.datasets.push(graphMonth);
    data.datasets.push(graphMonthLine);

    //*** Build the chart  ***
     //Month
     window.chartMonth = new Chart(document.getElementById("chartMonth"), {
      type: 'bar',
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

    var prevClose_data = additionalData(dataset,2);
    var openingRate_data = additionalData(dataset,3);
    var dailyHigh_data = additionalData(dataset,4);
    var dailyLow_data = additionalData(dataset,5);
    var turnover_data = additionalData(dataset,6);

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
          label: function(tooltipItems, data) { 
            var multistringText = ["Lock Rate: $" + fixCommas(tooltipItems.yLabel)];
                multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
                multistringText.push('Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]));
                multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
                multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
                multistringText.push('Turnover: $' + fixCommas(turnover_data[tooltipItems.index]));
                //Print vals in info box
                document.getElementById("month3Date").innerHTML = 'Date: ' + x_data[tooltipItems.index];
                document.getElementById("month3LockRate").innerHTML = 'Lock Rate: $' + fixCommas(tooltipItems.yLabel);
                document.getElementById("month3PrevClose").innerHTML = 'Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]);
                document.getElementById("month3OpeningRate").innerHTML = 'Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]);
                document.getElementById("month3DailyHigh").innerHTML = 'Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]);
                document.getElementById("month3DailyLow").innerHTML = 'Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]);
                document.getElementById("month3Turnover").innerHTML = 'Turnover: $' + fixCommas(turnover_data[tooltipItems.index]);

             return multistringText;
          }
          
        }
      },
      
      legend: {
        display: true,
        labels: {
            boxWidth: 0,
            position: top,
            fontColor: '#0F4468',
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            padding: 1,
            min: month3Min - 10,
            max: month3Max + 10,
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
          barThickness : 5,
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }]
      }};

    //*** create new graph object ***
    
    var graph3Month = Object.create(graph);
    graph3Month.data = y_data;
    graph3Month.label = "";
    graph3Month.fill = true;
    graph3Month.borderColor = "rgba(255, 255, 255, 0.4)";
    graph3Month.borderWidth = "1";
    graph3Month.pointRadius= "4";
    graph3Month.pointHoverRadius= "6";
    graph3Month.pointHoverBackgroundColor = "#863E1E";
    graph3Month.pointHoverBorderColor = "#C5714C";

    var graph3MonthLine = Object.create(graph);
    graph3MonthLine.data = y_data;
    graph3MonthLine.type = 'line';
    graph3MonthLine.label = "3 Months Line Date/Lock-Rate";
    graph3MonthLine.fill = true;
    graph3MonthLine.borderColor = "#FF4E00";
    graph3MonthLine.borderWidth = "1";
    graph3MonthLine.pointRadius= "4";
    graph3MonthLine.pointHoverRadius= "6";
    graph3MonthLine.pointHoverBackgroundColor = "#863E1E";
    graph3MonthLine.pointHoverBorderColor = "#C5714C";

    //*** add graphs ***
    data.datasets.push(graph3Month);
    data.datasets.push(graph3MonthLine);

    //*** Build the chart  ***
     //Month
     window.chart3Month = new Chart(document.getElementById("chart3Month"), {
      type: 'bar',
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

    var prevClose_data = additionalData(dataset,2);
    var openingRate_data = additionalData(dataset,3);
    var dailyHigh_data = additionalData(dataset,4);
    var dailyLow_data = additionalData(dataset,5);
    var turnover_data = additionalData(dataset,6);
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
          label: function(tooltipItems, data) { 
            var multistringText = ["Lock Rate: $" + fixCommas(tooltipItems.yLabel)];
                multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
                multistringText.push('Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]));
                multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
                multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
                multistringText.push('Turnover: $' + fixCommas(turnover_data[tooltipItems.index]));
                //Print vals in info box
                document.getElementById("month6Date").innerHTML = 'Date: ' + x_data[tooltipItems.index];
                document.getElementById("month6LockRate").innerHTML = 'Lock Rate: $' + fixCommas(tooltipItems.yLabel);
                document.getElementById("month6PrevClose").innerHTML = 'Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]);
                document.getElementById("month6OpeningRate").innerHTML = 'Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]);
                document.getElementById("month6DailyHigh").innerHTML = 'Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]);
                document.getElementById("month6DailyLow").innerHTML = 'Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]);
                document.getElementById("month6Turnover").innerHTML = 'Turnover: $' + fixCommas(turnover_data[tooltipItems.index]);

             return multistringText;
          }
          
        }
      },
      
      legend: {
        display: true,
        labels: {
            boxWidth: 0,
            position: top,
            fontColor: '#0F4468',
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            padding: 1,
            min: month6Min - 10,
            max: month6Max + 10,
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
          barThickness : 4,
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }]
      }};

    //*** create new graph object ***
    
    var graph6Month = Object.create(graph);
    graph6Month.data = y_data;
    graph6Month.label = "";
    graph6Month.fill = true;
    graph6Month.borderColor = "rgba(255, 255, 255, 0.4)";
    graph6Month.borderWidth = "1";
    graph6Month.pointRadius= "3";
    graph6Month.pointHoverRadius= "5";
    graph6Month.pointHoverBackgroundColor = "#6F146C";
    graph6Month.pointHoverBorderColor = "#AC73AA";

    var graph6MonthLine = Object.create(graph);
    graph6MonthLine.data = y_data;
    graph6MonthLine.type = 'line';
    graph6MonthLine.label = "6 Months Line Date/Lock-Rate";
    graph6MonthLine.fill = true;
    graph6MonthLine.borderColor = "#C54CC1";
    graph6MonthLine.borderWidth = "1";
    graph6MonthLine.pointRadius= "3";
    graph6MonthLine.pointHoverRadius= "5";
    graph6MonthLine.pointHoverBackgroundColor = "#6F146C";
    graph6MonthLine.pointHoverBorderColor = "#AC73AA";

    //*** add graphs ***
    data.datasets.push(graph6Month);
    data.datasets.push(graph6MonthLine);

    //*** Build the chart  ***
     //Month
     window.chart6Month = new Chart(document.getElementById("chart6Month"), {
      type: 'bar',
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

    var prevClose_data = additionalData(dataset,2);
    var openingRate_data = additionalData(dataset,3);
    var dailyHigh_data = additionalData(dataset,4);
    var dailyLow_data = additionalData(dataset,5);
    var turnover_data = additionalData(dataset,6);


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
          label: function(tooltipItems, data) { 
            var multistringText = ["Lock Rate: $" + fixCommas(tooltipItems.yLabel)];
                multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
                multistringText.push('Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]));
                multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
                multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
                multistringText.push('Turnover: $' + fixCommas(turnover_data[tooltipItems.index]));
                //Print vals in info box
                document.getElementById("yearDate").innerHTML = 'Date: ' + x_data[tooltipItems.index];
                document.getElementById("yearLockRate").innerHTML = 'Lock Rate: $' + fixCommas(tooltipItems.yLabel);
                document.getElementById("yearPrevClose").innerHTML = 'Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]);
                document.getElementById("yearOpeningRate").innerHTML = 'Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]);
                document.getElementById("yearDailyHigh").innerHTML = 'Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]);
                document.getElementById("yearDailyLow").innerHTML = 'Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]);
                document.getElementById("yearTurnover").innerHTML = 'Turnover: $' + fixCommas(turnover_data[tooltipItems.index]);

             return multistringText;
          }
          
        }
      },
      
      legend: {
        display: true,
        labels: {
            boxWidth: 0,
            position: top,
            fontColor: '#0F4468',
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            padding: 1,
            min: yearMin - 10,
            max: yearMax + 10,
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
          barThickness : 1,
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }]
      }};

    //*** create new graph object ***

    var graphYear = Object.create(graph);
    graphYear.data = y_data;
    graphYear.label = "";
    graphYear.fill = true;
    graphYear.borderColor = "rgba(255, 255, 255, 0.4)";
    graphYear.borderWidth = "1";
    graphYear.pointRadius= "3";
    graphYear.pointHoverRadius= "5";
    graphYear.pointHoverBackgroundColor = "#CE5050";
    graphYear.pointHoverBorderColor = "#E17272";
    graphYear.scaleOverride= true;

    var graphYearLine = Object.create(graph);
    graphYearLine.data = y_data;
    graphYearLine.label = "Year Line Date/Lock-Rate";
    graphYearLine.type = 'line';
    graphYearLine.fill = true;
    graphYearLine.borderColor = "#D01D1D";
    graphYearLine.borderWidth = "1";
    graphYearLine.pointRadius= "3";
    graphYearLine.pointHoverRadius= "5";
    graphYearLine.pointHoverBackgroundColor = "#CE5050";
    graphYearLine.pointHoverBorderColor = "#E17272";
    graphYearLine.scaleOverride= true;

    //*** add graphs ***
    data.datasets.push(graphYear);
    data.datasets.push(graphYearLine);


    //*** Build the chart  ***
     //Year
     window.chartYear = new Chart(document.getElementById("chartYear"), {
      type: 'bar',
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

    var prevClose_data = additionalData(dataset,2);
    var openingRate_data = additionalData(dataset,3);
    var dailyHigh_data = additionalData(dataset,4);
    var dailyLow_data = additionalData(dataset,5);
    var turnover_data = additionalData(dataset,6);
    
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
          label: function(tooltipItems, data) { 
            var multistringText = ["Lock Rate: $" + fixCommas(tooltipItems.yLabel)];
                multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
                multistringText.push('Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]));
                multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
                multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
                multistringText.push('Turnover: $' + fixCommas(turnover_data[tooltipItems.index]));
                //Print vals in info box
                document.getElementById("year3Date").innerHTML = 'Date: ' + x_data[tooltipItems.index];
                document.getElementById("year3LockRate").innerHTML = 'Lock Rate: $' + fixCommas(tooltipItems.yLabel);
                document.getElementById("year3PrevClose").innerHTML = 'Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]);
                document.getElementById("year3OpeningRate").innerHTML = 'Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]);
                document.getElementById("year3DailyHigh").innerHTML = 'Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]);
                document.getElementById("year3DailyLow").innerHTML = 'Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]);
                document.getElementById("year3Turnover").innerHTML = 'Turnover: $' + fixCommas(turnover_data[tooltipItems.index]);

             return multistringText;
          }
          
        }
      },
      
      legend: {
        display: true,
        labels: {
            boxWidth: 0,
            position: top,
            fontColor: '#0F4468',
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            padding: 1,
            min: year3Min - 10,
            max: year3Max + 10,
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
          barThickness : 1,
          gridLines: {
            display: true,
            color: "#B8D7EC"
          }
        }]
      }};

    //*** create new graph object ***

    var graph3Year = Object.create(graph);
    graph3Year.data = y_data;
    graph3Year.label = "";
    graph3Year.fill = true;
    graph3Year.borderColor = "rgba(255, 255, 255, 0.4)";;
    graph3Year.borderWidth = "1";
    graph3Year.pointRadius= "2";
    graph3Year.pointHoverRadius= "3";
    graph3Year.pointHoverBackgroundColor = "#71d8dd";
    graph3Year.pointHoverBorderColor = "#73b4b7";
    graph3Year.scaleOverride= true;

    var graph3YearLine = Object.create(graph);
    graph3YearLine.data = y_data;
    graph3YearLine.type = 'line';
    graph3YearLine.label = "3 Years - Line Date/Lock-Rate";
    graph3YearLine.fill = true;
    graph3YearLine.borderColor = "#09dae5";
    graph3YearLine.borderWidth = "1";
    graph3YearLine.pointRadius= "2";
    graph3YearLine.pointHoverRadius= "3";
    graph3YearLine.pointHoverBackgroundColor = "#71d8dd";
    graph3YearLine.pointHoverBorderColor = "#73b4b7";
    graph3YearLine.scaleOverride= true;

    //*** add graphs ***
    data.datasets.push(graph3Year);
    data.datasets.push(graph3YearLine);

    //*** Build the chart  ***
     //Year
     window.chart3Year = new Chart(document.getElementById("chart3Year"), {
      type: 'bar',
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

  var prevClose_data = additionalData(dataset,2);
  var openingRate_data = additionalData(dataset,3);
  var dailyHigh_data = additionalData(dataset,4);
  var dailyLow_data = additionalData(dataset,5);
  var turnover_data = additionalData(dataset,6);

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
        label: function(tooltipItems, data) { 
          var multistringText = ["Lock Rate: $" + fixCommas(tooltipItems.yLabel)];
              multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
              multistringText.push('Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]));
              multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
              multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
              multistringText.push('Turnover: $' + fixCommas(turnover_data[tooltipItems.index]));
              //Print vals in info box
              document.getElementById("year5Date").innerHTML = 'Date: ' + x_data[tooltipItems.index];
              document.getElementById("year5LockRate").innerHTML = 'Lock Rate: $' + fixCommas(tooltipItems.yLabel);
              document.getElementById("year5PrevClose").innerHTML = 'Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]);
              document.getElementById("year5OpeningRate").innerHTML = 'Opening Rate: $' + fixCommas(openingRate_data[tooltipItems.index]);
              document.getElementById("year5DailyHigh").innerHTML = 'Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]);
              document.getElementById("year5DailyLow").innerHTML = 'Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]);
              document.getElementById("year5Turnover").innerHTML = 'Turnover: $' + fixCommas(turnover_data[tooltipItems.index]);

           return multistringText;
        }
        
      }
    },
    
    legend: {
      display: true,
      labels: {
          boxWidth: 0,
          position: top,
          fontColor: '#0F4468',
      }
    },
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          padding: 1,
          min: year5Min - 10,
          max: year5Max + 10,
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
        barThickness : 1,
        gridLines: {
          display: true,
          color: "#B8D7EC"
        }
      }]
    }};

  //*** create new graph object ***

  var graph5Year = Object.create(graph);
  graph5Year.data = y_data;
  graph5Year.label = "";
  graph5Year.fill = true;
  graph5Year.borderColor = "rgba(255, 255, 255, 0.4)";
  graph5Year.borderWidth = "2";
  graph5Year.pointRadius= "2";
  graph5Year.pointHoverRadius= "3";
  graph5Year.pointHoverBackgroundColor = "#9975c4";
  graph5Year.pointHoverBorderColor = "#bfa8db";
  graph5Year.scaleOverride= true;

  var graph5YearLine = Object.create(graph);
  graph5YearLine.data = y_data;
  graph5YearLine.type = 'line';
  graph5YearLine.label = "5 Years Line Date/Lock-Rate";
  graph5YearLine.fill = true;
  graph5YearLine.borderColor = "#9242f4";
  graph5YearLine.borderWidth = "1";
  graph5YearLine.pointRadius= "1";
  graph5YearLine.pointHoverRadius= "1.5";
  graph5YearLine.pointHoverBackgroundColor = "#9975c4";
  graph5YearLine.pointHoverBorderColor = "#bfa8db";
  graph5YearLine.scaleOverride= true;

  //*** add graphs ***
  data.datasets.push(graph5Year);
  data.datasets.push(graph5YearLine);

  //*** Build the chart  ***
   //Year
   window.chart5Year = new Chart(document.getElementById("chart5Year"), {
    type: 'bar',
    options: options,
    data: data
  });  

}
// **** END Create 5 Years chart *****

