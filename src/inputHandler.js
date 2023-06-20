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
    `https://api.locationiq.com/v1/autocomplete?key=pk.9c87a186a6a34695dbff71ab9dd7f6bc&q=${searchString}`,
    { mode: "cors" }
  );
  const suggestions = await response.json();
  console.log(suggestions);
}

cachedDOM.$location.addEventListener("keydown", () => {
  console.log("Keyed");
});

getLocationSuggestions("Egypt");
