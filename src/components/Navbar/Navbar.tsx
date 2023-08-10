import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useCurrentUser } from '@store/AuthContext';
import { removeToken, retrieveToken } from '@service/auth';
import axios from 'axios';
import { baseUrl } from '@service/config';

const Navbar = () => {
  const { user, updateUserBalance } = useCurrentUser()

  const logout = async() => {
    await removeToken()
    window.location.reload()
  }

  const handleTopup = async () => {
    const token = `Bearer ${await retrieveToken()}`
    axios.post(`${baseUrl}/calculator/api/v1/users/topup?userId=${user?.id}`,
    null, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      if(user) {
        updateUserBalance(res.data.balance)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Calculator App
        </Typography>
        { (user && user!=null) && 
        <>
          <Typography variant="body1" sx={{ marginRight: 3 }}>
            Balance: {user.balance} credits
          </Typography>
          <Button color="inherit" onClick={handleTopup}>
            Top up credits
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;