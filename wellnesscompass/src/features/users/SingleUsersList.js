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
  //GetAllUsers();

  const result = userResult[0];
  if (!result) {
    return <div>Loading...</div>;
  }

  

  return (
    <main>
      <UserData userResult={userResult} result={result} /> 
      <DataCharts />
      <br></br>
      <UpdateUserInfo result={result} /> 
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
};

export default SingleUser;
