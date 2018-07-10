const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      //Usando o Argumento callback para retornar erros...
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      //Usando o callbackl para retornar um objeto com os valores de endereço e lat e long.
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};
var geocodeWeather = (addressObject, callback) => {
  url_to_check = `https://api.darksky.net/forecast/21ae3e2a6c4e38fdbcc1e6d13f58f358/${addressObject.latitude},${addressObject.longitude}`
  request({
    url: url_to_check,
    json: true
  }, (error, response, body) => {
    if(error){
      callback('Not Found');
    }else{
      // console.log(`Weather Now: ${body.currently.summary}`);
      callback(undefined, `Weather Now: ${body.currently.summary}`);
    }

  });
};

module.exports = {
  geocodeAddress,
  geocodeWeather
};
