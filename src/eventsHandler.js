function createPubsubEventNames() {
  const outputAutocompleteEvent = "outputAutocompleteEvent";
  const filterForAutocomplete = "filterForAutocomplete";
  const getWeatherForLocation = "getWeatherForLocation";
  const emptyLocationQuery = "emptyLocationQuery";
  const removeHomePage = "removeHomePage";
  const outputWeather = "outputWeather";
  return {
    outputAutocompleteEvent,
    filterForAutocomplete,
    getWeatherForLocation,
    emptyLocationQuery,
    removeHomePage,
    outputWeather,
  };
}

// eslint-disable-next-line import/prefer-default-export
export const pubsubEventNames = createPubsubEventNames();
