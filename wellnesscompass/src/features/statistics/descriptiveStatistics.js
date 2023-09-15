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

const averageWeeklyMetric = (averageMetricArrayForWeek) => {
    let todayDate = new Date();
    let lastWeekDate = new Date(todayDate.getTime()-(60*60*24*7*1000))
    const today = todayDate.toISOString().slice(0,10);
    const lastWeek = lastWeekDate.toISOString().slice(0,10);
    const thisWeekOnly = averageMetricArrayForWeek.filter((user)=>{
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



export {dataPresent, BMI, averageMetric, compare, averageWeeklyMetric, userBMR}