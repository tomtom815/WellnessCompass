import React, { useState } from "react";
import { GetAllUsers } from "../../app/api/fetchAllUsers";
import { GetOneUser } from "../../app/api/fetchOneUser";
import DataCharts from "./DataCharts";

import UpdateUserInfo from "./UpdateUserInfo";


import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import UserData from "./UserData";

const SingleUser = ({ userName }) => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const userResult = GetOneUser({ userName });
  GetAllUsers();
  //const [toggle,setToggle] = useState(true);
  const [userDataRefreshFlag, setUserDataRefreshFlag] = useState(false); // Step 1: Create a state variable
  //const allUsers = JSON.parse(localStorage.getItem('usersData'));
  const result = userResult[0];
  if (!result) {
    return <div>Loading...</div>;
  }
  const handleUserDataRefresh = () => {
    setUserDataRefreshFlag(!userDataRefreshFlag);
    console.log('handleUserDataRefresh called');
  };
  return (
    <main>
      
      <UserData userResult={userResult} result={result} refreshFlag={userDataRefreshFlag} /> 
      <DataCharts />
      <UpdateUserInfo result={result} onSubmission={handleUserDataRefresh} /> 
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
};

export default SingleUser;
