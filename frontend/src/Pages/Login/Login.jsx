import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/userSlice";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const newUser = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (newUser.status === 200) {
        
        dispatch(setToken({ token: newUser.data?.token }));
       
        
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />

        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />

        <input type="submit" id="Login" value="Login" />

        <p>
          New User? <a href="/signup">Click Here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
