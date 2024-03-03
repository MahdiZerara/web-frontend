// Dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { appSliceActions, appUseDispatch } from '../../store';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = appUseDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        if (username === 'admin' && password === 'admin') {
            dispatch(appSliceActions.LoginUser({ isLoggedIn: true }));
            navigate('/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop={'50px'}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '16px' }}
                    >
                        Login
                    </Button>
                </form>
            </Box>

            <div>
                <h3>Note:</h3>
                <p>Username: admin</p>
                <p>Password: admin</p>
            </div>
        </Container>
    );
};

export default LoginForm;
