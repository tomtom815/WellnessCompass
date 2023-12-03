import React, { useEffect, useState, useContext } from "react";

import "./userDisplays.css";
import {
  averageMetric,
  averageWeeklyMetric,
  compare,
} from "../statistics/descriptiveStatistics";
import { Link } from "react-router-dom";

//to display user data for the front end.
import { GetAllUsers } from "../../app/api/fetchAllUsers";
import NavBar from "../../components/NavBar";

const UsersList = () => {
  
  function Example() {
    useEffect(() => {
      document.title = 'My Page Title';
    }, []);
  }
  const usersResult = GetAllUsers();

  if (!usersResult)
    //wait for response
    return <div>Loading...?</div>;
  
  const filteredUsers = usersResult.filter((user) => user.userConsent == true);

  const userNameArray = filteredUsers.map((user) => user.username);

  let averageStepsArray = filteredUsers.map((user) =>
    averageWeeklyMetric(user.steps)
  );
  const averageActivityArray = filteredUsers.map((user) =>
    averageWeeklyMetric(user.activeMinutes)
  );
  const averageValuesObject = userNameArray.map((username, index) => ({
    username,
    averageSteps: averageStepsArray[index],
    averageActivity: averageActivityArray[index],
  }));
  

  //create copy of array
  const sortBySteps = averageValuesObject.slice();
  const sortByMinutes = averageValuesObject.slice();

  //sort arrays
  sortBySteps.sort((a, b) => {
    return b.averageSteps - a.averageSteps;
  });

  sortByMinutes.sort((a, b) => {
    return b.averageActivity - a.averageActivity;
  });

  if (!sortBySteps || !sortByMinutes) return <p>Loading...</p>;

  return (
    <body>
    <main>
      <NavBar/>
      <h1 id = "titleleader">Weekly Leaderboard</h1>
      <div id ='leaderboard'>
      <table className="users" id = "minutes">
        <thead>
          <tr>
            <th>Username</th>
            <th>Average Weekly Steps</th>
          </tr>
        </thead>
        <tbody>
          {sortBySteps.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.username}`}>{user.username}</Link>
              </td>
              <td>{user.averageSteps}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <table class = "users" id = "activity">
        <thead>
          <tr>
            <th>Username</th>
            <th>Average Weekly Active Minutes</th>
          </tr>
        </thead>
        <tbody>
          {sortByMinutes.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.username}`}>{user.username}</Link>
              </td>
              <td>{user.averageActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
     
    </main>
    </body>
    
  );
};

export default UsersList;
