import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Post from './component/Post';
import { GetCand } from './component/GetCand';
import Register from './component/authentication/Register';
import Login from './component/authentication/Login';
import { DashBoard } from './component/authentication/DashBoard';

function App() {


  return (
    <BrowserRouter>
    <div>
      {/* <Post />
      <GetCand />
      <hr />
      <Register />
       
      <hr />
      <Login /> */}
    
      <Routes>

        <Route exact  path="/"  element={<Post />} />
        <Route exact  path="/GetCand"  element={<GetCand />} />
        <Route exact  path="/login"  element={<Login />} />
        <Route exact  path="/register"  element={<Register />} />
        <Route exact  path="/dashboard"  element={<DashBoard />} />

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
