const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

// index route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my server!",
  });
});

app.get("/api/hello", async (req, res) => {
  const visitorName = req.query.visitor_name || "Guest";
  const clientIp = req.ip || req.socket.remoteAddress;

  try {
    console.log(clientIp);
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${clientIp}&aqi=no`
    );
    const temperature = response.current.temp_c;
    const location = response.location.name || "Unknown Location";

    res.status(200).json({
      client_ip: clientIp,
      location: location,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celcius in ${location}`,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Something went wrong!",
    });
  }
});

// notFound route
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Resource not found!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});