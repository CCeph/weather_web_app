import PubSub from "pubsub-js";
import { pubsubEventNames } from "./eventsHandler";

// Cache DOM Elements
function createDOMCache() {
  const $autocomplete = document.querySelector("[data-autocomplete]");
  const $location = document.getElementById("location");
  return {
    $autocomplete,
    $location,
  };
}

const cachedDOM = createDOMCache();

function autoFillLocationInput() {
  cachedDOM.$location.value = this.textContent;
  cachedDOM.$autocomplete.textContent = "";
}

async function outputAutocomplete(eventMsg, suggestionsPromise) {
  const container = cachedDOM.$autocomplete;
  container.textContent = "";
  container.classList.add("active");

  const suggestions = await suggestionsPromise;
  suggestions.forEach((suggestion) => {
    const div = document.createElement("div");
    div.textContent = suggestion;
    div.addEventListener("click", autoFillLocationInput);
    container.appendChild(div);
  });
}

function hideAutocomplete() {
  cachedDOM.$autocomplete.classList.remove("active");
}

PubSub.subscribe(pubsubEventNames.outputAutocompleteEvent, outputAutocomplete);

PubSub.subscribe(pubsubEventNames.emptyLocationQuery, hideAutocomplete);
