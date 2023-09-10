import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="register" element={<Register />}/>
        <Route path="login" element={<Login/>}/>
      </Route>
    </Routes>
  );
}

export default App;
