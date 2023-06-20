// Cache DOM Elements
function createDOMCache() {
  const $locationForm = document.getElementById("locationForm");
  return {
    $locationForm,
  };
}

const cachedDOM = createDOMCache();

cachedDOM.$locationForm.addEventListener("click", (e) => {
  e.preventDefault();
});
