
import React, { useEffect, useState, useContext} from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const GetAllUsers = () =>{
    const [usersResult, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const url = `http://localhost:3500/users/`
    useEffect(()=> {
        axiosPrivate.get(url)
        .then(response => {
            setUsers(response.data) ;
        })
    },[])
    
    if(!usersResult)
    //wait for response
        return <div>Loading...</div>
    return usersResult;
}