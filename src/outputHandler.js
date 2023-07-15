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
  const $mainContainer = document.querySelector("[data-mainContainer]");
  const $backgroundContainer = document.querySelector("[data-background]");
  const $rightPanel = document.querySelector("[data-rightPanel]");
  const $secondSearchBar = document.querySelector("[data-secondLocation");
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
    $mainContainer,
    $backgroundContainer,
    $rightPanel,
    $secondSearchBar,
  };
}

const cachedDOM = createDOMCache();

function autoFillLocationInput() {
  const autocompleteContainer = this.parentElement;
  const searchBar = autocompleteContainer.previousElementSibling;
  searchBar.value = this.textContent;
  autocompleteContainer.textContent = "";
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
    const homeWrapper = cachedDOM.$locationFormWrapper;
    homeWrapper.classList.add("hidden");
  },
};

const mainPage = {
  show() {
    const mainContainer = cachedDOM.$mainContainer;
    mainContainer.classList.remove("hidden");
  },
};

function editDisplayedWeatherInfo(weatherData) {
  const weatherInfo = weatherData;

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

function removeCurrentWeatherTheme(themeElementsArray) {
  themeElementsArray.forEach((element) => {
    element.classList.remove("sunny-day");
    element.classList.remove("cloudy-night");
    element.classList.remove("night");
  });
}

function addWeatherTheme(themeElementsArray, themeClass) {
  themeElementsArray.forEach((element) => {
    element.classList.add(themeClass);
  });
}

function editWeatherBackgroundDisplay(weatherInfo) {
  const {
    $mainContainer,
    $backgroundContainer,
    $rightPanel,
    $secondSearchBar,
  } = cachedDOM;

  const weatherThemeElements = [
    $mainContainer,
    $backgroundContainer,
    $rightPanel,
    $secondSearchBar,
  ];

  removeCurrentWeatherTheme(weatherThemeElements);

  const isDay = weatherInfo.is_day;
  const weatherDescription = weatherInfo.currentCondition.text.toLowerCase();
  console.log(weatherDescription);

  switch (true) {
    case isDay === 1 &&
      (weatherDescription.includes("sunny") ||
        weatherDescription.includes("clear")):
      addWeatherTheme(weatherThemeElements, "sunny-day");
      break;

    case isDay === 1 &&
      (weatherDescription.includes("rainy") ||
        weatherDescription.includes("drizzle")):
      addWeatherTheme(weatherThemeElements, "rainy-day");
      break;
    case isDay === 0 &&
      (weatherDescription.includes("rain") ||
        weatherDescription.includes("drizzle")):
      addWeatherTheme(weatherThemeElements, "rainy-night");
      break;
    case isDay === 0:
      addWeatherTheme(weatherThemeElements, "cloudy-night");
      break;
    default:
      console.log("No matching theme found");
  }
}

async function outputWeather(eventMsg, infoPromise) {
  const weatherInfo = await infoPromise;

  editDisplayedWeatherInfo(weatherInfo);

  editWeatherBackgroundDisplay(weatherInfo);
}

function hideHomepage() {
  homePage.remove();
  mainPage.show();
}

PubSub.subscribe(pubsubEventNames.outputAutocompleteEvent, outputAutocomplete);

PubSub.subscribe(pubsubEventNames.emptyLocationQuery, hideAutocomplete);

PubSub.subscribe(pubsubEventNames.removeHomePage, hideHomepage);

PubSub.subscribe(pubsubEventNames.outputWeather, outputWeather);
