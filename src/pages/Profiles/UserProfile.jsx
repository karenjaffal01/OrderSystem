import React from 'react'
import NavBar from '../../components/NavBar'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
const UserProfile = () => {
  const auth = useSelector(state => state.auth.isAuthenticated);
  const handleSubmit = () => {
    localStorage.clear();
  }
  return (
    <div>
        <NavBar/>
        <Button onClick={handleSubmit}>Logout</Button>
    </div>
  )
}

export default UserProfile