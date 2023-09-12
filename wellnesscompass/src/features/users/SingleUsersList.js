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

       
        <body>
            <div className='container'>
                <div className="top-row">
                { userResult.map((user)=> (
                    <div className="top-left">
                        <h2>Name:</h2>
                        <p>{user.firstName}</p>
                    </div>
                    
            ))
            }
            { userResult.map((user)=> (
                    <div className="top-right">
                        <h2>Username:</h2>
                        <p>{user.username}</p>
                    </div>
                    
            ))
            }
                </div>
                
                
            </div>
        </body>
    )
    
    
             
    
}
export default SingleUser