const request = require('request');

var getWeather = (addressObject, callback) => {
  url_to_check = `https://api.darksky.net/forecast/21ae3e2a6c4e38fdbcc1e6d13f58f358/${addressObject.latitude},${addressObject.longitude}`
  request({
    url: url_to_check,
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200){
      callback(undefined, `Weather Now: ${body.currently.summary}`);
    }else{
      callback('Cannot Fetch the Weather');
    }
  });
};

module.exports = {
  getWeather
};
