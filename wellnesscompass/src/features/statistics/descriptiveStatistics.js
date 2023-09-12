import * as Statistics from 'statistics.js'


const dataPresent = (parameterArray) => {
    if(!parameterArray.length)
        return false;
    return true; 
}

//pre-condition: weight is in lb, height is in inches
const BMI = (weight, height) => {
    return weight / (height * height) * 703
}


//pre-condition: an object of weight data is provided 
const averageWeight = (weightObjectArray) => {
    if(!weightObjectArray.length)
    //if array is empty
        return 0;
    const stats = new Statistics(weightObject);
    return stats.arithmeticMean("value"); 
}

const averageBMI = (BMIArray) => {
    if(!BMIArray.length)
    //if array is empty
        return 0;
    const stats = new Statistics(BMIArray);
    return stats.arithmeticMean("value"); 
}

export {dataPresent, BMI, averageWeight, averageBMI}