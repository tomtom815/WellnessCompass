
import React, { useEffect, useState, useContext} from 'react'
import axios from 'axios';

export const GetAllUsers = () =>{
const [usersResult, setUsers] = useState([]);
    const url = `http://localhost:3500/users/`
    useEffect(()=> {
        axios.get(url)
        .then(response => {
            setUsers(response.data) ;
        })
    },[])
    
    if(!usersResult)
    //wait for response
        return <div>Loading...</div>
    const storeUsers = JSON.stringify(usersResult)
    localStorage.setItem('usersData', storeUsers);
}