'use strict';


console.log('server :)');
// *** REQUIRES ****(Like import but for the backend)

// Requring express after intall
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');

// let weatherData = require('./data/weather.json');


// *** ONCE WE BRING IN EXPRESS WE CALL IT TO CREATE THE SERVER
// ** app === server

// Activating server by giving it a name
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



app.get('/weather', getWeather);
app.get('/movies', getMovies);



// TODO: BUILD ANOTHER CLASS TO TRIM DOWN THAT DATA


// *** CLASS TO GROOM BULKY DATA ***



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

  let theWeather = cityInfo.data.map((day) => new Forecast(day));
  response.status(200).send(`Hello ${userFirstName}  ${userLastName}! Welcome to my server!`);
});

let queriedCity = request.query.city_name.toLowerCase();

  let dataToSend = new Forecast(dataToGroom.data[0].valid_date,dataToGroom.data[0].weather.description);
   response.status(200).send(dataToSend);

BEFORE REFACTOR
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityName = request.query.searchQuery;


    // TODO: find that city based on cityName - json
    let cityInfo = weatherData.find(city => city.city_name.toLowerCase() === cityName.toLowerCase());


    // TODO: send data to class to be groomed
    console.log(theWeather);
    response.status(200).send(theWeather);
  } catch (error) {
    next(error.message);
  }

   TODO: BUILD AN ENDPOINT THAT WILL CALL OUT TO AN API
    console.log('second test', weatherResults.data.data);

     let weather = weatherResults.data.data.map((day) => new Forecast(day.low_temp)); const forecastArr = arr => {
    return arr.map(
       obj => {
        return new Forecast (obj.datetime, `Low of ${obj.low_temp}, high of ${obj.high_temp} with ${obj.weather.description}`);
     }
    );
  };
  console.log(forecastArr(weatherResults.data));
*/


