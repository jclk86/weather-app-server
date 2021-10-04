const app = require("../src/app");
const axios = require("axios");
const supertest = require("supertest");
const { badZip, goodZip } = require("../mocks/mockData");
const { expect } = require("chai");

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("Forecast endpoint", () => {
  context("Happy Path", () => {
    it("/api/forecast/:zipCode returns 200", () => {
      return supertest(app)
        .get(`/api/forecast/${goodZip}`)
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect((res) => {
          expect(res.body).to.have.property("data");
          expect(res.body).to.have.property("uv_index");
          expect(res.body.uv_index).to.be.a("number");
          expect(res.body.data).to.be.an("array");
          expect(res.body.data).to.have.lengthOf(40);
          expect(res.body.data[0]).to.have.property("date");
          expect(res.body.data[0]).to.have.property("description");
          expect(res.body.data[0]).to.have.property("icon");
          expect(res.body.data[0]).to.have.property("main");
          expect(res.body.data[0].main).to.have.property("feel");
          expect(res.body.data[0].main).to.have.property("humidity");
          expect(res.body.data[0].main).to.have.property("temp");
          expect(res.body.data[0].main).to.have.property("temp_max");
          expect(res.body.data[0].main).to.have.property("temp_min");
          expect(res.body.data[0].main).to.have.property("wind");
          expect(res.body.data[0].main.wind).to.have.property("deg");
          expect(res.body.data[0].main.wind).to.have.property("gust");
          expect(res.body.data[0].main.wind).to.have.property("speed");
        });
    });
  });

  context("Bad path", () => {
    it("/api/forecast/:zipCode returns error", () => {
      return supertest(app)
        .get(`/api/forecast/${badZip}`)
        .expect(400, { message: "Invalid zip code." })
        .expect("Content-Type", "application/json; charset=utf-8");
    });
  });
});

describe("OpenWeatherMap APIs", () => {
  context("5-day forecast API", () => {
    it("Happy path", async () => {
      const scope = nock(`${process.env.OPEN_WEATHER_MAP_FORECAST_BASE_URL}`)
        .get(`?zip=${goodZip}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`)
        .reply(200);

      await axios.get(
        `${process.env.OPEN_WEATHER_MAP_FORECAST_BASE_URL}zip=${goodZip}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
      );

      scope.done();
    });

    it("Empty response", async () => {
      const scope = nock(`${process.env.OPEN_WEATHER_MAP_FORECAST_BASE_URL}`)
        .get(`?zip=${badZip}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`)
        .reply(200);

      await axios.get(
        `${process.env.OPEN_WEATHER_MAP_FORECAST_BASE_URL}zip=${badZip}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
      );

      scope.done();
    });
  });

  context("UV Index API", () => {
    it("Happy path", async () => {
      const scope = nock(`${process.env.OPEN_WEATHER_MAP_UVINDEX_BASE_URL}`)
        .get(
          `?lat=18.402253&lon=-66.711397&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
        )
        .reply(200);

      await axios.get(
        `${process.env.OPEN_WEATHER_MAP_UVINDEX_BASE_URL}lat=18.402253&lon=-66.711397&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
      );

      scope.done();
    });
  });
});

describe("Google Geocode API", () => {
  context("Happy path", () => {
    it("Responds with 200", async () => {
      const scope = nock(`${process.env.GOOGLE_GEOCODE_BASE_URL}`)
        .get(`?address=${goodZip}&key=${process.env.GOOGLE_API_KEY}`)
        .reply(200);

      await axios(
        `${process.env.GOOGLE_GEOCODE_BASE_URL}address=${goodZip}&key=${process.env.GOOGLE_API_KEY}`
      );

      scope.done();
    });
  });
});
