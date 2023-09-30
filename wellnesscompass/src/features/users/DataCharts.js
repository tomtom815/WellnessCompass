import React, { useState } from 'react'
import { GetAllUsers } from '../../app/api/fetchAllUsers';
import { GetOneUser } from '../../app/api/fetchOneUser';
import Plot from 'react-plotly.js';

import { userDataDisplay, averagesDataDisplay } from '../statistics/descriptiveStatistics';


const DataCharts = ({userName}) => {
    GetAllUsers();
    const [toggle,setToggle] = useState(true);
    const allUsers = JSON.parse(localStorage.getItem('usersData'));
    
    const userResult = GetOneUser({userName})
    const result = (userResult[0]);
    if(!result || !allUsers)
        return <div>Loading...</div>
    
    const chartDataSteps = userDataDisplay(result, Object.keys(result)[8]);
    const chartDataWeight = userDataDisplay(result, Object.keys(result)[5]);
    const chartDataActive = userDataDisplay(result, Object.keys(result)[9]);
    
    const allTheSteps = allUsers.map((user =>
       user.steps
    )).flat(1)

    const allTheActivity = allUsers.map((user =>
        user.activeMinutes
     )).flat(1)

    const averageChartDataSteps = averagesDataDisplay(allTheSteps)
    const averageChartDataActivity = averagesDataDisplay(allTheActivity);

    


  return (
    <div id="dataContainer">        
        {toggle == "steps" && ( <div id= "stepgraph">
        <Plot
                    data={[
                        {
                            x: averageChartDataSteps[0],
                            y: averageChartDataSteps[1],
                            type: 'bar',
                            name: 'Population',
                            mode: 'lines+markers',
                            marker: {color: 'purple'},
                        },
                        {
                            type: 'bar',
                            x:  chartDataSteps[0], 
                            name: 'Personal',
                            y:  chartDataSteps[1], 
                            marker: { color: "rgba(6, 57, 219, 0.4)"}
                        },
                    ]}
                    layout={ 
                        {
                            width: 420, 
                            height: 340, 
                            title: 'Steps',
                            xaxis: {
                                title: {text: 'Date'} 
                            },
                            yaxis: {
                                title: {text: 'Steps'} 
                            }} } />
            </div>)}
            {toggle == "weight" && (
            <div id= "weightGraph">
                <Plot
                    data={[
                        {
                            type: 'bar',
                            x: chartDataWeight[0], 
                            y: chartDataWeight[1], 
                            marker: { color: "rgba(6, 57, 219, 0.4)"}
                        },
                    ]}
                    layout={ 
                        {
                            width: 420, 
                            height: 340, 
                            title: 'Weight',
                            xaxis: {
                                title: {text: 'Date'} 
                            },
                            yaxis: {
                                title: {text: 'Weight (lbs)'} 
                            }} } />
            </div>
            )}
            {toggle == "activity" && (
            <div id= "activeMinutesGraph">
                <Plot
                    data={[
                        {
                            x: averageChartDataActivity[0],
                            y: averageChartDataActivity[1],
                            name: 'Population',
                            type: 'bar',
                            mode: 'lines+markers',
                            marker: {color: 'purple'}
                        },
                        {
                            type: 'bar', 
                            x: chartDataActive[0],
                            y: chartDataActive[1],
                            name: 'Personal',
                            marker: { color: "rgba(6, 57, 219, 0.4)"}},
                    ]}
                    layout={ 
                        {
                            width: 420,
                            height: 340, 
                            title: 'Active Minutes',
                            xaxis: {
                                title: {text: 'Date'} 
                            },
                            yaxis: {
                                title: {text: 'Active Minutes'} 
                            }
                        }
                        
                    }
                
                    />
            </div>
            )}
            <div id = "buttonLine">
                <button className='buttonCl' onClick={()=>setToggle("steps")}><h2>Steps</h2></button>
                <button className='buttonCl' onClick={()=>setToggle("weight")}><h2>Weight</h2></button>
                <button className='buttonCl' onClick={()=>setToggle("activity")}><h2>Activity</h2></button>
            </div>
        </div> 
  )
}

export default DataCharts