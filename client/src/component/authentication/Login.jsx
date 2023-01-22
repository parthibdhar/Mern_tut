import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    // alert( " email: " + email + " password: " + password)
    await axios
      .post("http://localhost:5000/auth/login", { email, password })
      .then((res) => {
        const alldata = res.data;
        localStorage.setItem('token', alldata.user)
        // console.log("res: " + alldata.status + " " + alldata.user);
        alert("login success ");
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        alert("plz check error: " + err);
      });
  };

  // console.log("client submited " ); 

  return (
    <React.Fragment>
      <h1>Login</h1>
      <hr />
      <form onSubmit={loginUser}>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value={"Login"} />
      </form>
    </React.Fragment>
  );
};

export default Login;
