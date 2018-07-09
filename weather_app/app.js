const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Avenida%20Alberto%20Santos%20Dumont%20Osasco',
  json: true
}, (error, response, body) => {
  // Transforma o body em um json
  // console.log(JSON.stringify(body.results[0].geometry.location, undefined, 2));
  // Usando ${} - Template string - para mostrar valores... não esquecer o ``
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);

});
