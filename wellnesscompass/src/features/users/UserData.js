import React, { useEffect } from 'react';
import {
  averageMetric,
  BMI,
  userBMR,
} from "../statistics/descriptiveStatistics";
import { Tooltip } from "react-tooltip";

const UserData = ({ userResult, result, refreshFlag }) => {
  // Define a useEffect hook to listen for changes in refreshFlag
  useEffect(() => {
    userResult[0] &&
      console.log(
        userResult[0].weight[userResult[0].weight?.length - 1]?.value || 0
      );
    console.log('refreshFlag changed', refreshFlag);
    console.log('userResult:', userResult);
  }, [userResult, refreshFlag]); // Specify refreshFlag as a dependency

  if (!Array.isArray(userResult)) {
    // If userResult is not an array (initial load or error state), render loading or an error message
    return <div>Loading...</div>; // You can replace this with an appropriate message
  }

  return (
    <div key={refreshFlag} className="userInfoContainer">
      {userResult.map((user) => (
        <div className="userInfo" key={user.id}>
          <section className="column-1">
            <h2>
              Name:{" "}
              <span className="values" key={user.firstName + " " + user.lastName}>
                {user.firstName + " " + user.lastName}
              </span>
            </h2>

            <h2>
              Username: <span className="values" key={user.username}>{user.username}</span>
            </h2>
          </section>
          <section className="column-2">
            <h3>
              Current Height:{" "}
              <span className="values" key={user.height[user.height?.length-1]?.value||0}>
                {user.height[user.height?.length - 1]?.value || 0}
              </span>
            </h3>

            <h3>
              Current Weight:{" "}
              <span className="values" key={user.weight[user.weight?.length-1]?.value || 0}>
                {user.weight[user.weight?.length - 1]?.value || 0}
              </span>
            </h3>

            <h3>
              Daily Average Steps:{" "}
              <span className="values" key={averageMetric(user.steps)}>{averageMetric(user.steps)}</span>
            </h3>

            <h3>
              BMI: <span className="values" key={BMI(result)}>{BMI(result)}</span>
            </h3>
            <h3>
              BMR<a className="tooltip">ⓘ</a>
              <Tooltip anchorSelect=".tooltip" place="top">
                <div className="tips" key="tip">
                  Basal metabollic rate is the number of daily calories you burn
                  when you're sedentary!{" "}
                </div>{" "}
              </Tooltip>
              : <span className="values" key={userBMR(result)}>{userBMR(result)}</span>
            </h3>
          </section>
        </div>
        
      ))}
      </div>
  )
}

export default UserData