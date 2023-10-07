import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

import { redirect } from 'react-router-dom';

import axios from '../../app/api/axios';
const LOGIN_URL = '/auth';


const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useLocalStorage('username', '');//useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
            });
            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles; **Didn't bother using roles in the back end because we don't have admin, editors, etc.
            setAuth({ username, password, accessToken }); // If we used roles, they would be passed into setAuth as well
            setUsername('');
            setPassword('');

            // Check if 'from' is the Register page. If so, navigate to the
            // users page
            if (from === '/') {
                navigate('/users/')
            } else { // This branch will send user (once they've been authenticated) to the page they were trying to reach
                navigate(from, { replace: true });
            }

            localStorage.setItem("userID",username); //testing some things with successful login

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    return(
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={usernameRef}
                    autoComplete='off'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />
                <label htmlFor='password'>Password:</label>
                <input
                    type="password"
                    id="password"
                    autoComplete='off'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist} />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            Need an Account?<br />
            <span className="line">
                <a href="/register">Sign Up</a>
            </span>
        </section>
    )
}

export default Login