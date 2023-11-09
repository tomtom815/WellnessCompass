import React, { useState } from 'react'
import { GetAllUsers } from '../../app/api/fetchAllUsers';
import { GetOneUser } from '../../app/api/fetchOneUser';
import Plot from 'react-plotly.js';
import Plotly from 'react-plotly.js'
import { Tooltip } from "react-tooltip";

import { averageMetric, userDataDisplay, averagesDataDisplay, userDataWeeklyDisplay, weeklyPopulationAverage, weeklyStandardDeviation, greaterOrLessThan, getUserAverageForBreakDown, simpleSum, todayStats } from '../statistics/descriptiveStatistics';


const DataCharts = ({userName}) => {


    const [weeklyToggle, setWeeklyToggle] = useState(true);
    const [toggle,setToggle] = useState(true);
    const allUsers =  GetAllUsers();
    const userResult = GetOneUser({userName})
    const result = (userResult[0]);
    if(!result || !allUsers)
        return <div>Loading...</div>
   
    const chartDataSteps = userDataDisplay(result, "steps");
    const chartDataWeight = userDataDisplay(result, "weight");
    const chartDataActive = userDataDisplay(result, "activeMinutes");
    const chartWeeklyDataSleep = userDataWeeklyDisplay(result, "hoursSlept");
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
    
    const message1 = "The recommended number of daily steps for an adult is 10,000";
    const message2 = "The recommended number of active minutes for an adult is 30";
    const userAverageSteps = getUserAverageForBreakDown(chartWeeklyDataSteps[1])
    const userAverageActivity = getUserAverageForBreakDown(chartWeeklyDataActivity[1])
    const averageLifeTimeSteps = getUserAverageForBreakDown(chartDataSteps[1]);
    const averageLifeTimeActivity = getUserAverageForBreakDown(chartDataActive[1]);
    const averageChartDataSteps = averagesDataDisplay(allTheSteps)
    const averageChartDataActivity = averagesDataDisplay(allTheActivity);

    
   if(!(chartDataActive[0][0]) == false){
    while(chartDataActive[0][0] > averageChartDataActivity[0][0]){
        averageChartDataActivity[0].shift();
        averageChartDataActivity[1].shift();
    }
   }

  
   if(!(chartDataSteps[0][0]) == false){ 
    while(chartDataSteps[0][0] > averageChartDataSteps[0][0]){
      averageChartDataSteps[0].shift();
        averageChartDataSteps[1].shift();
    
    }
   }

   const userWeekSteps = {
        x: chartWeeklyDataSteps[0],
        y: chartWeeklyDataSteps[1],
        type: 'bar',
        name: 'Weekly Steps',
        marker: {color: 'purple'}
   }

   const userWeekActivity1 = {
    x: chartWeeklyDataSteps[0],
    y: chartWeeklyDataSteps[1],
    type: 'bar',
    name: 'Weekly Active Minutes',
    marker: {color: 'purple'}
   }
   
    const lifeTimeActivity1 = {
        x: averageChartDataActivity[0],
        y: averageChartDataActivity[1], 
        name: 'Population',
        type: 'bar', 
        marker: {color: 'purple'}
    }

    const lifeTimeActivity2 = {
        x: chartDataActive[0],
        y: chartDataActive[1],type: 'bar', 
        name: 'Personal', 
        marker: { color: "rgba(6, 57, 219, 0.4)"}
    }
    const lifeTimeDataActivityDisplay = [lifeTimeActivity1, lifeTimeActivity2]

    const lifeTimeSteps1 = {
        x: averageChartDataSteps[0],
        y: averageChartDataSteps[1], 
        name: 'Population',
        type: 'bar', 
        marker: {color: 'purple'}
    }

    const lifeTimeSteps2 = {
        x: chartDataSteps[0],
        y: chartDataSteps[1],
        type: 'bar', 
        name: 'Personal', 
        marker: { color: "rgba(6, 57, 219, 0.4)"}
    }
    const lifeTimeDataStepsDisplay = [lifeTimeSteps1, lifeTimeSteps2];

    const layoutSingle = {
        automargin: true
    }
    const layoutGroup = {
        barmode: 'group',
        automargin: true
    }

    

  

  return (
    <div id = "totalContainer">
        <div id = "todayDataContainer">
            <div id ="left">
            <h1>Metrics for Today</h1>
            <h3>Today's Steps <a className="tooltip2">ⓘ</a></h3>
            <Tooltip anchorSelect=".tooltip2" place="top">
                <div className="tips" key="tip">
                  {message1}
                </div>
              </Tooltip>
            <p>{todayStats(result)[1] + ' / 10,000'}</p>
           
            </div>
            <div id = "right">
            
            <h1>{todayStats(result)[0]}</h1>
            <h3><a className="tooltip3">ⓘ</a> Today's Active Minutes</h3>
            <Tooltip anchorSelect=".tooltip3" place="top">
                <div className="tips" key="tip">
                  {message2}
                </div>
              </Tooltip>
            <p>{todayStats(result)[2] + ' / 30'}</p>
            </div>
            
       
           
            
        </div>
        <div id="dataSubContainer">  
       
        <div id = "dataWeeklyContainer">
            <br></br>
            <h1>Weekly Metrics</h1>
            <br></br>
            
            { weeklyToggle == "weeklySteps" && (<div id = "weeklySteps"  style={{minHeight: "555px"}}>
           
                <Plot 
                data = {[userWeekSteps]}
                layout={[{title:'Test'}, layoutGroup]} /> 
              
        
             <div >
             <p>Average Steps This Week: {userAverageSteps}.</p>
             <p>Population Average: {populationAverageSteps}.</p>
             <p>{greaterOrLessThan(userAverageSteps, populationAverageSteps)}</p>
            
          </div>
          </div>)}
          
            { weeklyToggle == 'weeklyActivity' && (<div id = "weeklyActivity"  style={{minHeight: "555px"}} >
            
            <Plot 
            data={[
                {x: chartWeeklyDataActivity[0], y: chartWeeklyDataActivity[1], type: 'bar', name: 'Weekly Activity', marker: {color: 'purple'}, automargin: true}]}
            layout={ 
                { title: 'Active Minutes', xaxis: {title: {text: 'Date'} }, yaxis: {title: {text: 'Weekly Active Minutes'} }} } />
              <div>
              <p>Average Active Minutes This Week: {userAverageActivity} </p>
               <p>Population Average: {populationAverageActivity}.</p>
               <p>{greaterOrLessThan(userAverageActivity, populationAverageActivity)}</p>
              </div>
              
           
            </div>)}
            { weeklyToggle == 'weeklySleep' && (<div id = "weeklySleep" style={{minHeight: "555px"}} >
            
            <Plot 
            data={[
                {x: chartWeeklyDataSleep[0], y: chartWeeklyDataSleep[1], type: 'bar', name: 'Weekly Hours Slept',  marker: {color: 'purple'}, automargin: true}]}
            layout={ 
                { title: 'Hours Slept', xaxis: {title: {text: 'Date'} }, yaxis: {title: {text: 'Weekly Hours Slept'} }} } />
              
               <p>Average Hours Slept This Week: {getUserAverageForBreakDown(chartWeeklyDataSleep[1])} </p>
               
               
           
            </div>)}
            
            <div id = "buttonLine1">
                <button className='buttonCl' onClick={()=>setWeeklyToggle("weeklySteps")}><h2>Steps</h2></button>

                <button className='buttonCl' onClick={()=>setWeeklyToggle("weeklyActivity")}><h2>Activity</h2></button>
                <button className='buttonCl' onClick={()=>setWeeklyToggle("weeklySleep")}><h2>Sleep</h2></button>
            </div>  
            
        </div>
       
        <br></br>
        <div id = "dataLifeTimeContainer">
        <br></br>
        <h1>Lifetime Metrics</h1>
        <br></br>
        {toggle == "steps" && ( <div id= "stepgraph" style={{minHeight: "555px"}}>
            <Plot 
                data= {lifeTimeDataStepsDisplay}
                layout={{barmode: 'group',  automargin: true}}/>
            <div >
             <p>Average Lifetime Steps: {averageLifeTimeSteps}.</p>
             <p>Total Lifetime Steps: {simpleSum(chartDataSteps[1])}.</p>
              
          </div>

            </div>)}
        {toggle == "weight" && ( <div id= "weightGraph" style={{minHeight: "555px"}}>
        <Plot
                data={[ 
                    { type: 'line', x: chartDataWeight[0],  y: chartDataWeight[1], marker: { color: "rgba(6, 57, 219, 0.4)"}, automargin: true},
                ]}
                layout={ 
                    {  title: 'Weight', xaxis: {title: {text: 'Date'} }, yaxis: {title: {text: 'Weight (lbs)'} }} } />
            </div>
            )}
        {toggle == "activity" && (<div id= "activeMinutesGraph" style={{minHeight: "555px"}}>
            <Plot
                data= {lifeTimeDataActivityDisplay}
                layout={[layoutGroup, {title: "Lifetime Active Minutes"}]}/>
            <p>Average Lifetime Active Minutes: {averageLifeTimeActivity}.</p>
             <p>Total Lifetime Active Minutes: {simpleSum(chartDataActive[1])}.</p>
            </div>
            )}
            {toggle == "summary" && (<div id= "summaryChart" style={{minHeight: "555px"}}> 
            <Plot
                data={[
                    { values:[averageLifeTimeActivity/60, getUserAverageForBreakDown(chartWeeklyDataSleep[1]), (24-averageLifeTimeActivity/60-getUserAverageForBreakDown(chartWeeklyDataSleep[1]))], labels: ["Active Hours", "Sleep", "Other"],type: 'pie',marker: {color: ['purple', "blue", "green"]}, automargin: true}]}
                layout={ {
                     title: 'Average Daily Breakdown',xaxis: {itle: {text: 'Date'} }, yaxis: {title: {text: 'Active Minutes'}}
                    }} />
                <p>On average, you spend:</p>
                <p>
                {Math.round((averageLifeTimeActivity/60) * 100) / 100} hours a day active.
                </p>
                <p>
                {getUserAverageForBreakDown(chartWeeklyDataSleep[1])} hours a day sleeping.
                </p>
                <p>
                {Math.round((24-averageLifeTimeActivity/60-getUserAverageForBreakDown(chartWeeklyDataSleep[1])) * 100)/100} hours a day doing other activities.
                </p>
            </div>
            )}
           
      
            <div className= "buttonLine">
                <button className='buttonCl' onClick={()=>setToggle("steps")}><h2>Steps</h2></button>
                <button className='buttonCl' onClick={()=>setToggle("weight")}><h2>Weight</h2></button>
                <button className='buttonCl' onClick={()=>setToggle("activity")}><h2>Activity</h2></button>
                <button className='buttonCl' onClick={()=>setToggle("summary")}><h2>Summary</h2></button>
            </div>
        </div>
        
       
        </div> 
    </div>
    
        
        
        
  )
}

export default DataCharts