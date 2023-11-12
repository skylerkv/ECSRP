//all below for api and db cxn
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import mysql from 'mysql2'; //for db cxn

const app = express();
const port = 3001;

app.use(cors());

//for homeless api
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

//for hospitals api
app.get('/api/hospitalData', async (req, res) => {
    const url = 'https://us-hospitals.p.rapidapi.com/?name=Eau Claire';
    const options = {
	    method: 'GET',
	    headers: {
		'X-RapidAPI-Key': '46a1a962e1mshd0ba9aa0189c60dp107b31jsnce41d8beec7c',
		'X-RapidAPI-Host': 'us-hospitals.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.text();
	    //console.log(result); //maybe change to res.send(result) like above?
        res.send(result);
    } catch (error) {
	    console.error(error);
        res.status(500).send('Error fetching data');
    }
});

//db cxn
const connection = mysql.createConnection({
    host: 'wayne.cs.uwec.edu',
    user: 'NEGASHS2861',
    password: 'R57LBTQW',
    database: 'cs485group1'
});

//for food banks db
app.get('/db/food', (req, res) => {
    const query = 'SELECT * FROM foodBanks';
    connection.query(query, (error, results) => {
        if(error){
            console.error(error);
            res.status(500).send('Error fetching data');
        }else{
            console.log(results); //test
            res.json(results);
        }
    });
});

//for volunteering db HAVENT TESTED YET
app.get('/db/volunteering', (req, res) => {
    const query = 'SELECT * FROM volunteerGroups';
    connection.query(query, (error, results) => {
        if(error){
            console.error(error);
            res.status(500).send('Error fetching data');
        }else{
            console.log(results); //test
            res.json(results);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});