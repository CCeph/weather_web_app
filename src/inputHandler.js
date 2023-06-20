// Cache DOM Elements
function createDOMCache() {
  const $locationForm = document.getElementById("locationForm");
  return {
    $locationForm,
  };
}

const cachedDOM = createDOMCache();
