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

/***/ "./node_modules/pubsub-js/src/pubsub.js":
/*!**********************************************!*\
  !*** ./node_modules/pubsub-js/src/pubsub.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n/**\n * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk\n * License: MIT - http://mrgnrdrck.mit-license.org\n *\n * https://github.com/mroderick/PubSubJS\n */\n\n(function (root, factory){\n    'use strict';\n\n    var PubSub = {};\n\n    if (root.PubSub) {\n        PubSub = root.PubSub;\n        console.warn(\"PubSub already loaded, using existing version\");\n    } else {\n        root.PubSub = PubSub;\n        factory(PubSub);\n    }\n    // CommonJS and Node.js module support\n    if (true){\n        if (module !== undefined && module.exports) {\n            exports = module.exports = PubSub; // Node.js specific `module.exports`\n        }\n        exports.PubSub = PubSub; // CommonJS module 1.1.1 spec\n        module.exports = exports = PubSub; // CommonJS\n    }\n    // AMD support\n    /* eslint-disable no-undef */\n    else {}\n\n}(( typeof window === 'object' && window ) || this, function (PubSub){\n    'use strict';\n\n    var messages = {},\n        lastUid = -1,\n        ALL_SUBSCRIBING_MSG = '*';\n\n    function hasKeys(obj){\n        var key;\n\n        for (key in obj){\n            if ( Object.prototype.hasOwnProperty.call(obj, key) ){\n                return true;\n            }\n        }\n        return false;\n    }\n\n    /**\n     * Returns a function that throws the passed exception, for use as argument for setTimeout\n     * @alias throwException\n     * @function\n     * @param { Object } ex An Error object\n     */\n    function throwException( ex ){\n        return function reThrowException(){\n            throw ex;\n        };\n    }\n\n    function callSubscriberWithDelayedExceptions( subscriber, message, data ){\n        try {\n            subscriber( message, data );\n        } catch( ex ){\n            setTimeout( throwException( ex ), 0);\n        }\n    }\n\n    function callSubscriberWithImmediateExceptions( subscriber, message, data ){\n        subscriber( message, data );\n    }\n\n    function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){\n        var subscribers = messages[matchedMessage],\n            callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,\n            s;\n\n        if ( !Object.prototype.hasOwnProperty.call( messages, matchedMessage ) ) {\n            return;\n        }\n\n        for (s in subscribers){\n            if ( Object.prototype.hasOwnProperty.call(subscribers, s)){\n                callSubscriber( subscribers[s], originalMessage, data );\n            }\n        }\n    }\n\n    function createDeliveryFunction( message, data, immediateExceptions ){\n        return function deliverNamespaced(){\n            var topic = String( message ),\n                position = topic.lastIndexOf( '.' );\n\n            // deliver the message as it is now\n            deliverMessage(message, message, data, immediateExceptions);\n\n            // trim the hierarchy and deliver message to each level\n            while( position !== -1 ){\n                topic = topic.substr( 0, position );\n                position = topic.lastIndexOf('.');\n                deliverMessage( message, topic, data, immediateExceptions );\n            }\n\n            deliverMessage(message, ALL_SUBSCRIBING_MSG, data, immediateExceptions);\n        };\n    }\n\n    function hasDirectSubscribersFor( message ) {\n        var topic = String( message ),\n            found = Boolean(Object.prototype.hasOwnProperty.call( messages, topic ) && hasKeys(messages[topic]));\n\n        return found;\n    }\n\n    function messageHasSubscribers( message ){\n        var topic = String( message ),\n            found = hasDirectSubscribersFor(topic) || hasDirectSubscribersFor(ALL_SUBSCRIBING_MSG),\n            position = topic.lastIndexOf( '.' );\n\n        while ( !found && position !== -1 ){\n            topic = topic.substr( 0, position );\n            position = topic.lastIndexOf( '.' );\n            found = hasDirectSubscribersFor(topic);\n        }\n\n        return found;\n    }\n\n    function publish( message, data, sync, immediateExceptions ){\n        message = (typeof message === 'symbol') ? message.toString() : message;\n\n        var deliver = createDeliveryFunction( message, data, immediateExceptions ),\n            hasSubscribers = messageHasSubscribers( message );\n\n        if ( !hasSubscribers ){\n            return false;\n        }\n\n        if ( sync === true ){\n            deliver();\n        } else {\n            setTimeout( deliver, 0 );\n        }\n        return true;\n    }\n\n    /**\n     * Publishes the message, passing the data to it's subscribers\n     * @function\n     * @alias publish\n     * @param { String } message The message to publish\n     * @param {} data The data to pass to subscribers\n     * @return { Boolean }\n     */\n    PubSub.publish = function( message, data ){\n        return publish( message, data, false, PubSub.immediateExceptions );\n    };\n\n    /**\n     * Publishes the message synchronously, passing the data to it's subscribers\n     * @function\n     * @alias publishSync\n     * @param { String } message The message to publish\n     * @param {} data The data to pass to subscribers\n     * @return { Boolean }\n     */\n    PubSub.publishSync = function( message, data ){\n        return publish( message, data, true, PubSub.immediateExceptions );\n    };\n\n    /**\n     * Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe\n     * @function\n     * @alias subscribe\n     * @param { String } message The message to subscribe to\n     * @param { Function } func The function to call when a new message is published\n     * @return { String }\n     */\n    PubSub.subscribe = function( message, func ){\n        if ( typeof func !== 'function'){\n            return false;\n        }\n\n        message = (typeof message === 'symbol') ? message.toString() : message;\n\n        // message is not registered yet\n        if ( !Object.prototype.hasOwnProperty.call( messages, message ) ){\n            messages[message] = {};\n        }\n\n        // forcing token as String, to allow for future expansions without breaking usage\n        // and allow for easy use as key names for the 'messages' object\n        var token = 'uid_' + String(++lastUid);\n        messages[message][token] = func;\n\n        // return token for unsubscribing\n        return token;\n    };\n\n    PubSub.subscribeAll = function( func ){\n        return PubSub.subscribe(ALL_SUBSCRIBING_MSG, func);\n    };\n\n    /**\n     * Subscribes the passed function to the passed message once\n     * @function\n     * @alias subscribeOnce\n     * @param { String } message The message to subscribe to\n     * @param { Function } func The function to call when a new message is published\n     * @return { PubSub }\n     */\n    PubSub.subscribeOnce = function( message, func ){\n        var token = PubSub.subscribe( message, function(){\n            // before func apply, unsubscribe message\n            PubSub.unsubscribe( token );\n            func.apply( this, arguments );\n        });\n        return PubSub;\n    };\n\n    /**\n     * Clears all subscriptions\n     * @function\n     * @public\n     * @alias clearAllSubscriptions\n     */\n    PubSub.clearAllSubscriptions = function clearAllSubscriptions(){\n        messages = {};\n    };\n\n    /**\n     * Clear subscriptions by the topic\n     * @function\n     * @public\n     * @alias clearAllSubscriptions\n     * @return { int }\n     */\n    PubSub.clearSubscriptions = function clearSubscriptions(topic){\n        var m;\n        for (m in messages){\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){\n                delete messages[m];\n            }\n        }\n    };\n\n    /**\n       Count subscriptions by the topic\n     * @function\n     * @public\n     * @alias countSubscriptions\n     * @return { Array }\n    */\n    PubSub.countSubscriptions = function countSubscriptions(topic){\n        var m;\n        // eslint-disable-next-line no-unused-vars\n        var token;\n        var count = 0;\n        for (m in messages) {\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {\n                for (token in messages[m]) {\n                    count++;\n                }\n                break;\n            }\n        }\n        return count;\n    };\n\n\n    /**\n       Gets subscriptions by the topic\n     * @function\n     * @public\n     * @alias getSubscriptions\n    */\n    PubSub.getSubscriptions = function getSubscriptions(topic){\n        var m;\n        var list = [];\n        for (m in messages){\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){\n                list.push(m);\n            }\n        }\n        return list;\n    };\n\n    /**\n     * Removes subscriptions\n     *\n     * - When passed a token, removes a specific subscription.\n     *\n\t * - When passed a function, removes all subscriptions for that function\n     *\n\t * - When passed a topic, removes all subscriptions for that topic (hierarchy)\n     * @function\n     * @public\n     * @alias subscribeOnce\n     * @param { String | Function } value A token, function or topic to unsubscribe from\n     * @example // Unsubscribing with a token\n     * var token = PubSub.subscribe('mytopic', myFunc);\n     * PubSub.unsubscribe(token);\n     * @example // Unsubscribing with a function\n     * PubSub.unsubscribe(myFunc);\n     * @example // Unsubscribing from a topic\n     * PubSub.unsubscribe('mytopic');\n     */\n    PubSub.unsubscribe = function(value){\n        var descendantTopicExists = function(topic) {\n                var m;\n                for ( m in messages ){\n                    if ( Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0 ){\n                        // a descendant of the topic exists:\n                        return true;\n                    }\n                }\n\n                return false;\n            },\n            isTopic    = typeof value === 'string' && ( Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value) ),\n            isToken    = !isTopic && typeof value === 'string',\n            isFunction = typeof value === 'function',\n            result = false,\n            m, message, t;\n\n        if (isTopic){\n            PubSub.clearSubscriptions(value);\n            return;\n        }\n\n        for ( m in messages ){\n            if ( Object.prototype.hasOwnProperty.call( messages, m ) ){\n                message = messages[m];\n\n                if ( isToken && message[value] ){\n                    delete message[value];\n                    result = value;\n                    // tokens are unique, so we can just stop here\n                    break;\n                }\n\n                if (isFunction) {\n                    for ( t in message ){\n                        if (Object.prototype.hasOwnProperty.call(message, t) && message[t] === value){\n                            delete message[t];\n                            result = true;\n                        }\n                    }\n                }\n            }\n        }\n\n        return result;\n    };\n}));\n\n\n//# sourceURL=webpack://webpack_eslint_prettier_template/./node_modules/pubsub-js/src/pubsub.js?");

/***/ }),

/***/ "./src/dataHandler.js":
/*!****************************!*\
  !*** ./src/dataHandler.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _eventsHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventsHandler */ \"./src/eventsHandler.js\");\n\n\n\nasync function getDailyWeather(location) {\n  const response = await fetch(\n    `http://api.weatherapi.com/v1/forecast.json?key=9d7451824d394c3aafd101313230506&q=${location}`,\n    { mode: \"cors\" }\n  );\n  const data = await response.json();\n  return data;\n}\n\nasync function filterDailyWeatherData(data) {\n  const unfilteredData = await data;\n  const dayData = unfilteredData.forecast.forecastday[0].day;\n  const currentData = unfilteredData.current;\n  const filteredData = {\n    maxtemp_c: dayData.maxtemp_c,\n    maxtemp_f: dayData.maxtemp_f,\n    mintemp_c: dayData.mintemp_c,\n    mintemp_f: dayData.mintemp_f,\n    feelslike_c: currentData.feelslike_c,\n    feelslike_f: currentData.feelslike_f,\n    currentCondition: currentData.condition,\n    hourly: unfilteredData.forecast.forecastday[0].hour,\n  };\n  // console.log(unfilteredData);\n  // console.log(filteredData);\n  return filteredData;\n}\n\nfunction showDailyWeatherForLocation(eventMsg, locationOfInterest) {\n  const unfilteredWeatherData = getDailyWeather(locationOfInterest);\n  const filteredWeatherData = filterDailyWeatherData(unfilteredWeatherData);\n  console.log(filteredWeatherData);\n}\n\nfilterDailyWeatherData(getDailyWeather(\"Dubai, Dubai, United Arab Emirates\"));\n\nasync function filterForAddress(suggestionsPromise) {\n  try {\n    const suggestions = await suggestionsPromise;\n    const filteredSuggestions = [];\n\n    if (suggestions.error === \"Unable to geocode\") {\n      throw new Error(\"Invalid city name\");\n    }\n\n    suggestions.forEach((element) => {\n      const { name, state, country } = element.address;\n      let filteredAddress;\n      if (state === undefined) {\n        filteredAddress = [name, country].join(\", \");\n      } else {\n        filteredAddress = [name, state, country].join(\", \");\n      }\n      filteredSuggestions.push(filteredAddress);\n    });\n    return filteredSuggestions;\n  } catch (error) {\n    return console.log(\"Custom\", error);\n  }\n}\n\nfunction filterForAutocomplete(eventMsg, citySuggestions) {\n  const filteredSuggestions = filterForAddress(citySuggestions);\n\n  pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(_eventsHandler__WEBPACK_IMPORTED_MODULE_1__.pubsubEventNames.outputAutocompleteEvent, filteredSuggestions);\n}\n\npubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(_eventsHandler__WEBPACK_IMPORTED_MODULE_1__.pubsubEventNames.filterForAutocomplete, filterForAutocomplete);\npubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(\n  _eventsHandler__WEBPACK_IMPORTED_MODULE_1__.pubsubEventNames.getWeatherForLocation,\n  showDailyWeatherForLocation\n);\n\n\n//# sourceURL=webpack://webpack_eslint_prettier_template/./src/dataHandler.js?");

