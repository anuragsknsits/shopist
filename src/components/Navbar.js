import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../pages/auth'

export const Navbar = () => {

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline',
    }
  }
  const auth = useAuth()

  return (
    <nav>
      <NavLink style={navLinkStyles} to='/'>Home</NavLink>  
      <NavLink style={navLinkStyles} to="/login">Login</NavLink>  
      <NavLink style={navLinkStyles} to="/signup">Sign Up</NavLink>                            
      {!auth.user && 
      (
      <NavLink style={navLinkStyles} to='/about'>About Us</NavLink> ||
      <NavLink style={navLinkStyles} to="/profile">Profile</NavLink>
      )
      
      }
    </nav>
  )
}
