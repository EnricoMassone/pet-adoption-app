import React from "react";

const searchContext = React.createContext({
  location: "Seattle, WA",
  animal: "",
  breed: "",
  breeds: [],
  getBreeds() {},
  handleLocationChange() {},
  handleAnimalChange() {},
  handleBreedChange() {},
});

export const Consumer = searchContext.Consumer;
export const Provider = searchContext.Provider;
