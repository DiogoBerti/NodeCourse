const request = require('request');
const yargs = require('yargs');

// Utilizado para ler argumentos via linha de comando...
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Addres to fetch weather for',
      string: true
    }
})
  .help()
  .alias('help', 'h')
  .argv;
console.log(argv.a)

address_to_find = encodeURIComponent(argv.a)


request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address_to_find,
  json: true
}, (error, response, body) => {
  // Transforma o body em um json
  // console.log(JSON.stringify(body.results[0].geometry.location, undefined, 2));
  // Usando ${} - Template string - para mostrar valores... não esquecer o ``
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);

});
