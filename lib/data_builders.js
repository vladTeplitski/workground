//************** Data builders *************
// Data built in php from json
// pointsShift - Used in case of data type: [X values ... Y values...]

//Number of data types: Data build model in row: [Type1, Type2 , Type3...]
var typesNum = 7;
var dailyTypesNum = 9;

// Global - Parse Additional data
function additionalData(data,index){
    //index - data type number in stack - starts from 2 (0 = x (date),1 = y (LockRate))
  
    //Deprecated: var pointsShift = 5;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;
    //document.getElementById("debug19").innerHTML = "Into buildyData";
    
    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 
    
    //document.getElementById("debug20").innerHTML = "Converted: " + convertToArr + "Place 5 = " + convertToArr[pointsShift];
  
    var l = convertToArr.length;
    var pointsShift = index*l/typesNum; //index start from 2
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

  function additionalDataDaily(data,index){
    //index - data type number in stack - starts from 2 (0 = x (date),1 = y (LockRate))
  
    //Deprecated: var pointsShift = 5;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;
    //document.getElementById("debug19").innerHTML = "Into buildyData";
    
    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 
    
    //document.getElementById("debug20").innerHTML = "Converted: " + convertToArr + "Place 5 = " + convertToArr[pointsShift];
  
    var l = convertToArr.length;
    var pointsShift = index*l/dailyTypesNum; //index start from 2
    var j = l/dailyTypesNum + pointsShift; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var
  
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
    var pointsShift = l/typesNum; //Will be l/typesnum
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
    var pointsShift = l/typesNum; //Will be l/typesnum
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
    var pointsShift = l/typesNum; //Will be l/typesnum
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
    var pointsShift = l/typesNum; //Will be l/typesnum
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
  
  return finalData;
}

//3 YEARS Y
function buildyData3Year(data){
   
    //Deprecated: var pointsShift = 21;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 

    var l = convertToArr.length;
    var pointsShift = l/typesNum; //Will be l/typesnum
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
  
  return finalData;
}

//5 YEARS Y
function buildyData5Year(data){
   
    //Deprecated: var pointsShift = 21;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
    var arr = [];
    var i;

    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 

    var l = convertToArr.length;
    var pointsShift = l/typesNum; //Will be l/typesnum
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




// ** Start Daily ***
//Data set structure: [Dates,Vol]

//Daily X
function buildxDataDaily(data){
    //TODO - Add shift to function arg

    //Daily types: set in global var - dailyTypesNum variable
    

    var pointsShift = 0;  //X data is in the start
    var arr = [];
    var i;
    
    var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array    
   
    var l = convertToArr.length;
    var j = l/dailyTypesNum; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - typesNum global var
  
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
  
  //Daily Y
  function buildyDataDaily(data){
     
      //Deprecated: var pointsShift = 21;  //Y data is after the X data , Week = 5 days = 5 points. Change this value according to points number. Jump 5 places.
      var arr = [];
      var i;
  
      var convertToArr = Object.keys(data).map(i => data[i]); // Convert to array 
  
      var l = convertToArr.length;
      var pointsShift = l/dailyTypesNum; //Will be l/dailyTypesNum
      var j = l/dailyTypesNum + pointsShift; //number of values to push EDIT IF NEW DATA KIND ADDED TO DATASET - dailyTypesNum global var
  
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
        dailyMin=finalData[0];
        dailyMax=finalData[0];
      //Calculate Min val
            
      for(i=0;i<finalData.length;i++){
        dailyMin = ((finalData[i] < dailyMin) ? finalData[i] : dailyMin);
        dailyMax = ((finalData[i] > dailyMax) ? finalData[i] : dailyMax);
      }
      //END Dynamic graph min/max
  
      return finalData;
  }
  // ** END Daily **



//END Data builders ***************************
