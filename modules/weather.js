'use strict';
const axios = require('axios');

let cache = {};

async function getWeather(request, response, next) {
  try {
    // TODO: accept my queries -> /weeather?searchQuery=value
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityInfo = request.query.searchQuery;

    let key = `${lat},${lon}-Weather`; // key = seattle-weather
    //2.628e+9
    if (cache[key] && (Date.now() - cache[key].timestamep) < 10000) {

      console.log('Cache was hit!');

      response.status(200).send(cache[key].data);

    } else {

      console.log('No items in cache');

      const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BIT_API}&lat=${lat}&lon=${lon}&days=5`;

      // https://api.weatherbit.io/v2.0/forecast/daily?key=00137711fc9848cc9aa9ccb5c852e1f0&lat=47.6062&lon=-122.3321&days=5

      const weatherResults = await axios.get(url);

      let forecastWeather = weatherResults.data.data.map(day => new Forecast(day));


      cache[key] = {
        data: forecastWeather,
        timestamep: Date.now()
      };
      response.status(200).send(forecastWeather);
    }
  } catch (error) {
    next(error.message);
  }
  console.log(cache);
}

class Forecast {
  // constructing a new object
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}


module.exports = getWeather;
/*
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BIT_API}&lat=${lat}&lon=${lon}&days=5`;

    // https://api.weatherbit.io/v2.0/forecast/daily?key=00137711fc9848cc9aa9ccb5c852e1f0&lat=47.6062&lon=-122.3321&days=5

    const weatherResults = await axios.get(url);



    let forecastWeather = weatherResults.data.data.map(day => {
      let newForecast = new Forecast(day);
      return newForecast;
*/