import PubSub from "pubsub-js";
import { pubsubEventNames } from "./eventsHandler";
import sunnyDay from "./resources/sunnyDay.jpg";

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

function editWeatherBackgroundDisplay(weatherInfo) {
  const {
    $mainContainer,
    $backgroundContainer,
    $rightPanel,
    $secondSearchBar,
  } = cachedDOM;

  const isDay = weatherInfo.is_day;
  const weatherDescription = weatherInfo.currentCondition.text.toLowerCase();
  console.log(weatherInfo);

  switch (true) {
    case isDay === 1 && weatherDescription.includes("sunny"):
      $mainContainer.style.backgroundImage = `url(${sunnyDay})`;
      $rightPanel.style.backgroundColor = "rgb(15 71 99 / 59%)";
      $secondSearchBar.style.borderBottom = "1px solid #F1F1F1";
      break;

    case isDay === 0:
      break;
    default:
      console.log("No");
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
