const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

// Usando Axios para fazer uma requisição http (get)
axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        // Lançando uma excessão que será tratada pelo catch..
        throw new Error('Unable to Find the address');
    }
    const latitude = response.data.results[0].geometry.location.lat;
    const longitude = response.data.results[0].geometry.location.lng;
    const weatherURL = `https://api.darksky.net/forecast/21ae3e2a6c4e38fdbcc1e6d13f58f358/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
    })
// Esse then refere ao return acima...
.then((response) =>{
        const temperature = response.data.currently.temperature;
        const apparent_temperature = response.data.currently.apparentTemperature;
        console.log(`Temperature: ${temperature}. It feels like: ${apparent_temperature}`);

// o Axios funciona com o promises, então podemos usar o then e o catch
}).catch((error) =>{
    if(error.code === 'ENOTFOUND'){
        console.log('Unable to connect...');
    }else{
        console.log(error.message);    
    }
});
