const axios = require("axios");
const settings = require("../settings");
const { checkIfNums, findCoordinates } = require("./utilities");
const { postcodeValidator } = require("postcode-validator");

const getForecast = async (req, res, next) => {
  const { zipCode } = req.params;

  // Only supports US for now
  // TODO: find international support
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
    `${settings.weather.forecast_url}zip=${zipCode}&appid=${settings.weather.api_key}`
  );

  // Fetches latitude and longitude from zip code - use google api for beyond US
  const fetchGeocode = axios.get(
    `${settings.google.geocode_url}address=${zipCode}&key=${settings.google.api_key}`
  );

  let [geocode, forecast] = await Promise.all([fetchGeocode, fetchForecast]);

  // Using JSON asset
  // const coordinates = await findCoordinates(zipCode);
  // const uvIndexResponse = await axios.get(
  //   `${settings.weather.uvIndex_url}lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${settings.weather.api_key}`
  // );

  // Using google api coordinate results
  // Fetches uv index for current day using geocode data
  const uvIndexResponse = await axios.get(
    `${settings.weather.uvIndex_url}lat=${geocode.data.results[0].geometry.location.lat}&lon=${geocode.data.results[0].geometry.location.lng}&appid=${settings.weather.api_key}`
  );

  // Forecast result array
  const fiveDayForecast = forecast.data.list.map(
    ({
      dt_txt,
      main: { temp, temp_min, temp_max, feels_like, humidity },
      weather,
      wind,
    }) => {
      return {
        date: dt_txt,
        main: {
          temp: temp,
          temp_max: temp_max,
          temp_min: temp_min,
          feel: feels_like,
          humidity: humidity,
          wind: wind,
        },
        icon: weather[0].icon,
        description: weather[0].main,
      };
    }
  );

  res.status(200).send({
    data: fiveDayForecast,
    uv_index: uvIndexResponse.data.current.uvi,
  });
};

module.exports = getForecast;
