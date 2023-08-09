import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useCurrentUser } from '@store/AuthContext';
import { removeToken } from '@service/auth';

const Navbar = () => {
  const { user } = useCurrentUser()

  const logout = async() => {
    await removeToken()
    window.location.reload()
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
          <Button color="inherit">
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