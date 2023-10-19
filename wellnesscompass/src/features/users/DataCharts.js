import React, { useState } from 'react'
import { GetAllUsers } from '../../app/api/fetchAllUsers';
import { GetOneUser } from '../../app/api/fetchOneUser';
import Plot from 'react-plotly.js';

import { averageMetric, userDataDisplay, averagesDataDisplay, userDataWeeklyDisplay, weeklyPopulationAverage, weeklyStandardDeviation, greaterOrLessThan, getUserAverageForBreakDown, simpleSum } from '../statistics/descriptiveStatistics';


const DataCharts = ({userName}) => {


    const [weeklyToggle, setWeeklyToggle] = useState(true);
    const [toggle,setToggle] = useState(true);
    const allUsers =  GetAllUsers();
    const userResult = GetOneUser({userName})
    const result = (userResult[0]);
    if(!result || !allUsers)
        return <div>Loading...</div>
   
    const chartDataSteps = userDataDisplay(result, "steps");
    console.log('steps')
    const chartDataWeight = userDataDisplay(result, "weight");
    const chartDataActive = userDataDisplay(result, "activeMinutes");
    const chartWeeklyDataSteps = userDataWeeklyDisplay(result, "steps");
    const chartWeeklyDataActivity =userDataWeeklyDisplay(result, "activeMinutes");
    const populationAverageSteps = Math.round(weeklyPopulationAverage(allUsers,"steps"));
    const populationAverageActivity = Math.round(weeklyPopulationAverage(allUsers, "activeMinutes"));
    
    const allTheSteps = allUsers.map((user =>
       user.steps
    )).flat(1)
    
    const allTheActivity = allUsers.map((user =>
        user.activeMinutes
     )).flat(1)
    
     console.log("Weekly data steps is ")
     console.log(Object.keys(result))

    const userAverageSteps = getUserAverageForBreakDown(chartWeeklyDataSteps[1])
    const userAverageActivity = getUserAverageForBreakDown(chartWeeklyDataActivity[1])
    const averageLifeTimeSteps = getUserAverageForBreakDown(chartDataSteps[1]);
    const averageLifeTimeActivity = getUserAverageForBreakDown(chartDataActive[1]);
    const averageChartDataSteps = averagesDataDisplay(allTheSteps)
    const averageChartDataActivity = averagesDataDisplay(allTheActivity);
  
    


  return (
    <div>
        <div id = "todayDataContainer">
           
        </div>
        <div id="dataSubContainer">  
        <div>
        </div>
        <div id = "dataWeeklyContainer">
            <br></br>
            <h1>Weekly Metrics</h1>
            <br></br>
            
            { weeklyToggle == "weeklySteps" && (<div id = "weeklySteps">
           
                
                <Plot 
          data={[
              {x: chartWeeklyDataSteps[0], y: chartWeeklyDataSteps[1], type: 'bar', name: 'Weekly Steps', mode: 'lines+markers', marker: {color: 'purple'}}]}
          layout={ 
              { width: 420, height: 340,  title: 'Steps', xaxis: {title: {text: 'Date'} }, yaxis: {title: {text: 'Weekly Steps'} }} } /> 
              
        
             <div >
             <p>Average Steps This Week: {userAverageSteps}.</p>
             <p>Population Average: {populationAverageSteps}.</p>
             <p>{greaterOrLessThan(userAverageSteps, populationAverageSteps)}</p>
            
          </div>
          </div>)}
          
          
            { weeklyToggle == 'weeklyActivity' && (<div id = "weeklyActivity">
            
            <Plot 
            data={[
                {x: chartWeeklyDataActivity[0], y: chartWeeklyDataActivity[1], type: 'bar', name: 'Weekly Activity', mode: 'lines+markers', marker: {color: 'purple'}}]}
            layout={ 
                { width: 420, height: 340,  title: 'Active Minutes', xaxis: {title: {text: 'Date'} }, yaxis: {title: {text: 'Weekly Active Minutes'} }} } />
              
               <p>Average Active Minutes This Week: {userAverageActivity} </p>
               <p>Population Average: {populationAverageActivity}.</p>
               <p>{greaterOrLessThan(userAverageActivity, populationAverageActivity)}</p>
               
           
            </div>)}
            
            <div className = "buttonLine">
                <button className='buttonCl' onClick={()=>setWeeklyToggle("weeklySteps")}><h2>Steps</h2></button>

                <button className='buttonCl' onClick={()=>setWeeklyToggle("weeklyActivity")}><h2>Activity</h2></button>
            </div>  
            
        </div>
       
        <br></br>
        <div id = "dataLifeTimeContainer">
        <br></br>
        <h2>Lifetime Metrics</h2>
        <br></br>
        {toggle == "steps" && ( <div id= "stepgraph">
            
            <Plot 
            data={[
                {x: averageChartDataSteps[0], y: averageChartDataSteps[1], type: 'bar', name: 'Population', mode: 'lines+markers', marker: {color: 'purple'}},
                {type: 'bar', x:  chartDataSteps[0], name: 'Personal', y:  chartDataSteps[1], marker: { color: "rgba(6, 57, 219, 0.4)"}},]}
            layout={ 
                { width: 420, height: 340,  title: 'Steps', xaxis: {title: {text: 'Date'} }, yaxis: {title: {text: 'Steps'} }} } />
            
            <div >
             <p>Average Lifetime Steps: {averageLifeTimeSteps}.</p>
             <p>Total Lifetime Steps: {simpleSum(chartDataSteps[1])}.</p>
             
            
          </div>

            </div>)}
        {toggle == "weight" && ( <div id= "weightGraph">
        <Plot
                data={[ 
                    { type: 'line', x: chartDataWeight[0],  y: chartDataWeight[1], marker: { color: "rgba(6, 57, 219, 0.4)"}},
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
                <p>Average Lifetime Active Minutes: {averageLifeTimeActivity}.</p>
             <p>Total Lifetime Active Minutes: {simpleSum(chartDataActive[1])}.</p>
            </div>
            )}
            <div className= "buttonLine">
                <button className='buttonCl' onClick={()=>setToggle("steps")}><h2>Steps</h2></button>
                <button className='buttonCl' onClick={()=>setToggle("weight")}><h2>Weight</h2></button>
                <button className='buttonCl' onClick={()=>setToggle("activity")}><h2>Activity</h2></button>
            </div>
        </div>
        
       
        </div> 
    </div>
    
        
        
        
  )
}

export default DataCharts