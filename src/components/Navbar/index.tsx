// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

// Module
const Navbar = () => (
    <AppBar position="static">
        <Toolbar style={{ justifyContent: 'center' }}>
            <Button color="inherit" component={Link} to="/home">
                Home
            </Button>
            <Button color="inherit" component={Link} to="/admin">
                Admin
            </Button>
        </Toolbar>
    </AppBar >
);

// Export module
export default Navbar;
