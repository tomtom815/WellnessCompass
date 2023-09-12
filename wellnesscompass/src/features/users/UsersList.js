import React, { useEffect, useState } from 'react'
import axios from 'axios';
import User from './User'

//to display user data for the front end. 


const UsersList = () => {
    const [userResult, setUsers] = useState([]);
    const url = `http://localhost:3500/users/`
    useEffect(()=> {
        axios.get(url)
        .then(response => {
            setUsers(response.data) ;
            console.log(response.data)
        })
    },[])
    
    if(!userResult)
    //wait for response
        return <div>Loading...</div>
    
    return(
        //return an ugly table
        <table>
            <tr>
                <th>Name</th>
                <th>Username</th>
            </tr>
            <tbody>
        {userResult.map((user => (
            <tr>
                <td>{user.firstName}</td>
                <td>{user.username}</td>
            </tr>

        )) 
    )}
    </tbody>
    </table>

    )

   
             
    
}
export default UsersList