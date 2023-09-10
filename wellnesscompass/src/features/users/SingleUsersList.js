//non-functional at the moment
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import User from './User'
import { useParams } from 'react-router-dom';


const SingleUser = ({userName}) => {
    const [userResult, setUsers] = useState([]);
    const {user} = useParams()
    const url = `http://localhost:3500/users/${user}`
    console.log((url))
    useEffect(()=> {
        axios.get(url,
            {params: userName})
        .then(response => {
            setUsers(response.data) ;
            console.log(response.data)
        })
    },[userName])
    
    if(!userResult){
    //await response
        return <div>Loading...</div>
    }
    
    return(

       
        <table>
            <tr>
                <th>Name</th>
                <th>Username</th>
            </tr>
            <tbody>

            <tbody>
            {
            userResult.map((user)=> (
                <tr>
                    <td>{user.firstName}</td>
                    <td>{user.username}</td>
                </tr>
            ))
            }

            </tbody>

        
    
    </tbody>
    </table>
    )
    

   
             
    
}
export default SingleUser