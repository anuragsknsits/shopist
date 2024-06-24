import React, { useState } from 'react'
import axios from 'axios';

export const Login = () => {

    const [user, setUser]= useState({
      username: '',
      password: '',
    })

    const handleChange = (e) => {
      const { name, value } = e.target;
      
      setUser((prevState) => ({
       ...prevState,
       [name]: value,
     }));
     
    };


    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/authenticate', user);
        console.log('User signed up:', response.data);
        // Handle success, show a success message, redirect, etc.
      } catch (error) {
        debugger;
        console.error('Error signing up:', error);
        // Handle error, show error message to the user
      }
    };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} required />
        <br/>
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
