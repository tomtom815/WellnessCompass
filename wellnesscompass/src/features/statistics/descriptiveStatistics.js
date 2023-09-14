import * as Statistics from 'statistics.js'

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



const averageMetric = (averageMetricArray) => {
    const averageArray = averageMetricArray.map((user => (
          user.value

    )) 
    )
    console.log(averageArray);
    if(!averageArray || averageArray.length == 0)
        return 0;
    const stats = new Statistics(averageArray);
    return stats.arithmeticMean(averageArray);

   
}



const tTest = (objectMeanArray, averageOfUser) => {

}


export {dataPresent, BMI, averageMetric}