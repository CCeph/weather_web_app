// Cache DOM Elements
function createDOMCache() {
  const $locationForm = document.getElementById("locationForm");
  const $location = document.getElementById("location");
  return {
    $locationForm,
    $location,
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
    return console.log("Custom", error);
  }
}

async function filterForAddress(suggestionsPromise) {
  try {
    const suggestions = await suggestionsPromise;
    if (suggestions.error === "Unable to geocode") {
      throw new Error("Invalid city name");
    }
    const filteredSuggestions = [];
    suggestions.forEach((element) => {
      filteredSuggestions.push(element.display_address);
    });
    return filteredSuggestions;
  } catch (error) {
    return console.log("Custom", error);
  }
}

cachedDOM.$location.addEventListener("keydown", () => {
  console.log("Keyed");
});

console.log(filterForAddress(getCitySuggestions("Halifax")));
