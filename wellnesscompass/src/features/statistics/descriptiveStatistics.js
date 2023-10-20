import * as Statistics from 'statistics.js'
//i give this statistics library 1/10

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

const todayStats = (object) => {
    const array = [];
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
const simpleSum = (array)=> {
    if(array.length == 0)
        return 0
    let sum = 0
    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum;
}


const averageWeeklyMetric = (parameterObjects) => {
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
        return user.date >= lastWeek || user.date <= today;
    })
    const averageArray = thisWeekOnly.map((user => (
        user.value

  )) )
  
  if(!averageArray || averageArray.length == 0)
      return 0;
  const sum = averageArray.reduce((accumulator, currentValue) => {
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

const userDataDisplay = (result, userParamData)=>{
    const dateArray = []
    const valueArray = []

    const paramData = result[`${userParamData}`];
  
    for(let i =  0 ; i < paramData.length; i++){
       
        dateArray[i] = paramData[i].date;
        valueArray[i] = paramData[i].value;

    }
 
    return [dateArray, valueArray]
}

const userDataWeeklyDisplay = (result, userParamData)=>{
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

    const paramData = result[`${userParamData}`];
    let count = 0;
    for(let i =  0 ; i < paramData.length; i++){
       
        
        if(paramData[i].date >= lastWeek && paramData[i].date <= today){
            
            dateArray[count] = paramData[i].date;
            valueArray[count] = paramData[i].value;
           
            count++;
        }
    }
    return [dateArray, valueArray]
}

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

const weeklyStandardDeviation = (result, usersParamData) => {
    let todayDate = new Date();
    let lastWeekDate = new Date(todayDate.getTime()-(60*60*24*7*1000))
    const today = todayDate.toISOString().slice(0,10);
    const lastWeek = lastWeekDate.toISOString().slice(0,10);
    const paramArray = result.map(user => user[`${usersParamData}`]).flat();
    const weeklyParamArray = paramArray.filter((param)=> param.date >= lastWeek && param.date <= today).map(user => user.value)
    const weeklyAverageOfParam = weeklyPopulationAverage(result, usersParamData);
    let p1 = 0;
    for(let i = 0; i < weeklyParamArray.length; i++){
        p1 += Math.pow((weeklyParamArray[i] - weeklyAverageOfParam),2);
    }
    
    p1 /= (weeklyParamArray.length-1);
    p1= Math.sqrt(p1);
    
    return p1;

}

const greaterOrLessThan =(userData, populationData) => {
    if(userData> populationData)
        return [true, "You are above average!"]
    else if(userData == populationData)
        return [true, "You have met the average!"]
    else    
        return [false, "You are below average."]
}
const averagesDataDisplay = (specificData) =>{
    const averageDateArray = []
    const collectionOfValues = []
    const averageValueArray = []
    specificData.forEach((user => {
        if(!specificData.includes(user.date))
            averageDateArray.push(user.date)
    }));
    for(let k = 0; k < averageDateArray.length; k++){
        collectionOfValues[k] = [];
        for(let i = 0; i < averageDateArray.length; i++){
            if(specificData[i].date == averageDateArray[k]){
                const value = specificData[i].value;
                collectionOfValues[k].push(value); 
            }
        }
    }
    for(let i = 0; i < collectionOfValues.length; i++){
        const length = collectionOfValues[i].length;
        let sum = 0;
        for(let k = 0; k < collectionOfValues[i].length; k++){
            sum = collectionOfValues[i][k];

        }
        averageValueArray.push(Math.round(sum/length));
    }   
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