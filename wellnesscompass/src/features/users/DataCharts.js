import React, { useState } from 'react'
import { GetAllUsers } from '../../app/api/fetchAllUsers';
import { GetOneUser } from '../../app/api/fetchOneUser';
import Plot from 'react-plotly.js';

const DataCharts = ({userName}) => {
    GetOneUser({userName})
    GetAllUsers();
    const [toggle,setToggle] = useState(true);
    const userResult = JSON.parse(localStorage.getItem('userSingleData')); 
    const stepDataArray = [];
    const dateArraySteps = []
    const weightDataArray = [];
    const dateArrayWeight = []
    const activeMinutesArray = [];
    const dateArrayActive = []
    //arrays to hold data for display
    const result = (userResult[0]);
    if(!result)
        return <div>Loading...</div>
    const stepData = result.steps;
    const weightData = result.weight
    const activeMinutesData = result.activeMinutes
    if(!stepData || !weightData || !activeMinutesData)
        return  <div>Loading...</div>
    for(let i = 0; i < stepData.length; i++){
        //cannot get map to work for this for some reason so we're going with
        //a regular for-loop to add data in
        stepDataArray[i] = stepData[i].value;
        dateArraySteps[i] = stepData[i].date;
    }
    for(let i = 0; i < weightData.length; i++){
        weightDataArray[i] = weightData[i].value;
        dateArrayWeight[i] = weightData[i].date;
    }
    for(let i = 0; i < activeMinutesData.length; i++){
        activeMinutesArray[i] = activeMinutesData[i].value;
        dateArrayActive[i] = activeMinutesData[i].date;
    }
  return (
    <div id="dataContainer">
                
               {toggle == "steps" && ( <div id= "stepgraph">
                    <Plot
                        data={[
                            {
                            x: dateArraySteps,
                            y: stepDataArray,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'green'},
                            },
                            {type: 'bar', x: dateArraySteps, y: stepDataArray, marker: { color: "rgba(6, 57, 219, 0.4)"}},
                        ]}
                        layout={ {width: 420, height: 340, title: 'Steps'} }
                        config = {{responsive :true}}/>
                </div>)}
                {toggle == "weight" && (
                <div id= "weightGraph">
                    <Plot
                        data={[
                            {
                            x: dateArrayWeight,
                            y: weightDataArray,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'green'},
                            },
                            {type: 'bar', x: dateArrayWeight, y: weightDataArray, marker: { color: "rgba(6, 57, 219, 0.4)"}},
                        ]}
                        layout={ {width: 420, height: 340, title: 'Weight'} } />
                 </div>
                )}
                {toggle == "activity" && (
                <div id= "activeMinutesGraph">
                    <Plot
                        data={[
                            {
                            x: dateArrayActive,
                            y: activeMinutesArray,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'green'},
                            },
                            {type: 'bar', x: dateArrayActive, y: activeMinutesArray, marker: { color: "rgba(6, 57, 219, 0.4)"}},
                        ]}
                        layout={ {width: 420, height: 340, title: 'Active Minutes'} }
                       
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