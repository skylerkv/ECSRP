import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/shelterData', async (req, res) => {
    const url = 'https://homeless-shelter.p.rapidapi.com/location?lat=44.8113&lng=-91.4985&radius=5';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '46a1a962e1mshd0ba9aa0189c60dp107b31jsnce41d8beec7c',
            'X-RapidAPI-Host': 'homeless-shelter.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        res.send(result); // Send the API response as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});