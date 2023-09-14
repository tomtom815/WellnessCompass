import React, { useEffect, useState, useContext} from 'react'
import axios from 'axios';

import './userDisplays.css'
import { averageMetric} from '../statistics/descriptiveStatistics';

//to display user data for the front end. 

import { GetAllUsers } from '../../app/api/fetchAllUsers';

const UsersList = () => {
    GetAllUsers();
    const usersResult = JSON.parse(localStorage.getItem('usersData'));
    
    if(!usersResult)
    //wait for response
        return <div>Loading...</div>
  
    
    const userNameArray = usersResult.map((user =>
        user.username))
    const averageStepsArray= usersResult.map((user =>
        averageMetric(user.steps)))
    const averageActivityArray = usersResult.map((user =>
        averageMetric(user.activeMinutes)))
  
    
    const averageValuesObject = userNameArray.map((username, index) => ({
        username, averageSteps: averageStepsArray[index], averageActivity : averageActivityArray[index]
    }))
    
    const sortBySteps = averageValuesObject.sort((a,b) =>{
        return b.averageSteps - a.averageSteps;
    }
    )
    
    const sortByActivity = averageValuesObject.sort((a,b) =>{
        return b.averageActivity - a.averageActivity;
    }
    )
    
    console.log(sortBySteps)

    return(
       <main>

       <table id = "users">
           <tr>
                <th>Username</th>
                <th>Average Steps</th>
            </tr>
            <tbody>
        {sortBySteps.map((user => (
        
            <tr>
                <td><a href={`/users/${user.username}`}>{user.username}</a></td>
                <td>{user.averageSteps}</td>
            </tr>
         
        )) 
    )}
    
    </tbody>
    </table>
    </main>
    )

        }
             
    

export default UsersList