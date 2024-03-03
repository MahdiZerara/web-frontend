// Dependencies
import axios from 'axios';

// Axios setup
export default axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        // Add more headers here
    },
    timeout: 30000
});
