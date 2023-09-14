import React, { useState } from 'react'
import { GetAllUsers } from '../../app/api/fetchAllUsers';
import { GetOneUser } from '../../app/api/fetchOneUser';
import DataCharts from './DataCharts';



const SingleUser = ({userName}) => {
    GetOneUser({userName})
    GetAllUsers();
    const [toggle,setToggle] = useState(true);
    const userResult = JSON.parse(localStorage.getItem('userSingleData')); 
    
    const result = (userResult[0]);
    if(!result){
        return <div>Loading...</div>
    }else{
        return(
       
        <main>
            
                
                { userResult.map((user)=> (
                    <div className="userInfo">  
                        <section className="column-1">
                            <h2>Name: <span className="values">{user.firstName +" " +user.lastName}</span></h2>
                        
                            <h2>Username: <span className="values">{user.username}</span></h2>

                            
                           
                        </section>
                        <section className="column-2">
                            <h3>Height: <span className="values">{user.height[user.height?.length -1]?.value || 0}</span></h3>
                            
                            <h3>Last Weight: <span className="values">{user.weight[user.weight?.length - 1]?.value || 0}</span></h3>
                           
                            <h3>Average Steps: <span className="values">{(user.steps[user.steps?.length - 1]?.value/user.steps?.length).toFixed(2) || 0}</span></h3>
                            
                            <h3>BMI: <span className="values">{(703 * (user.weight[user.weight?.length - 1]?.value/Math.pow(user.height[user.height?.length -1]?.value,2))).toFixed(2) || 0}</span></h3>
                           
                        </section>
                    </div>
                    
            ))
            }
          
                
            
          
           
      
            <DataCharts/>
        </main>
        )
    }
}
export default SingleUser;
