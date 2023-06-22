import PubSub from "pubsub-js";

function createPubsubEventNames() {
  const outputAutocompleteEvent = "outputAutocompleteEvent";
  return {
    outputAutocompleteEvent,
  };
}

// eslint-disable-next-line import/prefer-default-export
export const pubsubEventNames = createPubsubEventNames();
