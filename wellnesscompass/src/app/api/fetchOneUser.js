import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';
import SingleUser from '../../features/users/SingleUsersList';

export const GetOneUser = ({userName}) => {
    const [userResult, setUser] = useState([]);
    const {user} = useParams()
    const url = `http://localhost:3500/users/${user}`;
    const axiosPrivate = useAxiosPrivate();


    useEffect(()=> {
        axiosPrivate.get(url,
            {params: userName})
        .then(response => {
            setUser(response.data) ;
            
        })
    },[userName])
    if(!userResult){
        //await response
            return <div>Loading...</div>
    }
  
   return userResult;
}