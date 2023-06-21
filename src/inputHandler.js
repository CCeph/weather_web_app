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
    // Avoids calling the API if the input is empty to avoid error 400.
    if (searchString === "") {
      return "Empty search string";
    }

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

    // Handles the case of an empty input value.
    if (suggestions === "Empty search string") {
      return filteredSuggestions;
    }

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

cachedDOM.$location.addEventListener("input", () => {
  const citySuggestions = getCitySuggestions(cachedDOM.$location.value);
  const filteredSuggestions = filterForAddress(citySuggestions);
  console.log(filteredSuggestions);
});

// console.log(filterForAddress(getCitySuggestions("Halifax")));
