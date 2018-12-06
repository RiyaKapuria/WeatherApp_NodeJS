const request = require('request');

const getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/bdc63de7cb64812090667cd8c67d0300/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to forecast.io servers.');
    } else if(response.statusCode === 400) {
      callback(`Unable to fetch weather.`);
    } else if(!error && response.statusCode === 200)  {
      callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  })  
}

module.exports.getWeather = getWeather;
