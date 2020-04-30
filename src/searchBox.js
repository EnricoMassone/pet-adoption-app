import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./searchContext";

class SearchBox extends React.Component {
  render() {
    return (
      <Consumer>
        {(context) => (
          <div className="search-params">
            <label htmlFor="location">
              Location
              <input
                id="location"
                value={context.location}
                placeholder="Location"
                onChange={context.handleLocationChange}
              ></input>
            </label>

            <label htmlFor="animal">
              Animal
              <select
                id="animal"
                value={context.animal}
                onBlur={context.handleAnimalChange}
                onChange={context.handleAnimalChange}
              >
                <option value="">All</option>
                {ANIMALS.map((animal) => (
                  <option key={animal} value={animal}>
                    {animal}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="breed">
              Breed
              <select
                id="breed"
                value={context.breed}
                onBlur={context.handleBreedChange}
                onChange={context.handleBreedChange}
                disabled={context.breeds.length === 0}
              >
                <option value="">All</option>
                {context.breeds.map((breedName) => (
                  <option key={breedName} value={breedName}>
                    {breedName}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
