
import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import useLogout from '../hooks/useLogout';


const NavBar = () => {
    const user = localStorage.getItem("userID");
    const navigate = useNavigate();
    const logout = useLogout();
  
    const signOut = async () => {
        await logout();
        navigate("/login");
      };
    const navigation = (
        <div id = 'navigation'>
            <Link to = '/users' > <button>Leaderboard</button></Link>
            <Link to={`/users/${user}`}><button>Profile</button></Link>
            <button onClick={signOut}>Sign Out</button>

        </div>
    )
    return navigation;
}

export default NavBar;