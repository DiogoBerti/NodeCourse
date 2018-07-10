const request = require('request');
const yargs = require('yargs');

// Faz o require da classe do arquivo geocode
const geocode = require('./geocode/geocode');

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

//chamando a função do Geocode
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      console.log(JSON.stringify(results, undefined, 2));
      geocode.geocodeWeather(results, (errorMessage2, results2) =>{
        if(errorMessage2){
          console.log(errorMessage2);
        }else{
          console.log(JSON.stringify(results2, undefined, 2));
        }
      });
    }
  });

// 21ae3e2a6c4e38fdbcc1e6d13f58f358
