import React, { useEffect, useState } from 'react'
// import { useJwt } from "react-jwt";
import {  decodeToken } from "react-jwt";
// import * as jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';




export const DashBoard = () => {
  const history = useNavigate();
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUserData();
  }, []);

  function getUserData() {
    const token = localStorage.getItem('token');
    // console.log("token: " + token);

    if (token) {
      // console.log("token: " + token);

      const userToken = JSON.stringify(decodeToken(token));
      const user = JSON.parse(userToken);

      // console.log("user in dashboard: " + user.name);
      if (!user) {
        localStorage.removeItem('token');
        history('/login');
      }

      setName(user.name)
      setIsLoading(false)

    } else {
      history('/login');
    }

  }



  return (
    <>
   {
    isLoading ? <div>loading...</div> :    
    <h1>kigo suna {name ? name : 'painai'}
    </h1>

   }
    </>
  )
}
