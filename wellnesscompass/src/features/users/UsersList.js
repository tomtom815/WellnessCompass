import React, { useEffect, useState, useContext} from 'react'
import axios from 'axios';

import './userDisplays.css'
import { averageMetric, averageWeeklyMetric, compare} from '../statistics/descriptiveStatistics';

//to display user data for the front end. 

import { GetAllUsers } from '../../app/api/fetchAllUsers';

const UsersList = () => {
    GetAllUsers();
    const usersResult = JSON.parse(localStorage.getItem('usersData'));
    
    if(!usersResult)
    //wait for response
        return <div>Loading...</div>
  
     let todayDate = new Date();
    let lastWeekDate = new Date(todayDate.getTime()-(60*60*24*7*1000))
    const today = todayDate.toISOString().slice(0,10);
    const lastWeek = lastWeekDate.toISOString().slice(0,10);
    console.log(lastWeek)
    const userNameArray = usersResult.map((user =>
        user.username))


    const averageStepsArray= usersResult.map((user =>
        averageWeeklyMetric(user.steps)))
    const averageActivityArray = usersResult.map((user =>
        averageWeeklyMetric(user.activeMinutes)))
    
    
   
 
   
    const averageValuesObject = userNameArray.map((username, index) => ({
        username, averageSteps: averageStepsArray[index], averageActivity : averageActivityArray[index]
    }))

   
    const sortBySteps = averageValuesObject.sort((a,b) =>{
        return b.averageSteps - a.averageSteps;
    }
    )
    const sortByMinutes = averageValuesObject.sort((a,b) => {
        return b.averageActivity - a.averageActivity;
    })
    
    averageValuesObject.sort(compare);
    
    if(!sortBySteps || !sortByMinutes)
        return <p>Loading...</p>

    return(
       <body>


       <table id = "users">
           <tr>
                <th>Username</th>
                <th>Average Weekly Steps</th>
            </tr>
            <tbody>
        {sortBySteps.map((user => (
        
            <tr>
                <a href={`/users/${user.username}`}><td>{user.username}</td></a>
                <td>{user.averageSteps}</td>
            </tr>
         
        )) 

    )}
    
    </tbody>
    </table>
    <table>
        <tr>
            <th>Username</th>
            <th>Average Weekly Active Minutes</th>
        </tr>
        <tbody>
            {sortByMinutes.map((user => (
        
        <tr>
            <a href={`/users/${user.username}`}><td>{user.username}</td></a>
            <td>{user.averageActivity}</td>
        </tr>
     
    )) 

)}
        </tbody>
    </table>
    </body>
    )

        }
             
    

export default UsersList