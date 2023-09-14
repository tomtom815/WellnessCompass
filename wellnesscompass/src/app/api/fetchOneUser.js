import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const GetOneUser = ({userName}) => {
    const [userResult, setUser] = useState([]);
    const {user} = useParams()
    const url = `http://localhost:3500/users/${user}`
    
    useEffect(()=> {
        axios.get(url,
            {params: userName})
        .then(response => {
            setUser(response.data) ;
            
        })
    },[userName])
    if(!userResult){
        //await response
            return <div>Loading...</div>
    }
    const storeUser= JSON.stringify(userResult)
    localStorage.setItem('userSingleData', storeUser);
}