const yargs = require('yargs');
const axois = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA2nwQaTerBstrMWCLrsis-YLANzngJsII&address=${encodedAddress}`;

  axois.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/bdc63de7cb64812090667cd8c67d0300/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    return axois.get(weatherUrl);
  }).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var summary = response.data.currently.summary;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.Today it's ${summary}.`);
  }).catch((e) => {
    if(e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API server.');
    } else {
      console.log(e.message);
    }
  });
