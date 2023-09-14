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
  
    
    
    return(
       
       <table id = "users">
           <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Average Steps</th>
            </tr>
            <tbody>
        {usersResult.map((user => (
            
            <tr>
                <td>{user.firstName}</td>
                <td>{user.username}</td>
                <td>{averageMetric(user.steps)}</td>
            </tr>
         
        )) 
    )}
    
    </tbody>
    </table>
    
    )

   
             
    
}
export default UsersList