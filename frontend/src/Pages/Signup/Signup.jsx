import React, { useState } from "react";
import "../../App.css";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const newUser = await axios.post('http://localhost:3000/signup', {
        email, password
      })

      if(newUser.status ===201){
        console.log('success')
        navigate('/home')
      }
    } catch (error) 
    {
      console.log(error)
    }
  };

  return (
    <div class="login-box">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
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

        <input type="submit" id="Signup" value="Signup" />
      </form>
  
    </div>
  );
}

export default Signup;
