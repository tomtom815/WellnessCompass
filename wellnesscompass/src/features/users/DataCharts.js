import React, { useState } from 'react'
import { GetAllUsers } from '../../app/api/fetchAllUsers';
import { GetOneUser } from '../../app/api/fetchOneUser';
import Plot from 'react-plotly.js';

import { averageMetric, userDataDisplay, averagesDataDisplay, userDataWeeklyDisplay, weeklyPopulationAverage, weeklyStandardDeviation, greaterOrLessThan, getUserAverageForBreakDown } from '../statistics/descriptiveStatistics';


const DataCharts = ({userName}) => {


    const [weeklyToggle, setWeeklyToggle] = useState(true);
    const [toggle,setToggle] = useState(true);
    const allUsers =  GetAllUsers();
    const userResult = GetOneUser({userName})
    const result = (userResult[0]);
    if(!result || !allUsers)
        return <div>Loading...</div>
   
    const chartDataSteps = userDataDisplay(result, Object.keys(result)[8]);
    const chartDataWeight = userDataDisplay(result, Object.keys(result)[5]);
    const chartDataActive = userDataDisplay(result, Object.keys(result)[9]);
    const chartWeeklyDataSteps = userDataWeeklyDisplay(result, Object.keys(result)[8]);
    const chartWeeklyDataActivity =userDataWeeklyDisplay(result, Object.keys(result)[9]);
    const populationAverageSteps = Math.round(weeklyPopulationAverage(allUsers,Object.keys(result)[8]));
    const populationAverageActivity = Math.round(weeklyPopulationAverage(allUsers, Object.keys(result)[9]));
    const test2 = weeklyStandardDeviation(allUsers,Object.keys(result)[8]);
    
    console.log()
    const allTheSteps = allUsers.map((user =>
       user.steps
    )).flat(1)
    
    const allTheActivity = allUsers.map((user =>
        user.activeMinutes
     )).flat(1)
   
     console.log("userweeklysteps");
     console.log(chartDataActive[0]);

    const userAverageSteps = getUserAverageForBreakDown(chartWeeklyDataSteps[1])
    const userAverageActivity = getUserAverageForBreakDown(chartWeeklyDataActivity[1])
    const averageChartDataSteps = averagesDataDisplay(allTheSteps)
    const averageChartDataActivity = averagesDataDisplay(allTheActivity);
    


  return (
    <div id="dataContainer">   
        <div className="weeklyDataDisplay">
            <br></br>
            <h1>Weekly Metrics</h1>
            <br></br>
           { weeklyToggle == "weeklySteps" && (<div id = "weeklySteps">
            <div className= "weeklyGraph">
            <Plot 
            data={[
                {x: chartWeeklyDataSteps[0], y: chartWeeklyDataSteps[1], type: 'bar', name: 'Weekly Steps', mode: 'lines+markers', marker: {color: 'purple'}}]}
            layout={ 
                { width: 420, height: 340,  title: 'Steps', xaxis: {title: {text: 'Date'} }, yaxis: {title: {text: 'Weekly Steps'} }} } />
               <div className = "weeklyBreakDown">
               <p>You have an average of {userAverageSteps} steps this week.</p>
               <p>The average total steps for this week is {populationAverageSteps}.</p>
               <p>{greaterOrLessThan(userAverageSteps, populationAverageSteps)}</p>
               </div>
            </div>
            </div>)}
            { weeklyToggle == 'weeklyActivity' && (<div id = "weeklyActivity">
            <div className= "weeklyGraph">
            <Plot 
            data={[
                {x: chartWeeklyDataActivity[0], y: chartWeeklyDataActivity[1], type: 'bar', name: 'Weekly Activity', mode: 'lines+markers', marker: {color: 'purple'}}]}
            layout={ 
                { width: 420, height: 340,  title: 'Steps', xaxis: {title: {text: 'Date'} }, yaxis: {title: {text: 'Weekly Steps'} }} } />
               <div className = "weeklyBreakDown">
               <p>You have an average of {userAverageActivity} active minutes this week.</p>
               <p>The average total active minutes for this week is {populationAverageActivity}.</p>
               <p>{greaterOrLessThan(userAverageActivity, populationAverageActivity)}</p>
               </div>
            </div>
            </div>)}
            
            <div id = "buttonLine">
                <button className='buttonCl' onClick={()=>setWeeklyToggle("weeklySteps")}><h2>Steps</h2></button>

                <button className='buttonCl' onClick={()=>setWeeklyToggle("weeklyActivity")}><h2>Activity</h2></button>
            </div>  
            
        </div>  
       
        <br></br>
        <div id = "dataLifeTimeContainer">
        <br></br>
        <h2>Lifetime Metrics</h2>
        <br>
        </br>
        {toggle == "steps" && ( <div id= "stepgraph">
        <Plot 
            data={[
                {x: averageChartDataSteps[0], y: averageChartDataSteps[1], type: 'bar', name: 'Population', mode: 'lines+markers', marker: {color: 'purple'}},
                {type: 'bar', x:  chartDataSteps[0], name: 'Personal', y:  chartDataSteps[1], marker: { color: "rgba(6, 57, 219, 0.4)"}},]}
            layout={ 
                { width: 420, height: 340,  title: 'Steps', xaxis: {title: {text: 'Date'} }, yaxis: {title: {text: 'Steps'} }} } />
            </div>
            )}
        {toggle == "weight" && ( <div id= "weightGraph">
        <Plot
                data={[ 
                    { type: 'bar', x: chartDataWeight[0],  y: chartDataWeight[1], marker: { color: "rgba(6, 57, 219, 0.4)"}},
                ]}
                layout={ 
                    { width: 420, height: 340, title: 'Weight', xaxis: {title: {text: 'Date'} }, yaxis: {title: {text: 'Weight (lbs)'} }} } />
            </div>
            )}
        {toggle == "activity" && (<div id= "activeMinutesGraph">
            <Plot
                data={[
                    { x: averageChartDataActivity[0], y: averageChartDataActivity[1], name: 'Population',type: 'bar',mode: 'lines+markers',arker: {color: 'purple'}},{type: 'bar', x: chartDataActive[0], y: chartDataActive[1], name: 'Personal', marker: { color: "rgba(6, 57, 219, 0.4)"}}]}
                layout={ {
                    width: 420, height: 340, title: 'Active Minutes',xaxis: {itle: {text: 'Date'} }, yaxis: {title: {text: 'Active Minutes'}}
                    }} />
            </div>
            )}
            <div id = "buttonLine">
                <button className='buttonCl' onClick={()=>setToggle("steps")}><h2>Steps</h2></button>
                <button className='buttonCl' onClick={()=>setToggle("weight")}><h2>Weight</h2></button>
                <button className='buttonCl' onClick={()=>setToggle("activity")}><h2>Activity</h2></button>
            </div>
        </div>
       
        </div> 
  )
}

export default DataCharts