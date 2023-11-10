

import React from 'react';
const dataPresent = (parameterArray) => {
    if(!parameterArray.length)
        return false;
    return true; 
}

//pre-condition: weight is in lb, height is in inches
const BMI = (userObject) => {
    const BMIArray = [
        userObject.weight[userObject.weight?.length-1]?.value || 0,
        userObject.height[userObject.height?.length-1]?.value || 0,
    ] 
    if(BMIArray.includes(0))
        return 0
    return (BMIArray[0] / (BMIArray[1] * BMIArray[1]) * 703).toFixed(2);
}

function compare( a, b ) {
    if ( a.last_nom < b.last_nom ){
      return -1;
    }
    if ( a.last_nom > b.last_nom ){
      return 1;
    }
    return 0;
  }

const averageMetric = (averageMetricArray) => {
    const averageArray = averageMetricArray.map((user => (
          user.value

    )) )

    
    if(!averageArray || averageArray.length == 0)
        return 0;
        
    const sum = averageArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    })

    /*const stats = new Statistics(averageArray);*/
    return Math.round(sum/averageArray.length);
    
}

//returns an array of arrays containing health parameters 
const todayStats = (object) => {
    const array = [];
    //obtain the date range
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const day = String(todayDate.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    array.push(today);
    if(object.steps.length == 0 || object.steps[object.steps.length-1]?.date !==today)
        array.push(0);
    else
        array.push(object.steps[object.steps.length-1].value)
    if(object.activeMinutes.length == 0 || object.activeMinutes[object.activeMinutes.length-1]?.date !==today)
        array.push(0);
    else
        array.push(object.activeMinutes[object.activeMinutes.length-1].value)
    return array;
}

//helper function to sum values
const simpleSum = (array)=> {
    if(array.length == 0)
        return 0
    let sum = 0
    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum;
}

//returns the average of a metricover a 7 day period
const averageWeeklyMetric = (parameterObjects) => {
    //obtain the time span for the past seven days
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const day = String(todayDate.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    const lastWeekDate = new Date(todayDate.getTime()-(60*60*24*7*1000))
    const lastWeekYear = lastWeekDate.getFullYear();
    const lastWeekMonth = String(lastWeekDate.getMonth() + 1).padStart(2, '0');
    const lastWeekDay = String(lastWeekDate.getDate()).padStart(2, '0');
    const lastWeek = `${lastWeekYear}-${lastWeekMonth}-${lastWeekDay}`
  
    const thisWeekOnly = parameterObjects.filter((user)=>{
    //return health parameters that fall within that time range
        return user.date >= lastWeek && user.date <= today;
    })
   
    const averageArray = thisWeekOnly.map((user => (
        //obtain just the values from that array
        user.value

  )) )
  
  if(!averageArray || averageArray.length == 0)
  //handle the case if there are no values
      return 0;
  const sum = averageArray.reduce((accumulator, currentValue) => {
    //
      return accumulator + currentValue;
  })

  /*const stats = new Statistics(averageArray);*/
  return Math.round(sum/7);
}

const userBMR = (userObject) => {
//calculates the user basal metobolic rate, ie how many
//calories they burn sedentary daily
    const cArray = [
        userObject.age || " ",
        parseInt(userObject.weight[userObject.weight?.length-1]?.value) || 0,
        parseInt(userObject.height[userObject.height?.length-1]?.value) || 0,
        userObject.gender
    ] 
    if(cArray.includes(0) || cArray.includes(" "))
    //if user does not provide enough data,
    //we cannot perform the calculation
        return "N/A"
    if(cArray[3] == "M"){
        return (
            //formula for male BMR
            Math.round(88.362 + (13.397 * cArray[1] * 0.4546 /*conv lb to kg*/)
            + (4.799 * cArray[2] * 2.54 /*conv inch to cm*/ )
            - (5.67 * cArray[0]))
        )
    }
    return (
        //default is female since sex is female default at birth
        //badum ts
        Math.round(447.593 + (9.247 * cArray[1] * 0.4546 /*conv lb to kg*/)
        + (3.098 * cArray[2] * 2.54 /*conv inch to cm*/ )
        - (4.33 * cArray[0]))
    )
   
}

//returns an array of arrays to aid in displaying user data
const userDataDisplay = (result, userParamData)=>{
    const dateArray = []
    const valueArray = []

    //get the specific parameter
    const paramData = result[`${userParamData}`];
    //push unique date values into the date array
    paramData.forEach((value => {
        if(!dateArray.includes(value.date))
            dateArray.push(value.date)
    }));
    
    if(userParamData != 'weight'){
        //for every parameter besides weight
        for(let i =  0 ; i < dateArray.length; i++){
            //loop through the unique dates
            //default the value to 0
                valueArray[i] = 0
            for(let j = 0; j < paramData.length; j++){
                //accumulate the parameter value (steps, active minutes, etc)
                if(dateArray[i] == paramData[j].date){
                    //if there are multiple paramater values for the same date
                    valueArray[i] += paramData[j].value;
                }
            }
            
        }
    }
    else{
        //otherwise if the paramater is weight, just get the most recent
        //value for that date
        for(let i =  0 ; i < dateArray.length; i++){
        for(let j = 0; j < paramData.length; j++){
            if(dateArray[i] == paramData[j].date){
                valueArray[i] = paramData[j].value;
            }
        }
        
    }
}
    return [dateArray, valueArray]
}

//returns an array of arrays containg data to display for the user's week
const userDataWeeklyDisplay = (result, userParamData)=>{
    //obtain the 7 day date range
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const day = String(todayDate.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    const lastWeekDate = new Date(todayDate.getTime()-(60*60*24*7*1000))
    const lastWeekYear = lastWeekDate.getFullYear();
    const lastWeekMonth = String(lastWeekDate.getMonth() + 1).padStart(2, '0');
    const lastWeekDay = String(lastWeekDate.getDate()).padStart(2, '0');
    const lastWeek = `${lastWeekYear}-${lastWeekMonth}-${lastWeekDay}`
    const dateArray = [];
    const valueArray = [];

    //get the specific paramater we're searching for
    const paramData = result[`${userParamData}`];
   
    let count = 0;
    for(let i =  0 ; i < paramData.length; i++){
       //loop through the length of the result
        if(paramData[i].date >= lastWeek && paramData[i].date <= today){
            //store the dates and values if the date of the result
            //falls within the range of dates
            dateArray[count] = paramData[i].date;
            valueArray[count] = paramData[i].value;
            count++;
        }
    }
    return [dateArray, valueArray]
}

//returns an array of arrays containg 
const weeklyPopulationAverage = (result, usersParamData) => {
    let todayDate = new Date();
    let lastWeekDate = new Date(todayDate.getTime()-(60*60*24*7*1000))
    const today = todayDate.toISOString().slice(0,10);
    const lastWeek = lastWeekDate.toISOString().slice(0,10);
    const paramArray = result.map(user => user[`${usersParamData}`]).flat();
   const weeklyParamArray = paramArray.filter((param)=> param.date >= lastWeek && param.date <= today).map(user => user.value)
   if(weeklyParamArray.length == 0)
        return 0;
    const sum = weeklyParamArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    })
    return sum / weeklyParamArray.length;
}

//returns the standard deviation of the specific health paramater selected
const weeklyStandardDeviation = (result, usersParamData) => {
    //get date ranges
    let todayDate = new Date();
    let lastWeekDate = new Date(todayDate.getTime()-(60*60*24*7*1000))
    const today = todayDate.toISOString().slice(0,10);
    const lastWeek = lastWeekDate.toISOString().slice(0,10);
    const paramArray = result.map(user => user[`${usersParamData}`]).flat();
    const weeklyParamArray = paramArray.filter((param)=> param.date >= lastWeek && param.date <= today).map(user => user.value)
    const weeklyAverageOfParam = weeklyPopulationAverage(result, usersParamData);
    let p1 = 0;
    
    //the following calculates the standard deviation:
    for(let i = 0; i < weeklyParamArray.length; i++){
        p1 += Math.pow((weeklyParamArray[i] - weeklyAverageOfParam),2);
    }
    
    p1 /= (weeklyParamArray.length-1);
    p1= Math.sqrt(p1);
    
    return p1;

}

//return a message stating whether or not the user has gone above, below, or met
//the site's population average for a specific metric
const greaterOrLessThan =(userData, populationData) => {
    if(userData> populationData)
        return [true, "You are above average!"]
    else if(userData == populationData)
        return [true, "You have met the average!"]
    else    
        return [false, "You are below average."]
}


//returns an array of arrays used for
//population average data display for
const averagesDataDisplay = (specificData) =>{
    const averageDateArray = []
    const cummulationArray = []
    const countArray = []
    const averageValueArray = []
    //obtain every unique date where a user has uploaded data
    specificData.forEach((user => {
        if(!averageDateArray.includes(user.date))
            averageDateArray.push(user.date)
    }));
    for(let k = 0; k < averageDateArray.length; k++){
    //loop through the date array
    //set a default count of how many values are present on that date
        countArray[k] = 1;
    //set a default sum for the values of that date
        cummulationArray[k] = 0;
        for(let i = 0; i < specificData.length; i++){
            //loop through the data of all users
            if(specificData[i].date == averageDateArray[k]){
                //if a date matches, sum that data
                cummulationArray[k] += specificData[i].value;
                //increment the count
                countArray[k] += 1; 
            }
        }
    }
    for(let i = 0; i < cummulationArray.length; i++){
        //push the average of the health metric on a particular date
        const lengthCount = countArray[i];
        const sum = cummulationArray[i];
        averageValueArray.push(Math.round(sum/lengthCount));
    }   
    //return the array of averages and the date array
    return [averageDateArray, averageValueArray]
}

const getUserAverageForBreakDown = (array)=>{
    if(array.length == 0)
        return 0;
   return Math.round(array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    })/array.length);
    
}


export {todayStats, simpleSum, getUserAverageForBreakDown, dataPresent, BMI, averageMetric, compare, averageWeeklyMetric, userBMR, userDataDisplay, averagesDataDisplay, userDataWeeklyDisplay, weeklyPopulationAverage, weeklyStandardDeviation, greaterOrLessThan}