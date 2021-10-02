const axios = require("axios");
const settings = require("../settings");

const getForecast = async (req, res, next) => {
  // use zip code with google maps api
  // extract long and lat from response data

  // https://maps.googleapis.com/maps/api/geocode/json?address=${10013}&key=${settings.google.api_key}\

  // axios.all forecase and geocode,

  // then do an individual uvIUndex axios get

  // fetches 5-day forecasr
  const fetchForecast = axios.get(
    `${settings.weather.forecast_url}zip=${10013}&appid=${
      settings.weather.api_key
    }&cnt=5`
  );

  // fetches latitude and longitude from zip code
  const fetchGeocode = axios.get(
    `${settings.google.geocode_url}address=${10013}&key=${
      settings.google.api_key
    }`
  );

  let [geocode, forecast] = await Promise.all([fetchGeocode, fetchForecast]);

  // fetches uv index for current day
  const uvIndexResponse = await axios.get(
    `${settings.weather.uvIndex_url}lat=${geocode.data.results[0].geometry.location.lat}&lon=${geocode.data.results[0].geometry.location.lng}&appid=${settings.weather.api_key}`
  );

  res.status(200).send({
    forecast: forecast.data.list.map((day) => {
      return {
        dt: day.dt,
        main: {
          temp: day.main.temp,
          feel: day.main.feels_like,
          humidity: day.main.humidity,
        },
        icon: day.weather.icon,
      };
    }),
    UV_INDEX: uvIndexResponse.data.current.uvi,
  });
};

module.exports = getForecast;
