function createPubsubEventNames() {
  const outputAutocompleteEvent = "outputAutocompleteEvent";
  const filterForAutocomplete = "filterForAutocomplete";
  const getWeatherForLocation = "getWeatherForLocation";
  const emptyLocationQuery = "emptyLocationQuery";
  const removeHomePage = "removeHomePage";
  return {
    outputAutocompleteEvent,
    filterForAutocomplete,
    getWeatherForLocation,
    emptyLocationQuery,
    removeHomePage,
  };
}

// eslint-disable-next-line import/prefer-default-export
export const pubsubEventNames = createPubsubEventNames();
