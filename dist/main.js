/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dataHandler.js":
/*!****************************!*\
  !*** ./src/dataHandler.js ***!
  \****************************/
/***/ (() => {

eval("async function getDailyWeather(location) {\n  const response = await fetch(\n    `http://api.weatherapi.com/v1/forecast.json?key=9d7451824d394c3aafd101313230506&q=${location}`,\n    { mode: \"cors\" }\n  );\n  const data = await response.json();\n  return data;\n}\n\nasync function filterDailyWeatherData(data) {\n  const unfilteredData = await data;\n  const dayData = unfilteredData.forecast.forecastday[0].day;\n  const currentData = unfilteredData.current;\n  const filteredData = {\n    maxtemp_c: dayData.maxtemp_c,\n    maxtemp_f: dayData.maxtemp_f,\n    mintemp_c: dayData.mintemp_c,\n    mintemp_f: dayData.mintemp_f,\n    feelslike_c: currentData.feelslike_c,\n    feelslike_f: currentData.feelslike_f,\n    currentCondition: currentData.condition,\n    hourly: unfilteredData.forecast.forecastday[0].hour,\n  };\n  // console.log(unfilteredData);\n  // console.log(filteredData);\n  return filteredData;\n}\n\nfilterDailyWeatherData(getDailyWeather(\"Paris\"));\n\n\n//# sourceURL=webpack://webpack_eslint_prettier_template/./src/dataHandler.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dataHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataHandler */ \"./src/dataHandler.js\");\n/* harmony import */ var _dataHandler__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dataHandler__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _inputHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputHandler */ \"./src/inputHandler.js\");\n/* harmony import */ var _inputHandler__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_inputHandler__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n//# sourceURL=webpack://webpack_eslint_prettier_template/./src/index.js?");

/***/ }),

/***/ "./src/inputHandler.js":
/*!*****************************!*\
  !*** ./src/inputHandler.js ***!
  \*****************************/
/***/ (() => {

eval("// Cache DOM Elements\nfunction createDOMCache() {\n  const $locationForm = document.getElementById(\"locationForm\");\n  const $location = document.getElementById(\"location\");\n  const $autocomplete = document.querySelector(\"[data-autocomplete]\");\n  return {\n    $locationForm,\n    $location,\n    $autocomplete,\n  };\n}\n\nconst cachedDOM = createDOMCache();\n\ncachedDOM.$locationForm.addEventListener(\"click\", (e) => {\n  e.preventDefault();\n});\n\nasync function getCitySuggestions(searchString) {\n  try {\n    const response = await fetch(\n      `https://api.locationiq.com/v1/autocomplete?key=pk.9c87a186a6a34695dbff71ab9dd7f6bc&q=${searchString}&tag=place:city`,\n      { mode: \"cors\" }\n    );\n    const suggestions = await response.json();\n    return suggestions;\n  } catch (error) {\n    return console.log(error);\n  }\n}\n\nasync function filterForAddress(suggestionsPromise) {\n  try {\n    const suggestions = await suggestionsPromise;\n    const filteredSuggestions = [];\n\n    if (suggestions.error === \"Unable to geocode\") {\n      throw new Error(\"Invalid city name\");\n    }\n\n    suggestions.forEach((element) => {\n      filteredSuggestions.push(element.display_address);\n    });\n    return filteredSuggestions;\n  } catch (error) {\n    return console.log(\"Custom\", error);\n  }\n}\n\nasync function outputAutocomplete(suggestionsPromise) {\n  const container = cachedDOM.$autocomplete;\n  container.innerHTML = \"\";\n\n  const suggestions = await suggestionsPromise;\n  suggestions.forEach((suggestion) => {\n    const div = document.createElement(\"div\");\n    div.textContent = suggestion;\n    container.appendChild(div);\n  });\n}\n\ncachedDOM.$location.addEventListener(\"input\", () => {\n  const locationQuery = cachedDOM.$location.value;\n  const autocomplete = cachedDOM.$autocomplete;\n  autocomplete.innerHTML = \"\";\n  if (locationQuery.length >= 3) {\n    const citySuggestions = getCitySuggestions(locationQuery);\n    const filteredSuggestions = filterForAddress(citySuggestions);\n    outputAutocomplete(filteredSuggestions);\n    console.log(filteredSuggestions);\n  }\n});\n\n\n//# sourceURL=webpack://webpack_eslint_prettier_template/./src/inputHandler.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;