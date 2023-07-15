import PubSub from "pubsub-js";
import { pubsubEventNames } from "./eventsHandler";
import handleStatusErrors from "./commonUtils";

// Cache DOM Elements
function createDOMCache() {
  const $locationForm = document.getElementById("locationForm");
  return {
    $locationForm,
  };
}

const cachedDOM = createDOMCache();

async function getDailyWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9d7451824d394c3aafd101313230506&q=${location}`,
      { mode: "cors" }
    );
    handleStatusErrors(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function filterDailyWeatherData(data) {
  try {
    const unfilteredData = await data;
    const dayData = unfilteredData.forecast.forecastday[0].day;
    const currentData = unfilteredData.current;
    const locationData = unfilteredData.location;
    const filteredData = {
      currentTemp: currentData.temp_c,
      maxtemp_c: dayData.maxtemp_c,
      maxtemp_f: dayData.maxtemp_f,
      mintemp_c: dayData.mintemp_c,
      mintemp_f: dayData.mintemp_f,
      feelslike_c: currentData.feelslike_c,
      feelslike_f: currentData.feelslike_f,
      currentCondition: currentData.condition,
      hourly: unfilteredData.forecast.forecastday[0].hour,
      city: locationData.name,
      country: locationData.country,
      is_day: currentData.is_day,
    };
    return filteredData;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function showDailyWeatherForLocation(eventMsg, locationPackage) {
  try {
    const [locationOfInterest, formOfInterest] = locationPackage;
    const unfilteredWeatherData = await getDailyWeather(locationOfInterest);
    if (unfilteredWeatherData.message) {
      throw Error("Cancelling Weather Search");
    }
    const filteredWeatherData = await filterDailyWeatherData(
      unfilteredWeatherData
    );
    PubSub.publish(pubsubEventNames.outputWeather, filteredWeatherData);
    if (formOfInterest === cachedDOM.$locationForm) {
      PubSub.publish(pubsubEventNames.removeHomePage);
    }
  } catch (error) {
    console.log(error);
  }
}

async function filterForAddress(suggestionsPromise) {
  try {
    const suggestions = await suggestionsPromise;
    const filteredSuggestions = [];

    if (suggestions.error === "Unable to geocode") {
      throw new Error("Invalid city name");
    }

    suggestions.forEach((element) => {
      const { name, state, country } = element.address;
      let filteredAddress;
      if (state === undefined) {
        filteredAddress = [name, country].join(", ");
      } else {
        filteredAddress = [name, state, country].join(", ");
      }
      filteredSuggestions.push(filteredAddress);
    });
    return filteredSuggestions;
  } catch (error) {
    return console.log("Custom", error);
  }
}

function filterForAutocomplete(eventMsg, suggestionsPackage) {
  const { autocompleteContainer } = suggestionsPackage;
  const filteredSuggestions = filterForAddress(
    suggestionsPackage.citySuggestions
  );
  const outputPackage = { filteredSuggestions, autocompleteContainer };

  PubSub.publish(pubsubEventNames.outputAutocompleteEvent, outputPackage);
}

PubSub.subscribe(pubsubEventNames.filterForAutocomplete, filterForAutocomplete);
PubSub.subscribe(
  pubsubEventNames.getWeatherForLocation,
  showDailyWeatherForLocation
);
