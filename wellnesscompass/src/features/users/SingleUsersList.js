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
  const [userDataRefreshFlag, setUserDataRefreshFlag] = useState(0); // Step 1: Create a state variable with initial value 0

  const result = userResult[0];
  if (!result) {
    return <div>Loading...</div>;
  }

  const handleUserDataRefresh = () => {
    setUserDataRefreshFlag(userDataRefreshFlag + 1); // Step 3: Update the key to trigger a refresh
    console.log('handleUserDataRefresh called');
  };

  return (
    <main>
      <UserData userResult={userResult} result={result} refreshFlag={userDataRefreshFlag} /> 
      <DataCharts />
      <br></br>
      <UpdateUserInfo result={result} onSubmission={handleUserDataRefresh} /> 
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
};

export default SingleUser;
