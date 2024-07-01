import express, { json, urlencoded } from "express";
import fetch from "node-fetch";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
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
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${clientIp}&aqi=no`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const temperature = data.current.temp_c;
    const location = data.location.name || "Unknown Location";

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

// errorHandler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
