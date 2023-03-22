'use strict';


console.log('server :)');
// *** REQUIRES ****(Like import but for the backend)

const express = require('express');
require('dotenv').config();
const cors = require('cors');

let weatherData = require('./data/weather.json');


// *** ONCE WE BRING IN EXPRESS WE CALL IT TO CREATE THE SERVER
// ** app === server

const app = express();

// *** MIDDLEWARE - CORS ***
app.use(cors());

// *** PORT THAT MY SERVER WILL RUN ON ***
const PORT = process.env.PORT || 3002;


app.listen(PORT, () => console.log(`We are running port ${PORT}!`));


// *** ENDPOINTS ****


// *** BASE ENDPOINT - PROOF OF LIFE
// ** 1st arg - string url in quotes
// ** 2nd arg - callback that will execute when that endpoint is hit


app.get('/hello', (request, response) => {
  console.log(request.query);
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;

  response.status(200).send(`Hello ${userFirstName}  ${userLastName}! Welcome to my server!`);
});



app.get('/weather', (request, response, next) => {
  // Request that is being searched
  let queriedCity = request.query.city_name.toLowerCase();
  let dataToGroom = weatherData.find(city => city.city_name.toLowerCase() === queriedCity);
  // response.status(200).send(`You are looking for ${queriedCity}`);
  // let lat = request.query.lat;
  // let lon = request.query.lon;
  try {
    // let dataToSend = new Forecast(dataToGroom.data[0].valid_date,dataToGroom.data[0].weather.description);
    // response.status(200).send(dataToSend);
    let theWeather = dataToGroom.data.map((day) => new Forecast(day)); 
    console.log(theWeather[0].date);
    response.status(200).send(theWeather);
  } catch (error) {
    next(error.message);
  }
});




// *** CLASS TO GROOM BULKY DATA ***


class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}




// *** CATCH ALL - BE AT THE BOTTOM AND SERVE AS A 404 MESSAGE
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


/*
UNUSED CODE


app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});


app.get('/hello', (request, response) => {
  console.log(request.query);
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;

  response.status(200).send(`Hello ${userFirstName}  ${userLastName}! Welcome to my server!`);
});







*/