/***/ }),

/***/ "./src/eventsHandler.js":
/*!******************************!*\
  !*** ./src/eventsHandler.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pubsubEventNames: () => (/* binding */ pubsubEventNames)\n/* harmony export */ });\nfunction createPubsubEventNames() {\n  const outputAutocompleteEvent = \"outputAutocompleteEvent\";\n  const filterForAutocomplete = \"filterForAutocomplete\";\n  const getWeatherForLocation = \"getWeatherForLocation\";\n  const emptyLocationQuery = \"emptyLocationQuery\";\n  const removeHomePage = \"removeHomePage\";\n  return {\n    outputAutocompleteEvent,\n    filterForAutocomplete,\n    getWeatherForLocation,\n    emptyLocationQuery,\n    removeHomePage,\n  };\n}\n\n// eslint-disable-next-line import/prefer-default-export\nconst pubsubEventNames = createPubsubEventNames();\n\n\n//# sourceURL=webpack://webpack_eslint_prettier_template/./src/eventsHandler.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dataHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataHandler */ \"./src/dataHandler.js\");\n/* harmony import */ var _inputHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputHandler */ \"./src/inputHandler.js\");\n/* harmony import */ var _outputHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./outputHandler */ \"./src/outputHandler.js\");\n\n\n\n\n\n//# sourceURL=webpack://webpack_eslint_prettier_template/./src/index.js?");

