import PubSub from "pubsub-js";

// Cache DOM Elements
function createDOMCache() {
  const $autocomplete = document.querySelector("[data-autocomplete]");
  return {
    $autocomplete,
  };
}

const cachedDOM = createDOMCache();

async function outputAutocomplete(eventMsg, suggestionsPromise) {
  const container = cachedDOM.$autocomplete;
  container.innerHTML = "";
  console.log("Run?");

  const suggestions = await suggestionsPromise;
  suggestions.forEach((suggestion) => {
    const div = document.createElement("div");
    div.textContent = suggestion;
    container.appendChild(div);
  });
}

const outputAutocompleteEvent = "outputAutocompleteEvent";
PubSub.subscribe(outputAutocompleteEvent, outputAutocomplete);
