import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';

export const GetOneUser = ({ userName }) => {
  const { user } = useParams();
  const url = `http://localhost:3500/users/${user}`;
  const axiosPrivate = useAxiosPrivate();
  const [userResult, setUserResult] = useState(null); // Initialize as null

  const fetchUserData = async () => {
    try {
      const response = await axiosPrivate.get(url, { params: userName });
      console.log('response:', response.data);
      setUserResult(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchUserData();

    // Set up an interval to fetch data every second (1000 milliseconds)
    const intervalId = setInterval(fetchUserData, 1000);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, [userName]);

  if (userResult === null) {
    // Loading state, while waiting for response
    return <div>Loading...</div>;
  }

  return userResult;
};
