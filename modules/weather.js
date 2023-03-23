'use strict';
const axios = require('axios');

async function getWeather(request, response, next) {
  try {
    // TODO: accept my queries -> /weeather?searchQuery=value
    // let keywordFromFrontEnd = request.query.searchQuery
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityInfo = request.query.searchQuery;

    // console.log(request.query);
    // TODO: find that city based on cityName - json
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BIT_API}&lat=${lat}&lon=${lon}&days=5`;

    // https://api.weatherbit.io/v2.0/forecast/daily?key=00137711fc9848cc9aa9ccb5c852e1f0&lat=47.6062&lon=-122.3321&days=5

    const weatherResults = await axios.get(url);



    let forecastWeather = weatherResults.data.data.map(day => {
      let newForecast = new Forecast(day);
      return newForecast;

    });



    // TODO: send data to class to be groomed
    response.status(200).send(forecastWeather);
  } catch (error) {
    next(error.message);
  }

}

class Forecast {
  // constructing a new object
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}





module.exports = getWeather;


