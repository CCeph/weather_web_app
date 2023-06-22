import PubSub from "pubsub-js";

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

cachedDOM.$locationForm.addEventListener("click", (e) => {
  e.preventDefault();
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

async function filterForAddress(suggestionsPromise) {
  try {
    const suggestions = await suggestionsPromise;
    const filteredSuggestions = [];

    if (suggestions.error === "Unable to geocode") {
      throw new Error("Invalid city name");
    }

    suggestions.forEach((element) => {
      filteredSuggestions.push(element.display_address);
    });
    return filteredSuggestions;
  } catch (error) {
    return console.log("Custom", error);
  }
}

async function outputAutocomplete(suggestionsPromise) {
  const container = cachedDOM.$autocomplete;
  container.innerHTML = "";

  const suggestions = await suggestionsPromise;
  suggestions.forEach((suggestion) => {
    const div = document.createElement("div");
    div.textContent = suggestion;
    container.appendChild(div);
  });
}

const delayedAutocomplete = {
  showAutocomplete(query) {
    const citySuggestions = getCitySuggestions(query);
    const filteredSuggestions = filterForAddress(citySuggestions);
    outputAutocomplete(filteredSuggestions);
    console.log(filteredSuggestions);
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
