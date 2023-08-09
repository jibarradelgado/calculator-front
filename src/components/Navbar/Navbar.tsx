import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Calculator App
        </Typography>
        <Typography variant="body1" sx={{ marginRight: 20 }}>
          {/* Balance: {balance} credits */}
        </Typography>
        <Button color="inherit">
          Top up credits
        </Button>
        <Button color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;