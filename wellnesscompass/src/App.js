import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import UsersList from './features/users/UsersList';
import SingleUser from './features/users/SingleUsersList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="register" element={<Register />}/>
        <Route path="login" element={<Login/>}/>
        <Route path="users">
            <Route index element={<UsersList />} />
        </Route>
        <Route path="users/:user">
            <Route index element={<SingleUser />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
