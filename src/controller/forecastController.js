const axios = require("axios");
const settings = require("../settings");
const { checkIfNums } = require("./utilities");
const { postcodeValidator } = require("postcode-validator");

const getForecast = async (req, res, next) => {
  const { zipCode } = req.params;

  // Only supports US for now
  const isValidZipCode = await postcodeValidator(`${zipCode}`, "US");

  if (
    !zipCode ||
    zipCode.length !== 5 ||
    !checkIfNums(zipCode) ||
    !isValidZipCode
  )
    return res.status(400).send({ message: "Invalid zip code." });

  // Fetches 5-day forecast
  const fetchForecast = axios.get(
    `${settings.weather.forecast_url}zip=${zipCode}&appid=${settings.weather.api_key}&cnt=5`
  );

  // Fetches latitude and longitude from zip code
  const fetchGeocode = axios.get(
    `${settings.google.geocode_url}address=${zipCode}&key=${settings.google.api_key}`
  );

  let [geocode, forecast] = await Promise.all([fetchGeocode, fetchForecast]);

  // Fetches uv index for current day using geocode data
  const uvIndexResponse = await axios.get(
    `${settings.weather.uvIndex_url}lat=${geocode.data.results[0].geometry.location.lat}&lon=${geocode.data.results[0].geometry.location.lng}&appid=${settings.weather.api_key}`
  );

  // Forecast result array
  const fiveDayForecast = forecast.data.list.map(
    ({ dt, main: { temp, feels_like, humidity }, weather: { icon } }) => {
      return {
        date: dt,
        main: {
          temp: temp,
          feel: feels_like,
          humidity: humidity,
        },
        icon: icon,
      };
    }
  );

  res.status(200).send({
    forecast: fiveDayForecast,
    UV_INDEX: uvIndexResponse.data.current.uvi,
  });
};

module.exports = getForecast;
