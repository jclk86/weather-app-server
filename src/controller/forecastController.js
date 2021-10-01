import axios from 'axios';

const getForecast = async (req, res) => {
  try {
    const fetch_response = await axios.get(`${process.env.OPEN_WEATHER}`);
  } catch (err) {

  }
};

module.export = getForecast;