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

async function getLocationSuggestions(searchString) {
  const response = await fetch(
    `https://api.locationiq.com/v1/autocomplete?key=pk.9c87a186a6a34695dbff71ab9dd7f6bc&q=${searchString}&tag=place:city`,
    { mode: "cors" }
  );
  const suggestions = await response.json();
  console.log(suggestions);
  const filteredSuggestions = [];
  suggestions.forEach((element) => {
    filteredSuggestions.push(element.display_address);
  });
  console.log(filteredSuggestions);
}

cachedDOM.$location.addEventListener("keydown", () => {
  console.log("Keyed");
});

getLocationSuggestions("Egypt");
