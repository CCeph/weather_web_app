import PubSub from "pubsub-js";
import { pubsubEventNames } from "./eventsHandler";

async function getDailyWeather(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=9d7451824d394c3aafd101313230506&q=${location}`,
    { mode: "cors" }
  );
  const data = await response.json();
  return data;
}

async function filterDailyWeatherData(data) {
  const unfilteredData = await data;
  const dayData = unfilteredData.forecast.forecastday[0].day;
  const currentData = unfilteredData.current;
  const filteredData = {
    maxtemp_c: dayData.maxtemp_c,
    maxtemp_f: dayData.maxtemp_f,
    mintemp_c: dayData.mintemp_c,
    mintemp_f: dayData.mintemp_f,
    feelslike_c: currentData.feelslike_c,
    feelslike_f: currentData.feelslike_f,
    currentCondition: currentData.condition,
    hourly: unfilteredData.forecast.forecastday[0].hour,
  };
  // console.log(unfilteredData);
  // console.log(filteredData);
  return filteredData;
}

filterDailyWeatherData(getDailyWeather("Paris"));