/***/ }),

/***/ "./src/inputHandler.js":
/*!*****************************!*\
  !*** ./src/inputHandler.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _eventsHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventsHandler */ \"./src/eventsHandler.js\");\n\n\n\n// Cache DOM Elements\nfunction createDOMCache() {\n  const $locationForm = document.getElementById(\"locationForm\");\n  const $location = document.getElementById(\"location\");\n  const $autocomplete = document.querySelector(\"[data-autocomplete]\");\n  return {\n    $locationForm,\n    $location,\n    $autocomplete,\n  };\n}\n\nconst cachedDOM = createDOMCache();\n\ncachedDOM.$locationForm.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n\n  pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(_eventsHandler__WEBPACK_IMPORTED_MODULE_1__.pubsubEventNames.removeHomePage);\n  const locationOfInterest = cachedDOM.$location.value;\n  pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(_eventsHandler__WEBPACK_IMPORTED_MODULE_1__.pubsubEventNames.getWeatherForLocation, locationOfInterest);\n});\n\nasync function getCitySuggestions(searchString) {\n  try {\n    const response = await fetch(\n      `https://api.locationiq.com/v1/autocomplete?key=pk.9c87a186a6a34695dbff71ab9dd7f6bc&q=${searchString}&tag=place:city`,\n      { mode: \"cors\" }\n    );\n    const suggestions = await response.json();\n    return suggestions;\n  } catch (error) {\n    return console.log(error);\n  }\n}\n\nconst delayedAutocomplete = {\n  showAutocomplete(query) {\n    const citySuggestions = getCitySuggestions(query);\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(_eventsHandler__WEBPACK_IMPORTED_MODULE_1__.pubsubEventNames.filterForAutocomplete, citySuggestions);\n    this.timeoutID = undefined;\n  },\n\n  setup(query) {\n    if (typeof this.timeoutID === \"number\") {\n      this.cancel();\n    }\n\n    this.timeoutID = setTimeout(() => {\n      this.showAutocomplete(query);\n    }, 1000);\n  },\n\n  cancel() {\n    clearTimeout(this.timeoutID);\n  },\n};\n\ncachedDOM.$location.addEventListener(\"input\", () => {\n  const locationQuery = cachedDOM.$location.value;\n  const autocomplete = cachedDOM.$autocomplete;\n  autocomplete.innerHTML = \"\";\n  if (locationQuery.length >= 3) {\n    delayedAutocomplete.setup(locationQuery);\n  } else {\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(_eventsHandler__WEBPACK_IMPORTED_MODULE_1__.pubsubEventNames.emptyLocationQuery);\n  }\n});\n\n\n//# sourceURL=webpack://webpack_eslint_prettier_template/./src/inputHandler.js?");

