import React, { useState } from "react";
import { GetAllUsers } from "../../app/api/fetchAllUsers";
import { GetOneUser } from "../../app/api/fetchOneUser";
import DataCharts from "./DataCharts";
import UpdateUserInfo from "./UpdateUserInfo";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import UserData from "./UserData";
import NavBar from "../../components/NavBar";


const SingleUser = ({ userName }) => {
 
  const userResult = GetOneUser({ userName });
  //GetAllUsers();

  const result = userResult[0];
  if (!result) {
    return <div>Loading...</div>;
  }
  
  //control whether to display add info
  const currentUserPage = result.username;
  let accessingUser =  localStorage.getItem("userID");
  let accessView = ""
  if(accessingUser !== currentUserPage ){
    accessView = "none"
  }
  

  return (
    <body>
      <title>Your Profile</title>
      <main>
      <NavBar/>
      <UserData userResult={userResult} result={result} /> 
      <DataCharts />
      <br></br>
      <div style ={{ display: accessView}}>
      <UpdateUserInfo result={result}/> 
      </div>
      
     
    </main>
    </body>
    
  );
};

export default SingleUser;
