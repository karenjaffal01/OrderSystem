import React from 'react'
import NavBar from '../../components/NavBar'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const UserProfile = () => {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth.isAuthenticated);
  const handleSubmit = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div>
        <NavBar/>
        <Button onClick={handleSubmit}>Logout</Button>
    </div>
  )
}

export default UserProfile