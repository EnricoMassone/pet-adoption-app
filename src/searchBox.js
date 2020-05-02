import React from "react";
import { ANIMALS } from "petfinder-client";

class SearchBox extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch();
  };

  render() {
    const {
      location,
      animal,
      breed,
      breeds,
      handleLocationChange,
      handleAnimalChange,
      handleBreedChange,
    } = this.props;

    return (
      <div className="search-params">
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="location">
            Location
            <input
              id="location"
              value={location}
              placeholder="Location"
              onChange={handleLocationChange}
            ></input>
          </label>

          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={animal}
              onBlur={handleAnimalChange}
              onChange={handleAnimalChange}
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
              value={breed}
              onBlur={handleBreedChange}
              onChange={handleBreedChange}
              disabled={breeds.length === 0}
            >
              <option value="">All</option>
              {breeds.map((breedName) => (
                <option key={breedName} value={breedName}>
                  {breedName}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
