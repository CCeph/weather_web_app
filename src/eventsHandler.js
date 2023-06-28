function createPubsubEventNames() {
  const outputAutocompleteEvent = "outputAutocompleteEvent";
  const filterForAutocomplete = "filterForAutocomplete";
  const getWeatherForLocation = "getWeatherForLocation";
  const emptyLocationQuery = "emptyLocationQuery";
  return {
    outputAutocompleteEvent,
    filterForAutocomplete,
    getWeatherForLocation,
    emptyLocationQuery,
  };
}

// eslint-disable-next-line import/prefer-default-export
export const pubsubEventNames = createPubsubEventNames();
