import React, { useEffect, useState } from 'react'
import axios from 'axios';
import User from './User'

const SingleUser = ({userName}) => {
    const [userResult, setUsers] = useState([]);
    const url = `http://localhost:3500/users/${userName}`
    useEffect(()=> {
        axios.get(url)
        .then(response => {
            setUsers(response.data) ;
            console.log(response.data)
        })
    },[userName])
    
    if(!userResult)
        return <div>Loading...</div>
    
    return(
        
        <table>
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Weight</th>
            </tr>
            <tbody>
        {userResult.map((user => (
            <tr>
                <td>{user.firstName}</td>
                <td>{user.username}</td>
                <td>{user.weight}</td>
            </tr>

        )) 
    )}
    </tbody>
    </table>

    )

   
             
    
}
export default SingleUser