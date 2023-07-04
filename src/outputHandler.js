import PubSub from "pubsub-js";
import { pubsubEventNames } from "./eventsHandler";

// Cache DOM Elements
function createDOMCache() {
  const $autocomplete = document.querySelector("[data-autocomplete]");
  const $location = document.getElementById("location");
  const $locationFormWrapper = document.querySelector(".location-form-wrapper");
  const $currentTemp = document.querySelector("[data-currentTemp");
  const $feelsLikeTemp = document.querySelector("[data-feelsLike");
  const $maxTemp = document.querySelector("[data-maxTemp]");
  const $minTemp = document.querySelector("[data-minTemp]");
  const $queriedCity = document.querySelector("[data-city]");
  const $queriedCountry = document.querySelector("[data-country]");
  return {
    $autocomplete,
    $location,
    $locationFormWrapper,
    $currentTemp,
    $feelsLikeTemp,
    $maxTemp,
    $minTemp,
    $queriedCity,
    $queriedCountry,
  };
}

const cachedDOM = createDOMCache();

function autoFillLocationInput() {
  cachedDOM.$location.value = this.textContent;
  cachedDOM.$autocomplete.textContent = "";
}

async function outputAutocomplete(eventMsg, outputPackage) {
  const container = outputPackage.autocompleteContainer;
  container.textContent = "";
  container.classList.add("active");

  const suggestions = await outputPackage.filteredSuggestions;
  suggestions.forEach((suggestion) => {
    const div = document.createElement("div");
    div.textContent = suggestion;
    div.addEventListener("click", autoFillLocationInput);
    container.appendChild(div);
  });
}

function hideAutocomplete(msg, autocompleteElement) {
  autocompleteElement.classList.remove("active");
}

const homePage = {
  remove() {
    const wrapper = cachedDOM.$locationFormWrapper;
    wrapper.classList.add("hidden");
  },
};

async function outputWeather(eventMsg, infoPromise) {
  const weatherInfo = await infoPromise;

  const {
    $currentTemp,
    $feelsLikeTemp,
    $maxTemp,
    $minTemp,
    $queriedCity,
    $queriedCountry,
  } = cachedDOM;

  $currentTemp.textContent = weatherInfo.currentTemp;
  $feelsLikeTemp.textContent = weatherInfo.feelslike_c;
  $maxTemp.textContent = weatherInfo.maxtemp_c;
  $minTemp.textContent = weatherInfo.mintemp_c;
  $queriedCity.textContent = weatherInfo.city;
  $queriedCountry.textContent = weatherInfo.country;
}

PubSub.subscribe(pubsubEventNames.outputAutocompleteEvent, outputAutocomplete);

PubSub.subscribe(pubsubEventNames.emptyLocationQuery, hideAutocomplete);

PubSub.subscribe(pubsubEventNames.removeHomePage, homePage.remove);

PubSub.subscribe(pubsubEventNames.outputWeather, outputWeather);
