function createPubsubEventNames() {
  const outputAutocompleteEvent = "outputAutocompleteEvent";
  const filterForAutocomplete = "filterForAutocomplete";
  const getWeatherForLocation = "getWeatherForLocation";
  const emptyLocationQuery = "emptyLocationQuery";
  const removeHomePage = "removeHomePage";
  const outputWeather = "outputWeather";
  return {
    outputAutocompleteEvent,
    filterForAutocomplete,
    getWeatherForLocation,
    emptyLocationQuery,
    removeHomePage,
    outputWeather,
  };
}

// eslint-disable-next-line import/prefer-default-export
export const pubsubEventNames = createPubsubEventNames();

function createDOMCache() {
  const $location = document.getElementById("location");
  const $autocomplete = document.querySelector("[data-autocomplete]");
  const $secondLocation = document.querySelector("[data-secondLocation]");
  const $secondAutocomplete = document.querySelector(
    "[data-secondAutocomplete]"
  );
  return {
    $location,
    $autocomplete,
    $secondLocation,
    $secondAutocomplete,
  };
}

const cachedDOM = createDOMCache();

function disableAutocomplete() {
  if (!(document.activeElement === cachedDOM.location)) {
    cachedDOM.$autocomplete.style.pointerEvents = "none";
  }
}

cachedDOM.$location.addEventListener("blur", () => {
  setTimeout(disableAutocomplete, 500);
});

cachedDOM.$location.addEventListener("focus", () => {
  cachedDOM.$autocomplete.style.pointerEvents = "auto";
});
