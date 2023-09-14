import * as Statistics from 'statistics.js'
//i give this statistics library 1/10

import React from 'react';
const dataPresent = (parameterArray) => {
    if(!parameterArray.length)
        return false;
    return true; 
}

//pre-condition: weight is in lb, height is in inches
const BMI = (weight, height) => {
    return weight / (height * height) * 703
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
        return user.date > lastWeek || user.date < today;
    })
    const averageArray = averageMetricArrayForWeek.map((user => (
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




export {dataPresent, BMI, averageMetric, compare, averageWeeklyMetric}