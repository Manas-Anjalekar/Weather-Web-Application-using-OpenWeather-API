const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let city = "";
let weatherData = "";
let temp = "";
let weatherDesciption = "";
let weatherIcon = "";
let imageURL = "";

app.get('/', function(req, res) {
  res.render('index', {city: city, weatherData: weatherData, temp: temp, weatherDesciption: weatherDesciption, weatherIcon: weatherIcon, imageURL: imageURL});
});

app.post('/', function(req, res) {
  city = req.body.cityName;
  const key =  '860e7a4f11051bf97dbd555bc8608d4b';
  let unit = req.body.metricValue;

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key + '&units=' + unit;

  https.get(url, function(response) {

    response.on('data', function(data) {
      weatherData = JSON.parse(data);
      temp = weatherData.main.temp;
      weatherDesciption = weatherData.weather[0].description;
      weatherIcon = weatherData.weather[0].icon;
      imageURL = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
      res.redirect('/');
    });
  });
})

app.listen(3000, function() {
  console.log('Server is running on port 3000.');
});
