
import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import useLogout from '../hooks/useLogout';
import styles from './components.css'

const NavBar = () => {
    const user = localStorage.getItem("userID");
    
    const navigate = useNavigate();
    const logout = useLogout();
  
    const signOut = async () => {
        await logout();
        navigate("/login");
      };
    const navigation = (
        <nav>
            <ul id = "navBarLinks">
                <li><a href = '/users' >Leaderboard</a></li>
                <li><a href={`/users/${user}`}>Profile</a></li>
                <li><a href onClick={signOut}>Sign Out</a></li>
            </ul>
            
        </nav>
    )
    return navigation;
}

export default NavBar;