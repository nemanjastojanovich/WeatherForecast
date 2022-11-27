const express = require("express");

const https = require('node:https');

const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
extended: true
}));

app.get("/", function(req, res) {

res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = "f5c14bff335b0248f3b05e1ff2cf3628";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+ unit +"";
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);

      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);

      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>Weather in " + query + " is " + weatherDescription + " .</p>");
      res.write("<h1>Temperature in " + query + " is " + temp + " degrees celzius.</h1>");
      res.write("<img src=" + imageURL + ">");

      res.send();

    });

  });



});




app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});
