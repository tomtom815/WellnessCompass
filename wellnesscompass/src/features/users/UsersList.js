import React, { useEffect, useState, useContext } from "react";

import "./userDisplays.css";
import {
  averageMetric,
  averageWeeklyMetric,
  compare,
} from "../statistics/descriptiveStatistics";

import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

//to display user data for the front end.
import { GetAllUsers } from "../../app/api/fetchAllUsers";

const UsersList = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  GetAllUsers();
  const usersResult = JSON.parse(localStorage.getItem("usersData"));

  if (!usersResult)
    //wait for response
    return <div>Loading...</div>;

  const userNameArray = usersResult.map((user) => user.username);

  const averageStepsArray = usersResult.map((user) =>
    averageWeeklyMetric(user.steps)
  );
  const averageActivityArray = usersResult.map((user) =>
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
    <main>
      <table id="users">
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
      <table>
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
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
};

export default UsersList;
