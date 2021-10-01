const axios = require("axios");
const settings = require("../settings");

const getForecast = async (req, res) => {
  try {
    const fetch_response = await axios.get(
      `${settings.weather.base_url}forecast?zip${10013}&appid=${
        settings.weather.api_key
      }`
    );

    console.log(fetch_response)
  } catch (err) {
    console.log(err)
  }
};

module.exports = getForecast;
