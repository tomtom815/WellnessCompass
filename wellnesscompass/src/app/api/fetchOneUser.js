import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';

export const GetOneUser = ({ userName }) => {
  const { user } = useParams();
  const url = `http://localhost:3500/users/${user}?_=${Date.now()}`;
  const axiosPrivate = useAxiosPrivate();
  const [userResult, setUserResult] = useState(null); // Initialize as null

  useEffect(() => {
    // ...
    axiosPrivate.get(url, { params: userName })
      .then((response) => {
        console.log('response:', response.data)
        setUserResult(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userName]);

  if (userResult === null) {
    // Loading state, while waiting for response
    return <div>Loading...</div>;
  }

  return userResult;
};
