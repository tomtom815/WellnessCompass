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
    if(!averageArray.length)
        return 0;
    const stats = new Statistics(averageArray);
    return stats.arithmeticMean(averageArray);

   
}

export {dataPresent, BMI, averageMetric}