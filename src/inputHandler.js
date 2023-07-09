import PubSub from "pubsub-js";
import { pubsubEventNames } from "./eventsHandler";

// Cache DOM Elements
function createDOMCache() {
  const $locationForm = document.getElementById("locationForm");
  const $location = document.getElementById("location");
  const $autocomplete = document.querySelector("[data-autocomplete]");
  const $secondLocationForm = document.querySelector(
    "[data-secondLocationForm]"
  );
  const $secondLocation = document.querySelector("[data-secondLocation]");
  const $secondAutocomplete = document.querySelector(
    "[data-secondAutocomplete]"
  );
  return {
    $locationForm,
    $location,
    $autocomplete,
    $secondLocationForm,
    $secondLocation,
    $secondAutocomplete,
  };
}

const cachedDOM = createDOMCache();

function listenToLocationForm(locationForm) {
  locationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const locationOfInterest = locationForm.value;

    if (locationOfInterest.length >= 3) {
      if (locationForm === cachedDOM.$locationForm) {
        PubSub.publish(pubsubEventNames.removeHomePage);
      }
      PubSub.publish(
        pubsubEventNames.getWeatherForLocation,
        locationOfInterest
      );
    }
  });
}

listenToLocationForm(cachedDOM.$locationForm);
listenToLocationForm(cachedDOM.$secondLocationForm);

function handleStatusErrors(response) {
  if (!response.ok) {
    throw Error(response.status);
  }
}

async function getCitySuggestions(searchString) {
  try {
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=pk.9c87a186a6a34695dbff71ab9dd7f6bc&q=${searchString}&tag=place:city`,
      { mode: "cors" }
    );
    handleStatusErrors(response);
    const suggestions = await response.json();
    return suggestions;
  } catch (error) {
    return console.log(error);
  }
}

const delayedAutocomplete = {
  showAutocomplete(query, autocompleteContainer) {
    const citySuggestions = getCitySuggestions(query);
    const suggestionsPackage = { citySuggestions, autocompleteContainer };

    PubSub.publish(pubsubEventNames.filterForAutocomplete, suggestionsPackage);
    this.timeoutID = undefined;
  },

  setup(query, autocompleteContainer) {
    if (typeof this.timeoutID === "number") {
      this.cancel();
    }

    this.timeoutID = setTimeout(() => {
      this.showAutocomplete(query, autocompleteContainer);
    }, 1000);
  },

  cancel() {
    clearTimeout(this.timeoutID);
  },
};

function enableAutocompleteOnElement(searchBar, autocompleteContainer) {
  searchBar.addEventListener("input", () => {
    const locationQuery = searchBar.value;
    const autocomplete = autocompleteContainer;
    autocomplete.innerHTML = "";
    if (locationQuery.length >= 3) {
      delayedAutocomplete.setup(locationQuery, autocomplete);
    } else {
      PubSub.publish(pubsubEventNames.emptyLocationQuery, autocomplete);
    }
  });
}

enableAutocompleteOnElement(cachedDOM.$location, cachedDOM.$autocomplete);
enableAutocompleteOnElement(
  cachedDOM.$secondLocation,
  cachedDOM.$secondAutocomplete
);
