module.exports = {
  environment: process.env.NODE_ENV || "development",
  client_origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  port: process.env.PORT || 8000,
  weather: {
    base_url: process.env.OPEN_WEATHER_MAP_BASE_URL,
    api_key: process.env.OPEN_WEATHER_MAP_API_KEY,
  },
};
