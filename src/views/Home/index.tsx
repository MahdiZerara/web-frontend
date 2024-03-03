// Dependencies
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button, Container, Box, Stack, Pagination } from '@mui/material';
import axiosClient from '../../clients/http';

interface Store {
    name: string;
    location: string;
    opening_hours: string;
}

// Module
const Home = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(0);
    const [requestFailed, setRequestFailed] = useState(false);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axiosClient.get<Store[]>('/stores');
                setStores(response.data);
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
                setRequestFailed(false);
            } catch (error) {
                console.error('Failed to fetch stores:', error);
                setRequestFailed(true);
            }
        };

        fetchStores();
    }, []);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    // Calculate the items to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = stores.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Container maxWidth="md">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop={'15px'}
            >
                {requestFailed ? (
                    <Box textAlign="center" mt={5}>
                        <Typography variant="h6" color="error">Items Not Found</Typography>
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={2} padding={2} justifyContent="center">
                            {currentItems.map((store, index) => (
                                <Grid item xs={12} sm={12} md={12} key={index}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {store.name}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Location: {store.location}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Opening Hours: {store.opening_hours}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        {stores.length > 0 && (
                            <Stack spacing={2} alignItems="center" marginTop={2}>
                                <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
                            </Stack>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};

// Export module
export default Home;
