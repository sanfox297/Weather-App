
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
    

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res) => {

        res.sendFile(__dirname + "/index.html");

});

app.post("/", (req,res) => {

    const query =req.body.cityName;
    const apiKey ="6ff29f49a156c3aa223a7213b56be3cc";
    const unit ="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;

    https.get(url,(response)=>{

                console.log(response.statusCode);

                response.on("data", (data)=> {

                    const weatherData = JSON.parse(data);
                    const temp = weatherData.main.temp;
                    const weatherDescription =weatherData.weather[0].description;
                    const icon =weatherData.weather[0].icon;
                    const imageURL ="https://openweathermap.org/img/wn/"+ icon +"@2x.png";

                    res.write("<p>The weather is currently "+weatherDescription +" </p>");
                    res.write("<h1>the temprature of "+ query +" is "+temp+" degrees celcius </h1>");
                    res.write("<img src="+ imageURL +">");

                    res.send();
                
                });
    });

   
});



app.listen(port,()=>{

    console.log("Server is Working On Port ");
});