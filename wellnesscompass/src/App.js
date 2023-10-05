import React from 'react';
import Layout from './components/Layout';
import Public from './components/Public';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import UsersList from './features/users/UsersList';
import SingleUser from './features/users/SingleUsersList';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="register" element={<Register />}/>
        <Route path="login" element={<Login />} />
        
        {/* We want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="users">
                <Route index element={<UsersList />} />
            </Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="users/:user">
                <Route index element={<SingleUser />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