/***/ }),

/***/ "./src/outputHandler.js":
/*!******************************!*\
  !*** ./src/outputHandler.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _eventsHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventsHandler */ \"./src/eventsHandler.js\");\n\n\n\n// Cache DOM Elements\nfunction createDOMCache() {\n  const $autocomplete = document.querySelector(\"[data-autocomplete]\");\n  const $location = document.getElementById(\"location\");\n  const $locationFormWrapper = document.querySelector(\".location-form-wrapper\");\n  return {\n    $autocomplete,\n    $location,\n    $locationFormWrapper,\n  };\n}\n\nconst cachedDOM = createDOMCache();\n\nfunction autoFillLocationInput() {\n  cachedDOM.$location.value = this.textContent;\n  cachedDOM.$autocomplete.textContent = \"\";\n}\n\nasync function outputAutocomplete(eventMsg, suggestionsPromise) {\n  const container = cachedDOM.$autocomplete;\n  container.textContent = \"\";\n  container.classList.add(\"active\");\n\n  const suggestions = await suggestionsPromise;\n  suggestions.forEach((suggestion) => {\n    const div = document.createElement(\"div\");\n    div.textContent = suggestion;\n    div.addEventListener(\"click\", autoFillLocationInput);\n    container.appendChild(div);\n  });\n}\n\nfunction hideAutocomplete() {\n  cachedDOM.$autocomplete.classList.remove(\"active\");\n}\n\nconst homePage = {\n  remove() {\n    const wrapper = cachedDOM.$locationFormWrapper;\n    wrapper.classList.add(\"hidden\");\n  },\n};\n\npubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(_eventsHandler__WEBPACK_IMPORTED_MODULE_1__.pubsubEventNames.outputAutocompleteEvent, outputAutocomplete);\n\npubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(_eventsHandler__WEBPACK_IMPORTED_MODULE_1__.pubsubEventNames.emptyLocationQuery, hideAutocomplete);\n\npubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(_eventsHandler__WEBPACK_IMPORTED_MODULE_1__.pubsubEventNames.removeHomePage, homePage.remove);\n\n\n//# sourceURL=webpack://webpack_eslint_prettier_template/./src/outputHandler.js?");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
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