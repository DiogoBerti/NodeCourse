const request = require('request');

const geoCodeAddress = (address) => {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var encodedAddress = encodeURIComponent(address);
        request({
          url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
          json: true
        }, (error, response, body) => {
          if (error) {
            //Usando o Argumento callback para retornar erros...
            reject('Unable to connect to Google servers.');
          } else if (body.status === 'ZERO_RESULTS') {
            reject('Unable to find that address.');
          } else if (body.status === 'OK') {
            //Usando o callback para retornar um objeto com os valores de endereço e lat e long.
            resolve({
              address: body.results[0].formatted_address,
              latitude: body.results[0].geometry.location.lat,
              longitude: body.results[0].geometry.location.lng
            });
          }
        });
      }, 3000);
  });
};


geoCodeAddress('06080-025').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});
