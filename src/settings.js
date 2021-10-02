module.exports = {
  environment: process.env.NODE_ENV || "development",
  client_origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  port: process.env.PORT || 8000,
  weather: {
    forecast_url: process.env.OPEN_WEATHER_MAP_FORECAST_BASE_URL,
    uvIndex_url: process.env.OPEN_WEATHER_MAP_UVINDEX_BASE_URL,
    api_key: process.env.OPEN_WEATHER_MAP_API_KEY,
  },
  google: {
    geocode_url: process.env.GOOGLE_GEOCODE_BASE_URL,
    api_key: process.env.GOOGLE_API_KEY,
  },
};
