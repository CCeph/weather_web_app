import PubSub from "pubsub-js";
import { pubsubEventNames } from "./eventsHandler";

// Cache DOM Elements
function createDOMCache() {
  const $locationForm = document.getElementById("locationForm");
  const $location = document.getElementById("location");
  const $autocomplete = document.querySelector("[data-autocomplete]");
  return {
    $locationForm,
    $location,
    $autocomplete,
  };
}

const cachedDOM = createDOMCache();

cachedDOM.$locationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const locationOfInterest = cachedDOM.$location.value;
  PubSub.publish(pubsubEventNames.getWeatherForLocation, locationOfInterest);
});

async function getCitySuggestions(searchString) {
  try {
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=pk.9c87a186a6a34695dbff71ab9dd7f6bc&q=${searchString}&tag=place:city`,
      { mode: "cors" }
    );
    const suggestions = await response.json();
    return suggestions;
  } catch (error) {
    return console.log(error);
  }
}

const delayedAutocomplete = {
  showAutocomplete(query) {
    const citySuggestions = getCitySuggestions(query);

    PubSub.publish(pubsubEventNames.filterForAutocomplete, citySuggestions);
    this.timeoutID = undefined;
  },

  setup(query) {
    if (typeof this.timeoutID === "number") {
      this.cancel();
    }

    this.timeoutID = setTimeout(() => {
      this.showAutocomplete(query);
    }, 1000);
  },

  cancel() {
    clearTimeout(this.timeoutID);
  },
};

cachedDOM.$location.addEventListener("input", () => {
  const locationQuery = cachedDOM.$location.value;
  const autocomplete = cachedDOM.$autocomplete;
  autocomplete.innerHTML = "";
  if (locationQuery.length >= 3) {
    delayedAutocomplete.setup(locationQuery);
  }
});
