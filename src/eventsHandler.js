function createPubsubEventNames() {
  const outputAutocompleteEvent = "outputAutocompleteEvent";
  const filterForAutocomplete = "filterForAutocomplete";
  const getWeatherForLocation = "getWeatherForLocation";
  return {
    outputAutocompleteEvent,
    filterForAutocomplete,
    getWeatherForLocation,
  };
}

// eslint-disable-next-line import/prefer-default-export
export const pubsubEventNames = createPubsubEventNames();
