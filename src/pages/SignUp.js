import React, { useState } from 'react';
import axios from 'axios';

export const SignUp = () => {
 
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevState) => ({
     ...prevState,
     [name]: value,
   }));
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      debugger;
      const response = await axios.post('http://localhost:8080/signup', formData);
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
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="role" placeholder="role" value={formData.role} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
