import React, { useState } from "react";
import { GetAllUsers } from "../../app/api/fetchAllUsers";
import { GetOneUser } from "../../app/api/fetchOneUser";
import DataCharts from "./DataCharts";
import {
  averageMetric,
  BMI,
  userBMR,
} from "../statistics/descriptiveStatistics";
import { Tooltip } from "react-tooltip";
import UpdateUserInfo from "./UpdateUserInfo";

import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

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

  //const allUsers = JSON.parse(localStorage.getItem('usersData'));
  const result = userResult[0];
  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {userResult.map((user) => (
        <div className="userInfo">
          <section className="column-1">
            <h2>
              Name:{" "}
              <span className="values">
                {user.firstName + " " + user.lastName}
              </span>
            </h2>

            <h2>
              Username: <span className="values">{user.username}</span>
            </h2>
          </section>
          <section className="column-2">
            <h3>
              Current Height:{" "}
              <span className="values">
                {user.height[user.height?.length - 1]?.value || 0}
              </span>
            </h3>

            <h3>
              Current Weight:{" "}
              <span className="values">
                {user.weight[user.weight?.length - 1]?.value || 0}
              </span>
            </h3>

            <h3>
              Daily Average Steps:{" "}
              <span className="values">{averageMetric(user.steps)}</span>
            </h3>

            <h3>
              BMI: <span className="values">{BMI(result)}</span>
            </h3>
            <h3>
              BMR<a className="tooltip">ⓘ</a>
              <Tooltip anchorSelect=".tooltip" place="top">
                <div class="tips">
                  Basal metabollic rate is the number of daily calories you burn
                  when you're sedentary!{" "}
                </div>{" "}
              </Tooltip>
              : <span className="values">{userBMR(result)}</span>
            </h3>
          </section>
        </div>
      ))}

      <DataCharts />
      <UpdateUserInfo result={result} />
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
};

export default SingleUser;
