// Dependencies
import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import axiosClient from '../../clients/http';

// Module
const Admin = () => {
    const formFields = [
        { id: 'name', label: 'Name', type: 'text' },
        { id: 'location', label: 'Location', type: 'text' },
        { id: 'longitude', label: 'Longitude', type: 'number' },
        { id: 'latitude', label: 'Latitude', type: 'number' },
        { id: 'opening_hours', label: 'Opening Hours', type: 'text' }
    ];

    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('green');
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        longitude: '',
        latitude: '',
        opening_hours: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        const isNumberField = name === 'longitude' || name === 'latitude';
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: isNumberField ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosClient.post('/stores', formData);
            console.log(response);
            setMessage('Success! Data submitted.');
            setMessageColor('green');
        } catch (error) {
            setMessage('Form submission Error');
            setMessageColor('red');
        }
    };

    return (
        <Container maxWidth="sm">
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                marginTop={'50px'}
            >
                <Grid item xs={12} container direction="column" spacing={2}>
                    <Grid container justifyContent="center">
                        <Typography variant="h4">
                            Add New Store
                        </Typography>
                    </Grid>
                    {formFields.map((field) => (
                        <Grid item xs={12} key={field.id}>
                            <TextField
                                fullWidth
                                required
                                id={field.id}
                                name={field.id}
                                label={field.label}
                                type={field.type}
                                value={formData[field.id]}
                                onChange={handleChange}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {message && (
                            <Typography color={messageColor}>
                                {message}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

// Export module
export default Admin;
